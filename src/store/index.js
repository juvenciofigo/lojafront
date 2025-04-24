import { createStore } from "vuex";
import axios from "axios";
import config from "@/config/config";
import { getCookie, cookieExists, errorMessage } from "@/util/cookieUtils";
import router from "@/router";
import { ElNotification } from "element-plus";

// let tempCart = getCookie("tempCart");
function getAuthToken() {
    return getCookie("authToken");
}

function headers() {
    const authToken = getAuthToken();
    return {
        Authorization: authToken ? `Ecommerce ${authToken}` : null,
    };
}

// const user = JSON.parse(localStorage.getItem("userData"));

async function sendAxio(method, url, data = null, headers = null, params = null) {
    try {
        const res = await axios.request({
            method: method,
            baseURL: config.apiURL,
            url: url,
            data: data,
            headers: headers,
            params: params,
        });

        return res;
    } catch (error) {
        console.error(`Erro na requisição ${method} para ${url}:`, error);
        throw error;
    }
}

import products from "./modules/products";
import categories from "./modules/categories";
import carts from "./modules/carts";
import auth from "./modules/auth";
import addresses from "./modules/addresses";
import orders from "./modules/orders";
import payments from "./modules/payments";
import profile from "./modules/profile";
import rating from "./modules/rating";
import estatistic from "./modules/estatistic";

export default createStore({
    modules: {
        products,
        categories,
        carts,
        auth,
        addresses,
        orders,
        payments,
        profile,
        rating,
        estatistic,
    },

    state: {
        themeMode:true,
        /// Loja
        storeName: process.env.VUE_APP_STORE_NAME,
        // users
        tring: 0,
        dashboard: "dashboard",
        completeProfile: false,
        // profile
        mySelf: null,
        customers: {},

        // confirmation dialog
        loadingPriceUpdate: false,
        // dialog
        payment: false,
        loginOverlay: false,
    },

    getters: {
        ///user
        isAuthenticated: () => (cookieName) => {
            return cookieExists(cookieName);
        },
        isUserAdmin: async () => {
            try {
                const roleCookieValue = await getCookie("poRO");
                if (roleCookieValue) {
                    return roleCookieValue === "admin";
                }
                return false;
            } catch (error) {
                return false;
            }
        },

        cartPrice: (state) => state.cartPrice,
        selectAddress: (state) => state.selectAddress,

        // overlay
        loadingPriceUpdate: (state) => state.loadingPriceUpdate,
    },

    mutations: {
        // Notificacao
        SET_NOTIFICATION(_, data) {
            ElNotification({
                title: data.title,
                type: data.type,
                message: data.message,
                position: "top-left",
            });
        },
        SET_loadingPriceUpdate(state) {
            state.loadingPriceUpdate = !state.loadingPriceUpdate;
        },
        Set_tringValue(state) {
            state.tring += 1;
        },
        SET_COMPLETE_PROFILE(state, data) {
            state.mySelf = data;
            state.completeProfile = !state.completeProfile;
        },
        SWITH_THEME(state) {
            state.themeMode = !state.themeMode;
        },
    },

    actions: {
        async orderToFalse({ commit }, payload) {
            try {
                const res = await sendAxio("patch", `/order/${payload}`, null, headers());

                if (res.status === 200) {
                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });
                    router.go(0);
                }
            } catch (error) {
                errorMessage(error);
            }
        },
        swithTheme({ commit }) {
            commit("SWITH_THEME");
        },
    },
});
