import axios from "axios";
import config from "@/config/config";

const state = {
  statistics: {},
};

const mutations = {
  SET_STATISTICS(state, statistics) {
    state.statistics = statistics;
  },
};

const actions = {
  async fetchStatistics({ commit }) {
    try {
      const res = await axios.get(`${config.apiURL}/statistics`);
      commit("SET_STATISTICS", res.data);
    } catch (error) {
      throw new Error("Falha ao buscar estatísticas: " + error.message);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};