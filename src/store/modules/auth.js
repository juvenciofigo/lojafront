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
    async signIn({ commit, state }, payload) {
        try {
            const res = await sendAxio({ method: "post", url: `/signIn`, data: payload.values });

            if (res.status === 200) {
                const auth = res.data.user;

                // Definir o tempo de expiração do cookie baseado no papel do usuário
                if (auth.role.includes("admin")) {
                    setCookie("authToken", auth.token, 1);
                    setCookie("poRO", auth.role[1], 1);
                } else {
                    setCookie("authToken", auth.token, 4);
                }

                // Armazenar dados do usuário no localStorage
                localStorage.setItem(
                    "userData", // name //
                    JSON.stringify({
                        firstName: auth.firstName,
                        lastName: auth.lastName,
                        email: auth.email,
                        id: auth._id,
                        profilePhoto: auth.profilePhoto,
                    })
                );
            } else {
                notification({ title: "Error", type: "error", message: res.data.message });
                return;
            }

            const user = JSON.parse(localStorage.getItem("userData"));
            const tempCart = getTempCart("tempCart");

            if (tempCart && tempCart.length > 0) {
                const res = await sendAxio({ method: "post", url: `/cart/${user.id}/addProduct`, data: JSON.parse(tempCart) });
                if (res.status === 200) {
                    // Limpar o cookie do carrinho
                    removeCookie("tempCart");
                }
            }

            notification({ title: "Sucesso", type: "success", message: "Bem-vindo" });

            let redirect = null;
            if (state.redirectTo !== null) {
                redirect = state.redirectTo;
                commit("SET_REDIRECT_TO", null);
                commit("SET_LOGIN_OVERLAY", false);
                window.location.href = redirect;
                return;
            }
            window.location.reload();
        } catch (error) {
            errorMessage(error);
            return;
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

    async signUp(_, payload) {
        const values = {
            email: payload.emailSignUp,
            password: payload.passwordSignUp,
            firstName: payload.firstNameSignUp,
            lastName: payload.lastNameSignUp,
        };
        try {
            const res = await sendAxio({ method: "post", url: `/signUp`, data: values });
            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: "Conta criada, faça o Login!" });
                return;
            }
            throw new Error();
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
