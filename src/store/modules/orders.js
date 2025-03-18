import axios from "axios";
import config from "@/config/config";

const state = {
  orders: [],
};

const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders;
  },
  CLEAR_ORDERS(state) {
    state.orders = [];
  },
};

const actions = {
  async fetchOrders({ commit }) {
    try {
      const res = await axios.get(`${config.apiURL}/orders`);
      commit("SET_ORDERS", res.data);
    } catch (error) {
      throw new Error("Falha ao buscar pedidos: " + error.message);
    }
  },

  async createOrder({ commit }, orderData) {
    try {
      const res = await axios.post(`${config.apiURL}/orders`, orderData);
      commit("SET_ORDERS", [...state.orders, res.data]);
    } catch (error) {
      throw new Error("Falha ao criar pedido: " + error.message);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};