import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { nextTick } from "vue";

NProgress.configure({
    showSpinner: false,
    easing: "ease-out",
});

const routes = [
    {
        path: "/",
        name: "home",
        redirect: { name: "store-home" },
        component: () => import("../views/HomeView.vue"),
        children: [
            //////// STORE ///////////
            {
                path: "",
                name: "store-home",
                component: () => import("@/resources/Store/_components/StoreView.vue"),
            },
            {
                path: "produto/:id/detalhes",
                name: "product-details",
                component: () => import("@/resources/Store/_components/Store/_components/products/ProductDetails.vue"),
            },
            {
                path: "produtos/:by?",
                name: "products-list",
                component: () => import("@/resources/Store/_components/Store/_components/products/AllProducts.vue"),
            },
            {
                path: "pedido",
                name: "order-create",
                component: () => import("@/resources/Store/_components/Store/_components/orders/MakeOrder.vue"),
                meta: { requiresLogin: true },
            },
            {
                path: "carrinho",
                name: "cart-view",
                component: () => import("@/resources/Store/_components/Store/_components/carts/CartProducts.vue"),
            },
            {
                path: "/perfil/:user",
                name: "profile",
                redirect: { name: "profile-overview" },
                component: () => import("@/resources/_components/profile/ProfileComp.vue"),
                meta: { requiresLogin: true },
                props: { defaultProp: "defaultValue" },
                children: [
                    {
                        path: "",
                        name: "profile-overview",
                        component: () => import("@/resources/_components/profile/MyProfile.vue"),
                    },
                    {
                        path: "pedidos",
                        name: "profile-orders",
                        component: () => import("@/resources/Store/_components/Store/_components/orders/AllOrders.vue"),
                    },
                    {
                        path: "pagamentos",
                        name: "profile-payments",
                        component: () => import("@/resources/Store/_components/Store/_components/payment/AllPayments.vue"),
                    },
                    {
                        path: "enderecos",
                        name: "profile-addresses",
                        component: () => import("@/resources/Store/_components/Store/_components/addresses/AllAddresses"),
                    },
                ],
            },
        ],
    },
    {
        path: "/dashboard",
        name: "admin",
        component: () => import("@/resources/Dashboard/_components/DashboardView.vue"),
        meta: { requiresLogin: true, requiresAdmin: true },
        children: [
            {
                path: "",
                name: "admin-home",
                component: () => import("@/resources/Dashboard/_components/DashboardComp.vue"),
            },
            {
                path: "pedidos",
                name: "admin-orders",
                component: () => import("@/resources/Dashboard/_components/Store/_components/orders/AllOrders.vue"),
            },
            {
                path: "produtos",
                name: "admin-products",
                children: [
                    {
                        path: "",
                        name: "admin-products-list",
                        component: () => import("@/resources/Dashboard/_components/Store/_components/products/AllProducts.vue"),
                    },
                    {
                        path: "novo",
                        name: "admin-product-create",
                        component: () => import("@/resources/Dashboard/_components/Store/_components/products/AddProduct.vue"),
                    },
                    {
                        path: "produto/:id",
                        name: "admin-product",
                        redirect: { name: "admin-product-variations" },
                        children: [
                            {
                                path: "variacoes",
                                name: "admin-product-variations",
                                component: () => import("@/resources/Dashboard/_components/Store/_components/products/AllVariations.vue"),
                            },
                            {
                                path: "addVariacoes",
                                name: "admin-product-variation-add",
                                component: () => import("@/resources/Dashboard/_components/Store/_components/products/AddVariation3.vue"),
                            },
                            {
                                path: ":variation/modificar",
                                name: "admin-product-variation-edit",
                                component: () => import("@/resources/Dashboard/_components/Store/_components/products/AddVariation3.vue"),
                            },
                        ],
                    },
                    {
                        path: "produto/:id/fotos",
                        name: "admin-product-images",
                        component: () => import("@/resources/Dashboard/_components/Store/_components/products/AddImage.vue"),
                    },
                    {
                        path: "produto/:id/detalhes",
                        name: "admin-product-details",
                        component: () => import("@/resources/Dashboard/_components/Store/_components/products/ProductDetails.vue"),
                    },
                    {
                        path: "produto/:productID/actualizar",
                        name: "admin-product-update",
                        component: () => import("@/resources/Dashboard/_components/Store/_components/products/AddProduct.vue"),
                    },
                ],
            },
            {
                path: "clientes",
                name: "admin-customers",
                component: () => import("@/resources/Dashboard/_components/Store/_components/customers/AllCustomers.vue"),
            },
            {
                path: "carrinhos",
                name: "admin-carts",
                component: () => import("@/resources/Dashboard/_components/Store/_components/carts/CartsComp.vue"),
            },
            {
                path: "compras",
                name: "admin-purchases",
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
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0, behavior: "smooth" };
        }
    },
});

router.beforeEach(async (to, from, next) => {
    NProgress.done();
    NProgress.start(); // Inicia a barra de progresso
    try {
        if (to.matched.some((record) => record.meta.requiresLogin)) {
            const isAuthenticated = await store.getters.isAuthenticated("authToken");
            if (isAuthenticated === true) {
                next();
            } else {
                store.commit("auth/setRedirectTo", to.fullPath);
                store.commit("SET_NOTIFICATION", { title: "Aviso!", type: "warning", message: "Faça Login" });
                store.commit("auth/SET_LOGIN_OVERLAY", true);
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
                    store.commit("SET_NOTIFICATION", { title: "Erro!", type: "error", message: "Sem premisão para processeguir" });

                    store.commit("auth/SET_LOGIN_OVERLAY", true);
                    next(false);
                } else {
                    store.commit("SET_NOTIFICATION", { title: "Erro!", type: "error", message: "Redirecionando para Página Inicial" });
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

router.afterEach(async () => {
    nextTick(() => {
        NProgress.done();
    });
});
export default router;
