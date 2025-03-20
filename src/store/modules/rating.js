import sendAxio from "@/util/sendAxio";
import notification from "@/util/notifications";
import { errorMessage } from "@/util/cookieUtils";

const state = {
    categories: [],
    category: {},
    subCategories: [],
    sub_categories: [],
};

const getters = {};
const mutations = {};

const actions = {
    async deleteRating(_, payload) {
        try {
            const res = await sendAxio({ method: "patch", url: `/rating/${payload.rating}/delete` });
            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });
            }
            return;
        } catch (error) {
            errorMessage(error);
            return;
        }
    },
    // ////////////////////Client//////////////////
    async sendRating(_, payload) {
        try {
            const res = await sendAxio({ method: "post", url: `/rating/${payload.productId}`, data: { ratingScore: payload.ratingScore, ratingText: payload.ratingText } });

            if (res.status === 200) {
                notification({ title: "Sucesso!", type: "success", message: res.data.message });
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
            return;
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
