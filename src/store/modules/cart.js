import { setCookie, removeCookie, getCookie, errorMessage } from "@/util/cookieUtils";
import sendAxio from "@/util/sendAxio";

const state = {
    cart: [],
    cartPrice: 0,
};

const mutations = {
    SET_CART(state, cart) {
        state.cart = cart;
    },
    SET_CART_PRICE(state, price) {
        state.cartPrice = price;
    },
    CLEAR_CART(state) {
        state.cart = [];
        state.cartPrice = 0;
        removeCookie("tempCart");
    },
};

const actions = {
    async addToCart({ commit, state }, { product, quantity }) {
        try {
            const cart = state.cart;
            const existingProduct = cart.find((item) => item.product.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.push({ product, quantity });
            }

            commit("SET_CART", cart);
            setCookie("tempCart", JSON.stringify(cart), 7);
        } catch (error) {
            throw new Error("Falha ao adicionar ao carrinho: " + error.message);
        }
    },

    async removeFromCart({ commit, state }, productId) {
        try {
            const cart = state.cart.filter((item) => item.product.id !== productId);
            commit("SET_CART", cart);
            setCookie("tempCart", JSON.stringify(cart), 7);
        } catch (error) {
            throw new Error("Falha ao remover do carrinho: " + error.message);
        }
    },

    async displayCartPrices({ commit }, isAuthenticated) {
        const user = JSON.parse(localStorage.getItem("userData"));
        const tempCart = getCookie("tempCart");

        try {
            if (isAuthenticated) {
                const res = await sendAxio("post", `/cart/${user.id}/prices`);
                commit("SET_CART_PRICE", res.data.totalProducts);
                return;
            } else {
                if (tempCart) {
                    const res = await sendAxio("post", `/cart/${false}/prices`, JSON.parse(tempCart));
                    commit("SET_CART_PRICE", res.data.totalProducts);
                    return;
                }
            }
        } catch (error) {
            errorMessage(error);
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
