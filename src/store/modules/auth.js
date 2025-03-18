import axios from "axios";
import config from "@/config/config";
import { setCookie, removeCookie, getCookie, cookieExists } from "@/util/cookieUtils";
import router from "@/router";

const state = {
    user: JSON.parse(localStorage.getItem("userData")) || null,
    authToken: getCookie("authToken") || null,
    isAdmin: getCookie("poRO") === "admin",
};

const getters = {
    isAuthenticated: () => (cookieName) => {
        return cookieExists(cookieName);
    },
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
        localStorage.setItem("userData", JSON.stringify(user));
    },

    SET_AUTH_TOKEN(state, token) {
        state.authToken = token;
        setCookie("authToken", token, 1);
    },
    SET_ADMIN(state, isAdmin) {
        state.isAdmin = isAdmin;
        setCookie("poRO", isAdmin ? "admin" : "", 1);
    },
    LOGOUT(state) {
        state.user = null;
        state.authToken = null;
        state.isAdmin = false;
        localStorage.removeItem("userData");
        removeCookie("authToken");
        removeCookie("poRO");
    },
};

const actions = {
    async login({ commit }, { email, password }) {
        try {
            const res = await axios.post(`${config.apiURL}/login`, { email, password });
            const { user, token } = res.data;

            commit("SET_USER", user);
            commit("SET_AUTH_TOKEN", token);
            commit("SET_ADMIN", user.role.includes("admin"));

            router.push({ name: "dashboard" });
        } catch (error) {
            throw new Error("Falha no login: " + error.message);
        }
    },

    async logout({ commit }) {
        commit("LOGOUT");
        router.push({ name: "login" });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
