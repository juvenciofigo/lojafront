import sendAxio from "@/util/sendAxio";
import { errorMessage } from "@/util/cookieUtils";
import notification from "@/util/notifications";

const state = {
    orders: {},
};

const mutations = {
    CLEAR_ORDERS(state) {
        state.orders = {};
    },
    SET_ORDERS(state, data) {
        state.orders = data;
    },
};

const actions = {
    async fetchOrders({ commit }, payload) {
        try {
            const res = await sendAxio({
                method: "get",
                url: "/orders/admin",
                params: { offset: payload.offset },
            });
            commit("SET_ORDERS", res.data.orders);
        } catch (error) {
            errorMessage(error);
        }
    },

    //////////////////////Cliente/////////////////
    async createOrder({ state }, payload) {
        const user = JSON.parse(localStorage.getItem("userData"));

        // Função separada para envio do pedido
        const sendOrderRequest = async (cart, address) => {
            try {
                const res = await sendAxio({ method: "post", url: "/order", data: { cart, delivery: { address } } });

                if (res.status === 200) {
                    const order = res.data.order;
                    notification({ title: "Sucesso", type: "success", message: res.data.message });
                    // commit("carts/CLEAR_CART_PRICE", { root: true });
                    // commit("payments/SET_ID_ORDER", order._id, { root: true });
                    // commit("payments/SET_AMOUT_PAYMENT", order.totalPrice, { root: true });
                    // commit("payments/SET_PAYMENT_DIALOG", { root: true });
                    // router.push({ name: "selfOrders", params: { user: `${user.id}` } });
                    return { order: order, status: 200 };
                }

                throw new Error("Erro ao processar pedido.");
            } catch (error) {
                errorMessage(error);
                return false;
            }
        };

        try {
            // Determinar o endereço antes de chamar `sendOrderRequest`
            let addressId = payload.selectAddress.addressId;

            if (!state.selected) {
                const res = await sendAxio({ method: "post", url: `/customer/${user.id}/address`, data: payload.selectAddress });

                if (res.status !== 200) throw new Error("Falha ao cadastrar endereço.");

                addressId = res.data.addressId;
            }

            return await sendOrderRequest(payload.cart, addressId);
        } catch (error) {
            errorMessage(error);
        }
    },

    async buyNow({ dispatch }, { product }) {
        const tempPrices = [];
        const cartProducts = [];

        try {
            const res = await sendAxio({ method: "get", url: `/product/${product.id}` });
            const productDetails = res.data.product;
            cartProducts.push({
                productId: productDetails._id,
                productName: productDetails.productName,
                productPrice: productDetails.productPrice,
                picture: productDetails.productImage[0],
                quantity: product.quantity,
                subtotal: product.quantity * productDetails.productPrice,
            });

            tempPrices.push(product.quantity * productDetails.productPrice);
        } catch (error) {
            errorMessage(error);
        }

        dispatch("carts/updateCartProducts", cartProducts, { root: true });
    },

    async getOldersCustomer({ commit }, payload) {
        try {
            const res = await sendAxio({ method: "get", url: `/orders/${payload.user}`, params: { offset: payload.offset } });

            if (res.status === 200) {
                commit("SET_ORDERS", res.data.orders);
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
            return false;
        }
    },

    async deleteOrderClient({ dispatch }, payload) {
        try {
            const res = await sendAxio({ method: "patch", url: `/order/${payload.orderId}` });
            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                await dispatch("getOldersCustomer", { user: payload.user });
                return;
            }
            throw new Error();
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
