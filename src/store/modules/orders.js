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
    async createOrder(_, payload) {
        // const user = JSON.parse(localStorage.getItem("userData"));
        let addressId = payload.selectedAddres;

        // Função separada para envio do pedido
        try {
            const res = await sendAxio({ method: "post", url: "/order", data: { cart: payload.cart, address: addressId } });

            if (res.status === 200) {
                const order = res.data.order;
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                return { order: order, status: 200 };
            }

            throw new Error("Erro ao processar pedido.");
        } catch (error) {
            errorMessage(error);
            return false;
        }

        // try {

        //     if (!state.selected) {
        //         const res = await sendAxio({ method: "post", url: `/customer/${user.id}/address`, data: payload.selectAddress });

        //         if (res.status !== 200) throw new Error("Falha ao cadastrar endereço.");

        //         addressId = res.data.addressId;
        //     }

        //     return await sendOrderRequest(payload.cart, addressId);
        // } catch (error) {
        //     errorMessage(error);
        // }
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
