import sendAxio from "@/util/sendAxio";
import { errorMessage } from "@/util/cookieUtils";
import notification from "@/util/notifications";

const state = {
    addresses: null,
    selectAddress: null,
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
                commit("SET_ADDRESS", res.data.addresses);
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },
    async addAddress({ commit }, payload) {
        const user = JSON.parse(localStorage.getItem("userData"));

        try {
            const res = await sendAxio({ method: "post", url: `/customer/${user.id}/address`, data: payload });

            if (res.status === 200) {
                commit("SET_ADDRESSES", res.data.addresses);
                commit("SET_ADDRESS", res.data.address);
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                return;
            }
            if (res.status === 202) {
                notification({ title: "Erro", type: "error", message: "Complete seu perfil!" });
                commit("SET_COMPLETE_PROFILE", res.data.user, { root: true });
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },
    async completeProfile({ commit }, payload) {
        const user = JSON.parse(localStorage.getItem("userData"));
        try {
            const res = await sendAxio({ method: "post", url: `/customer/${user.id}`, data: payload });

            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                commit("SET_COMPLETE_PROFILE", {}, { root: true });
                return true;
            }
            throw new Error();
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
