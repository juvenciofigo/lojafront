import sendAxio from "@/util/sendAxio";
import { errorMessage } from "@/util/cookieUtils";
import notification from "@/util/notifications";

const state = {
    mySelf: null,
};

const getters = {};

const mutations = {
    SET_MY_SELF(state, data) {
        state.mySelf = data;
    },
};

const actions = {
    async myProfile({ commit }, payload) {
        try {
            const res = await sendAxio({ method: "get", url: `/user/${payload.id}` });
            if (res.status === 200) {
                commit("SET_MY_SELF", res.data);
            }
            return;
        } catch (error) {
            errorMessage(error);
        }
    },

    async updateMyProfile(_, payload) {
        console.log(payload);
        
        try {
            // const res = await sendAxio({ method: "put", url: `/user/${payload.id}` });
            // if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: "Conta criada, faça o Login!" });
            // }
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
