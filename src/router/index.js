import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/HomeView.vue"),
    },
    {
        path: "/dashboard",
        component: () => import("@/resources/Dashboard/_components/DashboardView.vue"),
        children: [

            /*
            Produtos
            */
            {
                path: "",
                component: () => import("@/resources/Dashboard/_components/DashboardComp.vue"),
            },
            {
                path: "produtos",
                name: "produtos",
                component: () => import("@/resources/Dashboard/_components/Store/_components/ProductsComp.vue"),
            },
            {
                path: "novoproduto",
                name: "novoproduto",
                component: () => import("@/resources/Dashboard/_components/Store/_components/products/AddProduct.vue"),
            },
            {
                path: "produto/:id/detalhes",
                name: "detalhes",
                component: () => import("@/resources/Dashboard/_components/Store/_components/products/ProductsDetails.vue"),
            },



            /*
            Pedidos
            */
            {
                path: "pedidos",
                name: "pedidos",
                component: () => import("@/resources/Dashboard/_components/Store/_components/OrdersComp.vue"),
            },
            {
                path: "clientes",
                name: "clientes",
                component: () => import("@/resources/Dashboard/_components/Store/_components/CustomersComp.vue"),
            },
            {
                path: "carinhos",
                name: "carinhos",
                component: () => import("@/resources/Dashboard/_components/Store/_components/CartsComp.vue"),
            },
            {
                path: "compras",
                name: "compras",
                component: () => import("@/resources/Dashboard/_components/Store/_components/ShopsComp.vue"),
            },
        ],
    },
    {
        path: "/about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/resources/_components/LoginView.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/resources/_components/RegisterView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
