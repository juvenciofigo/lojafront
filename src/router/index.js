import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";

const routes = [
    {
        path: "/",
        name: "home",
        redirect: { name: "store" },
        component: () => import("../views/HomeView.vue"),
        children: [
            //////// STORE ///////////
            {
                path: "",
                name: "store",
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
                path: "produtos",
                name: "allProductsClient",
                component: () => import("@/resources/Store/_components/Store/_components/products/AllProducts.vue"),
            },

            /*
            Pedidos
            */
            {
                path: "pedido",
                name: "makeOrder",
                component: () => import("@/resources/Store/_components/Store/_components/orders/MakeOrder.vue"),
                meta: { requiresLogin: true },
            },

            /*
            Carrinhos
            */
            {
                path: "carrinho",
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
        component: () => import("@/resources/_components/profile/ProfileComp.vue"),
        meta: { requiresLogin: true },
        props: { defaultProp: "defaultValue" },
        children: [
            {
                path: "",
                name: "myProfile",
                component: () => import("@/resources/_components/profile/MyProfile.vue"),
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
                name: "productsAdmin",
                component: () => import("@/resources/Dashboard/_components/Store/_components/products/AllProducts.vue"),
            },
            {
                //add producc
                path: "produto/novo",
                name: "novoproduto",
                component: () => import("@/resources/Dashboard/_components/Store/_components/products/AddProduct.vue"),
            },
            {
                // variations
                path: "produto/:id",
                name: "vatiations",
                redirect: { name: "variations" },
                children: [
                    {
                        path: "variacoes",
                        name: "variations",
                        component: () => import("@/resources/Dashboard/_components/Store/_components/products/AllVariations.vue"),
                    },
                    {
                        path: "addVariacoes",
                        name: "addVariation",
                        component: () => import("@/resources/Dashboard/_components/Store/_components/products/AddVariation3.vue"),
                    },
                    {
                        path: ":variation/modificar",
                        name: "editVariation",
                        component: () => import("@/resources/Dashboard/_components/Store/_components/products/AddVariation3.vue"),
                    },
                ],
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
                path: "produto/:productID/actualizar",
                name: "update",
                component: () => import("@/resources/Dashboard/_components/Store/_components/products/AddProduct.vue"),
            },

            /*
            Pedidos
            */

            {
                path: "pedidos",
                name: "allOrders",
                component: () => import("@/resources/Dashboard/_components/Store/_components/orders/AllOrders.vue"),
            },

            /*
            Clientes
            */

            {
                path: "clientes",
                name: "allCustomers",
                component: () => import("@/resources/Dashboard/_components/Store/_components/customers/AllCustomers.vue"),
            },

            /*
            Carrinhos
            */

            {
                path: "carrinhos",
                name: "carts",
                component: () => import("@/resources/Dashboard/_components/Store/_components/carts/CartsComp.vue"),
            },

            /*
            Compras
            */

            {
                path: "compras",
                name: "sellers",
                component: () => import("@/resources/Dashboard/_components/Store/_components/shopping/ShoppingComp.vue"),
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
                store.commit("updateSnackbar", { text: "Faça Login", snackbarType: "error" });
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
                    store.commit("updateSnackbar", { text: "Sem permisão", snackbarType: "error" });
                    store.commit("SET_LOGIN_OVERLAY", true);
                    next(false);
                } else {
                    store.commit("updateSnackbar", { text: "Página inicial", color: "orange" });
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
