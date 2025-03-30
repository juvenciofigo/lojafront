import sendAxio from "@/util/sendAxio";
import { errorMessage } from "@/util/cookieUtils";
import notification from "@/util/notifications";

const state = {
    user: JSON.parse(localStorage.getItem("userData")),
    paymentDialog: false,
    amoutPayment: null,
    orderPaymentId: null,
};

const getters = {};

const mutations = {
    SET_AMOUT_PAYMENT(state, data) {
        state.amoutPayment = data;
    },
    SET_ID_ORDER(state, data) {
        state.orderPaymentId = data;
    },

    SET_PAYMENT_DIALOG(state) {
        state.paymentDialog = !state.paymentDialog;
    },
};

const actions = {
    async mpesapay({ state }, payload) {
        try {
            const res = await sendAxio({
                method: "post",
                url: `/mpesaPay`,
                data: { ...payload, orderId: state.orderPaymentId },
                query: { paymentMode: "Mpesa" },
            });
            if (res.status === 200 || res.status === 201) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                window.location.href = `/perfil/${state.user.id}/pedidos`;
            }
            return;
        } catch (error) {
            errorMessage(error);
            return false;
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
