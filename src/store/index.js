import { createStore } from "vuex";
import axios from "axios";
import config from "@/config/config";

export default createStore({
    namespaced: true,
    state: {
        dashboard: "dashboard",
        product: {},
        products: [],
    },

    getters: {},

    mutations: {
        productDetails(state, productDetails) {
            state.product = productDetails;
        },
        all(state, All) {
            state.products = All;
        },
    },

    actions: {
        async detailsProduct({ commit }, produtoId) {
            try {
                const response = await axios.get(`${config.apiURL}/product/${produtoId}`);
                const productDetails = response.data.product;
                commit("productDetails", { ...productDetails });
            } catch (error) {
                console.error(error);
            }
        },

        async getAllProducts({ commit }) {
            try {
                const response = await axios.get(`${config.apiURL}/products`);

                if (response.data) {
                    const products = response.data.products;
                    commit("all", products);
                } else {
                    console.error("Invalid API response:", response.data);
                }
            } catch (error) {
                console.error("Error:", error.message);
            }
        },
    },
    modules: {},
});
