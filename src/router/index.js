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
            Carrinhos
            */
            {
                path: "/carrinho",
                name: "cart",
                component: () => import("@/resources/Store/_components/Store/_components/carts/CartProducts.vue"),
            },
        ],
    },
    /// Profile ////
    {
        path: "/perfil/:user",
        name: "profile",
        redirect: { name: "myProfile" },
        component: () => import("@/resources/_components/ProfileComp.vue"),
        meta: { requiresLogin: true },
        children: [
            {
                path: "",
                name: "myProfile",
                component: () => import("@/resources/_components/MyProfile.vue"),
            },
            /*
             Compras
            */
            {
                path: "pedidos",
                name: "selfOrders",
                component: () => import("@/resources/Store/_components/Store/_components/orders/AllOrders.vue"),
            },
            /*
             Pagamentos
            */
            {
                path: "pagamentos",
                name: "selfPayments",
                component: () => import("@/resources/Store/_components/Store/_components/payment/AllPayments.vue"),
            },
            /*
             Endereços
            */
            {
                path: "enderecos",
                name: "selfAddresses",
                component: () => import("@/resources/Store/_components/Store/_components/addresses/AllAddresses"),
            },
        ],
    },

    /*/////////////DASHBOARD///////////////////*/

    {
        path: "/dashboard",
        name: "dashboard",
        redirect: { name: "dashboard" },
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
            Carrinhos
            */
            {
                path: "carrinhos",
                name: "carrinhos",
                redirect: { name: "carts" },
                component: () => import("@/resources/Dashboard/_components/Store/_components/CartsComp.vue"),
                children: [
                    {
                        path: "",
                        name: "carts",
                        component: () => import("@/resources/Dashboard/_components/Store/_components/CartsComp.vue"),
                    },
                ],
            },

            /*
            Compras
            */
            {
                path: "compras",
                name: "compras",
                component: () => import("@/resources/Dashboard/_components/Store/_components/ShopsComp.vue"),
                children: [
                    {
                        path: "",
                        name: "sellers",
                        component: () => import("@/resources/Dashboard/_components/Store/_components/ShopsComp.vue"),
                    },
                ],
            },
        ],
    },

    {
        path: "/about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
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
                store.commit("updateSnackbar", { show: true, text: "Faça Login", color: "red" });
                store.commit("SET_LOGIN_OVERLAY", true);
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
                    store.commit("SET_LOGIN_OVERLAY", true);
                    next(false);
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
