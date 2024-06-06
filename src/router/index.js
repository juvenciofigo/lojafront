import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";

const routes = [
    {
        path: "/home",
        name: "homepage",
        redirect: { name: "home" },
    },
    {
        path: "/",
        name: "home",
        component: () => import("../views/HomeView.vue"),
        children: [
            /*
                STORE
                        */
            {
                path: "",
                name: "home",
                component: () => import("@/resources/Store/_components/StoreView.vue"),
            },
            /*
            Produtos
           */
            {
                // details
                path: "produto/:id/detalhes",
                name: "detailsClient",
                component: () => import("@/resources/Store/_components/Store/_components/products/ProductDetails.vue"),
            },
            {
                // all products
                path: "/produtos",
                name: "allProductsClient",
                component: () => import("@/resources/Store/_components/Store/_components/products/AllProducts.vue"),
            },
            /*

            /*
            Pedidos
            */
            {
                path: "/pedido",
                name: "makeOrder",
                component: () => import("@/resources/Store/_components/Store/_components/orders/MakeOrder.vue"),
                meta: { requiresLogin: true },
            },
            /*
            Carinhos
            */
            {
                path: "/carrinho",
                name: "cart",
                component: () => import("@/resources/Store/_components/Store/_components/carts/CartProducts.vue"),
            },
            /*
            Compras
            */
        ],
    },

    /*/////////////DASHBOARD///////////////////*/

    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/resources/Dashboard/_components/DashboardView.vue"),
        meta: { requiresAdmin: true },
        children: [
            /*
            Produtos
            */
            {
                path: "",
                name: "dashboard",
                component: () => import("@/resources/Dashboard/_components/DashboardComp.vue"),
            },
            {
                path: "produto",
                name: "produto",
                redirect: { name: "produtos" },
            },
            {
                // all product
                path: "produtos",
                name: "produtos",
                component: () => import("@/resources/Dashboard/_components/Store/_components/products/AllProducts.vue"),
            },
            {
                //add producc
                path: "produto/novo",
                name: "novoproduto",
                component: () => import("@/resources/Dashboard/_components/Store/_components/products/AddProduct.vue"),
            },
            {
                // Add image
                path: "produto/:id/fotos",
                name: "addImage",
                component: () => import("@/resources/Dashboard/_components/Store/_components/products/AddImage.vue"),
            },
            {
                // details
                path: "produto/:id/detalhes",
                name: "details",
                component: () => import("@/resources/Dashboard/_components/Store/_components/products/ProductDetails.vue"),
            },
            {
                // update product
                path: "produto/:id/actualizar",
                name: "update",
                component: () => import("@/resources/Dashboard/_components/Store/_components/products/UpdateProduct.vue"),
            },

            /*
            Pedidos
            */

            {
                path: "pedido",
                name: "pedido",
                redirect: { name: "pedidos" },
            },
            {
                path: "pedidos",
                name: "pedidos",
                component: () => import("@/resources/Dashboard/_components/Store/_components/OrdersComp.vue"),
                children: [
                    {
                        path: "",
                        name: "allOrders",
                        component: () => import("@/resources/Dashboard/_components/Store/_components/orders/AllOrders.vue"),
                    },
                ],
            },

            /*
            Clientes
            */
            {
                path: "cliente",
                name: "cliente",
                redirect: { name: "clientes" },
            },
            {
                path: "clientes",
                name: "clientes",
                component: () => import("@/resources/Dashboard/_components/Store/_components/CustomersComp.vue"),
                children: [
                    {
                        path: "",
                        name: "allCustomers",
                        component: () => import("@/resources/Dashboard/_components/Store/_components/customers/AllCustomers.vue"),
                    },
                ],
            },

            /*
            Carinhos
            */
            {
                path: "carinho",
                name: "carinho",
                redirect: { name: "carinhos" },
            },
            {
                path: "carinhos",
                name: "carinhos",
                component: () => import("@/resources/Dashboard/_components/Store/_components/CartsComp.vue"),
            },

            /*
            Compras
            */
            {
                path: "compra",
                name: "compra",
                redirect: { name: "compras" },
            },
            {
                path: "compras",
                name: "compras",
                component: () => import("@/resources/Dashboard/_components/Store/_components/ShopsComp.vue"),
            },
            {
                path: "comprar",
                name: "comprar",
                component: () => import("@/resources/Store/_components/Store/_components/paynow/payNow.vue"),
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

router.beforeEach(async (to, from, next) => {
    try {
        if (to.matched.some((record) => record.meta.requiresLogin)) {
            const isAuthenticated = await store.getters.isAuthenticated("authToken");
            if (isAuthenticated === true) {
                next();
            } else {
                store.commit("setRedirectTo", to.fullPath);
                store.commit("dialogLog", true);
                store.commit("updateSnackbar", { show: true, text: "Faça Login", color: "red" });
                next(false);
            }
        } else if (to.matched.some((record) => record.meta.requiresAdmin)) {
            const isAdmin = await store.getters.isUserAdmin;
            const tring = store.state.tring;
            if (isAdmin) {
                next();
                return;
            } else {
                if (Number(tring) < 2) {
                    store.commit("Set_tringValue");
                    store.commit("updateSnackbar", { show: true, text: "Sem permisão", color: "red" });
                    next({ name: "login", query: { redirect: to.fullPath } });
                } else {
                    store.commit("updateSnackbar", { show: true, text: "Página inicial", color: "orange" });
                    next({ name: "home" });
                }
            }
        } else {
            next();
        }
    } catch (error) {
        console.error("Erro na verificação de rota:", error);
        next({ name: "home" });
    }
});

export default router;
