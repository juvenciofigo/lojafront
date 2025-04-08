import sendAxio from "@/util/sendAxio";
import { errorMessage } from "@/util/cookieUtils";

const state = {
    dataStatistic: {},
};

const getters = {};
const mutations = {
    SET_DATA_STATISTIC(state, data) {
        state.dataStatistic = data;
    },
};

const actions = {
    async DataByMonth({ commit }) {
        try {
            const res = await sendAxio({ method: "get", url: `/DataByMonth` });
            if (res.status === 200) {
                commit("SET_DATA_STATISTIC", res.data);
                return;
            }
        } catch (error) {
            errorMessage(error);
        }
    },

    async recentOrders() {
        try {
            const res = await sendAxio({ method: "get", url: `/orders/admin`, params: { sortType: "createAt-descending", limit: 10 } });
            if (res.status === 200) return res.data.orders.docs;
        } catch (error) {
            errorMessage(error);
        }
    },

    async estatistic() {
        try {
            const res = await sendAxio({ method: "get", url: `/estatistic` });
            if (res.status === 200) return res.data;
        } catch (error) {
            errorMessage(error);
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
