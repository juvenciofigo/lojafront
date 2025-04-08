import sendAxio from "@/util/sendAxio";
import { errorMessage } from "@/util/cookieUtils";
import notification from "@/util/notifications";

const state = {
    categories: [],
    category: {},
    subCategories: [],
    sub_categories: [],
};

const getters = {
    categories: (state) => state.categories,
};
const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
    SET_CATEGORY(state, category) {
        state.category = category;
    },
    CLEAR_CATEGORY(state) {
        state.category = {};
    },

    SET_SUB_CATEGORIES(state, subCategories) {
        state.subCategories = subCategories;
    },
    CLEAR_CATEGORIES(state) {
        state.categories = [];
        state.category = null;
        state.subCategories = [];
    },
};

const actions = {
    async fetchCategoriesAdmin({ commit }) {
        try {
            const res = await sendAxio({
                method: "get",
                url: "/categories",
            });

            const categories = res.data.categories;
            commit("SET_CATEGORIES", categories);
        } catch (error) {
            errorMessage(error);
        }
    },

    async createCategory({ dispatch }, categoryName) {
        try {
            const res = await sendAxio({
                method: "post",
                url: "/category",
                data: { categoryName: categoryName },
            });

            if (res.status === 200) {
                notification({ title: "Sucesso!", type: "success", message: res.data.message });
                dispatch("fetchCategoriesAdmin");
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async createSubCategory({ dispatch }, payload) {
        try {
            const res = await sendAxio({
                method: "post",
                url: "/subCategory",
                data: payload,
            });

            if (res.status === 200) {
                notification({ title: "Sucesso!", type: "success", message: res.data.message });
                dispatch("fetchCategoriesAdmin");
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async createSub_category({ dispatch }, payload) {
        try {
            const res = await sendAxio({
                method: "post",
                url: `/sub_category`,
                data: payload,
            });
            if (res.status === 200) {
                notification({ title: "Sucesso!", type: "success", message: res.data.message });
                dispatch("fetchCategoriesAdmin");
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    //  Client //
    async fetchCategories({ commit }) {
        try {
            const res = await sendAxio({ method: "get", url: "/categories/all" });
            if (res.status === 200) {
                commit("SET_CATEGORIES", res.data.categories);
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async fetchCategoryById({ commit }, categoryId) {
        try {
            const res = await sendAxio({ method: "get", url: `/categories/${categoryId}` });
            if (res.status === 200) {
                commit("SET_CATEGORY", res.data);
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async fetchSubCategories({ commit }, categoryId) {
        try {
            const res = await sendAxio({ method: "get", url: `/categories/${categoryId}/subcategories` });

            if (res.status === 200) {
                commit("SET_SUB_CATE GORIES", res.data);
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
    getters,
    mutations,
    actions,
};
