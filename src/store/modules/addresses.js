import sendAxio from "@/util/sendAxio";
import { errorMessage } from "@/util/cookieUtils";
import notification from "@/util/notifications";

const state = {
    addresses: null,
    selectAddress: null,
    selected: false,
};

const getters = {};

const mutations = {
    SET_ADDRESSES(state, data) {
        state.addresses = data;
    },
    CLEAR_ADDRESSES(state) {
        state.addresses = null;
    },
    SET_ADDRESS(state, data) {
        state.selectAddress = data;
    },
    CLEAR_ADDRESS(state) {
        state.selectAddress = null;
    },

    SET_PROVIDE_ADDRESS(state, data) {
        state.selected = data;
    },
    CLEAR_PROVIDE_ADDRESS(state) {
        state.selected = false;
    },
};

const actions = {
    async fetchAddresses({ commit }) {
        const user = JSON.parse(localStorage.getItem("userData"));

        try {
            const res = await sendAxio({ method: "get", url: `/customer/${user.id}/addresses` });

            if (res.status === 200) {
                commit("SET_ADDRESSES", res.data);
                return res;
            }
        } catch (error) {
            errorMessage(error);
        }
    },

    async deleteAddress({ commit }, payload) {
        try {
            const res = await sendAxio({ method: "delete", url: `/customer/${payload}/address` });

            if (res.status === 200) {
                commit("SET_ADDRESSES", res.data.addresses);
                notification({ title: "Sucesso", type: "success", message: res.data.message });
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
    getters,
};
