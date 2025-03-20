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
        /// Loja
        storeName: process.env.VUE_APP_STORE_NAME,
        // users
        tring: 0,
        dashboard: "dashboard",
        // profile
        mySelf: null,

        /// products
        // product: {},
        // products: [],

        /// categories
        // categories: null,
        // category: {},
        // subCategories: [],
        // sub_categories: [],

        /// orders:
        // orders: {},
        // addresses: null,
        // selectAddress: null,
        // selected: false,
        /// payment
        // amoutPayment: null,
        // orderPaymentId: null,

        /// customers
        customers: {},

        ///carts
        // cart: {},
        // cartPrice: 0,

        /// snackbar
        // redirectTo: null,
        // authToken: null,

        // confirmation dialog
        loadingPriceUpdate: false,
        // dialog
        payment: false,
        loginOverlay: false,
        // statistic
        // dataStatistic: {},
    },

    getters: {
        // producs
        // products: (state) => state.products,

        // profile
        // mySelf: (state) => state.mySelf,

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
        // overlay: (state) => state.overlay,
        loadingPriceUpdate: (state) => state.loadingPriceUpdate,
        // loginOverlay: (state) => state.loginOverlay,
    },

    mutations: {
        // Notificacao
        SET_NOTIFICATION(_, date) {
            ElNotification({
                title: date.title,
                type: date.type,
                message: date.message,
            });
        },
        SET_loadingPriceUpdate(state) {
            state.loadingPriceUpdate = !state.loadingPriceUpdate;
        },
        Set_tringValue(state) {
            state.tring += 1;
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
  
    },
});
