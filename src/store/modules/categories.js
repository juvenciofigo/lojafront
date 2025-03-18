import axios from "axios";
import config from "@/config/config";
import sendAxio from "@/util/sendAxio";
// import notification from "@/util/notifications";
import { errorMessage } from "@/util/cookieUtils";

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
    SET_SUB_CATEGORIES(state, subCategories) {
        state.subCategories = subCategories;
    },
    CLEAR_CATEGORIES(state) {
        state.categories = [];
        state.category = null;
        state.subCategories = [];
    },
};

// sendAxio(method, url, data = null, params = null)
const actions = {
    async fetchCategoriesAdmin({ commit }) {
        try {
            // const res = await axios.request({
            //     method: "get",
            //     baseURL: config.apiURL,
            //     url: "/categories",
            //     headers: headers(),
            // });
            const res = await sendAxio("get", "/categories/all");
            const categories = res.data.categories;
            commit("SET_CATEGORIES", categories);
        } catch (error) {
            errorMessage(error);
        }
    },

    //  Client //
    async fetchCategories({ commit }) {
        try {
            const res = await sendAxio({method:"get", url:"/categories/all"});
            if (res.status === 200) {
                commit("SET_CATEGORIES", res.data.categories);
            }
            return;
        } catch (error) {
            errorMessage(error);
        }
    },

    async fetchCategoryById({ commit }, categoryId) {
        try {
            const res = sendAxio({method:"get", url:`${config.apiURL}/categories/${categoryId}`});
            commit("SET_CATEGORY", res.data);
        } catch (error) {
            errorMessage(error);
        }
    },

    async fetchSubCategories({ commit }, categoryId) {
        try {
            const res = await axios.get(`${config.apiURL}/categories/${categoryId}/subcategories`);
            commit("SET_SUB_CATEGORIES", res.data);
        } catch (error) {
            errorMessage(error);
        }
    },

    async createCategory({ commit }, categoryData) {
        try {
            const res = await axios.post(`${config.apiURL}/categories`, categoryData);
            commit("SET_CATEGORIES", [...state.categories, res.data]);
        } catch (error) {
            errorMessage(error);
        }
    },

    async createSubCategory({ commit }, { categoryId, subCategoryData }) {
        try {
            const res = await axios.post(`${config.apiURL}/categories/${categoryId}/subcategories`, subCategoryData);
            commit("SET_SUB_CATEGORIES", [...state.subCategories, res.data]);
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
