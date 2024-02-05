import { createStore } from "vuex";
import axios from "axios";


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
    },

    actions: {
        async detailsProduct({ commit }, produtoId) {
            try {
                const response = await axios.get(`${config.apiURL}/product/${produtoId}`);
                const productDetails = response.data;
                commit("productDetails", productDetails);
            } catch (error) {
                console.error(error);
            }
        },
    },
    modules: {},
});
