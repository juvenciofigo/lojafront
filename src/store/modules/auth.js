import sendAxio from "@/util/sendAxio";
import { setCookie, removeCookie, getCookie, errorMessage, cookieExists, getTempCart } from "@/util/cookieUtils";
import notification from "@/util/notifications";

const state = {
    user: JSON.parse(localStorage.getItem("userData")) || null,
    authToken: getCookie("authToken") || null,
    isAdmin: getCookie("poRO") === "admin",
    redirectTo: null,
    loginOverlay: false,
    customers: {},
};

const getters = {
    isAuthenticated: () => (cookieName) => {
        return cookieExists(cookieName);
    },
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
        localStorage.setItem("userData", JSON.stringify(user));
    },

    SET_AUTH_TOKEN(state, token) {
        state.authToken = token;
        setCookie("authToken", token, 1);
    },
    SET_ADMIN(state, isAdmin) {
        state.isAdmin = isAdmin;
        setCookie("poRO", isAdmin ? "admin" : "", 1);
    },
    LOGOUT(state) {
        state.user = null;
        state.authToken = null;
        state.isAdmin = false;
        localStorage.removeItem("userData");
        removeCookie("authToken");
        removeCookie("poRO");
    },

    SET_REDIRECT_TO(state, route) {
        state.redirectTo = route;
    },

    SET_LOGIN_OVERLAY(state, status) {
        state.loginOverlay = status;
    },

    //customeres
    CLEAR_CUSTOMERS(state) {
        state.customers = {};
    },
    SET_CUSTOMERS(state, data) {
        state.customers = data;
    },
};

const handleUserConfirmation = async (commit, state, authData) => {
    try {
        // Métodos auxiliares

        // 1. Configurar autenticação
        const isAdmin = authData.role?.includes("admin");
        const tokenExpiry = isAdmin ? 1 : 4; // em dias

        setCookie("authToken", authData.token, tokenExpiry);

        if (isAdmin) {
            setCookie("poRO", authData.role[1], 1);
        }

        // 2. Armazenar dados do usuário
        const userData = {
            firstName: authData.firstName,
            lastName: authData.lastName,
            email: authData.email,
            id: authData._id,
            profilePhoto: authData.profilePhoto,
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        // 3. Processar carrinho temporário se existir
        const tempCart = getTempCart("tempCart");

        // Verifica se já é objeto ou precisa parsear
        const cartData = typeof tempCart === "string" ? JSON.parse(tempCart) : tempCart;

        if (Array.isArray(cartData) && cartData.length > 0) {

            const response = await sendAxio({
                method: "post",
                url: `/cart/${authData._id}/addProduct`,
                data: cartData,
            });

            if (response.status === 200) {
                removeCookie("tempCart");
            }
        }

        // 4. Notificar sucesso
        notification({
            title: "Sucesso",
            type: "success",
            message: "Bem-vindo",
        });

        setTimeout(() => {
            if (state.redirectTo) {
                const redirectUrl = state.redirectTo;
                commit("SET_REDIRECT_TO", null);
                commit("SET_LOGIN_OVERLAY", false);
                window.location.href = redirectUrl;
            } else {
                window.location.reload();
            }
        }, 2000);
    } catch (error) {
        console.error("Erro na confirmação do usuário:", error);
        throw error;
    }
};

const actions = {
    async fetchCustomers({ commit }, payload) {
        try {
            const res = await sendAxio({
                method: "get",
                url: "/customers/admin",
                params: { offset: payload },
            });

            commit("SET_CUSTOMERS", res.data);
        } catch (error) {
            errorMessage(error);
        }
    },

    /////////////////////Client/////////////////////
    signIn: async ({ commit, state }, payload) => {
        try {
            const res = await sendAxio({ method: "post", url: `/signIn`, data: payload.values });

            if (res.status === 200) {
                const auth = res.data.user;

                await handleUserConfirmation(commit, state, auth);
            } else {
                notification({ title: "Error", type: "error", message: res.data.message });
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
            return;
        }
    },

    signUp: async ({ commit, state }, payload) => {
        const values = {
            email: payload.emailSignUp,
            password: payload.passwordSignUp,
            firstName: payload.firstNameSignUp,
            lastName: payload.lastNameSignUp,
        };
        try {
            const res = await sendAxio({ method: "post", url: `/signUp`, data: values });
            if (res.status === 200) {
                const auth = res.data.user;
                await handleUserConfirmation(commit, state, auth);
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async logout({ commit }) {
        try {
            await removeCookie("authToken");
            await removeCookie("poRO");

            localStorage.removeItem("userData");

            commit("carts/SET_CART_PRICE");
            window.location.reload();
            return;
        } catch (error) {
            errorMessage(error);
        }
    },

    async novoVisitante() {
        sendAxio({ method: "get", url: `/visitaReg` });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
