import { createStore } from "vuex";
import dashboard from "@/resources/Dashboard/_store";
import store from "@/resources/Store/_store";

export default createStore({
    state: {
        StoreDasboard: ["Produtos", "Pedidos", "Clientes", "Carinhos", "Compras"],
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: { dashboard, store },
});
