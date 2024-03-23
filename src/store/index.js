import { createStore } from "vuex";
import axios from "axios";
import config from "@/config/config";
import { setCookie, getCookie, removeCookie, cookieExists, errorMessage } from "@/config/cookieUtils";
import { tryOnUnmounted } from "@vueuse/core";

const authToken = getCookie("authToken");
const headers = {
    Authorization: authToken ? `Ecommerce ${authToken}` : null,
};

const api = axios.create({
    baseURL: config.apiURL,
});

export default createStore({
    namespaced: true,
    state: {
        /// Loja
        storeName: "Shop",
        // users
        tring: 0,
        dashboard: "dashboard",
        /// products
        product: {},
        products: [],

        /// categories
        categories: [],
        category: {},
        subCategories: [],
        sub_categories: [],

        /// orders:
        orders: {},

        /// customers
        customers: {},

        ///carts
        cartProducts: [],

        /// snackbar
        snackbar: false,
        snackbarText: "",
        snackbarColor: "",
    },

    getters: {
        ///user
        isAuthenticated: (state) => (cookieName) => {
            return cookieExists(cookieName);
        },
        isUserAdmin: async (state) => {
            try {
                const roleCookieValue = await getCookie("poRO");
                if (roleCookieValue) {
                    return roleCookieValue === "admin";
                }
                return false;
            } catch (error) {
                console.error("Erro ao obter o cookie 'poRO':", error);
                return false;
            }
        },

        ///cart
        tempCart: (state) => (cookieName) => {
            return getCookie(cookieName);
        },
        cartProducts: (state) => state.cartProducts,
    },

    mutations: {
        updateSnackbar(state, payload) {
            state.snackbar = payload.show;
            state.snackbarText = payload.text;
            state.snackbarColor = payload.color;
            setTimeout(() => {
                state.snackbar = false;
                state.snackbarText = "";
            }, 4000);
        },

        // users
        Set_tringValue(state) {
            state.tring += 1;
        },
        //categories
        categoryDetails(state, categoryDetails) {
            state.category = categoryDetails;
        },
        CLEAR_CATEGORY(state) {
            state.category = {};
        },
        // products
        productDetails(state, productDetails) {
            state.product = productDetails;
        },
        CLEAR_PRODUCTS(state) {
            state.products = [];
        },
        SET_PRODUCTS(state, products) {
            state.products = products;
        },

        // orderes
        CLEAR_ORDERS(state) {
            state.orders = {};
        },
        SET_ORDERS(state, orders) {
            state.orders = orders;
        },

        // customers
        CLEAR_CUSTOMERS(state) {
            state.customers = {};
        },
        SET_CUSTOMERS(state, customers) {
            state.customers = customers;
        },

        //carts
        CLEAR_CARTPRODUCTS(state) {
            state.cartProducts = [];
        },
        SET_CARTPRODUCTS(state, products) {
            state.cartProducts = products;
        },

        // categories
        SET_CATEGORIES(state, payload) {
            state.categories = payload;
        },
    },

    actions: {
        ///admin

        /*
        Produts
        */

        //////////// add
        async addProduct({ commit }, payload) {
            try {
                const res = await axios.post(`${config.apiURL}/product`, payload, { headers });

                if (res.status === 200) {
                    commit("updateSnackbar", { show: true, text: "Produto adicionado", color: "green" });
                    window.location.reload();
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        ///////////////// update
        async updateProduct({ commit }, { productId, updatedProductData }) {
            try {
                const res = await axios.request({
                    method: "put",
                    baseURL: config.apiURL,
                    url: `/product/${productId}`,
                    headers: headers,
                    data: { ...updatedProductData },
                });

                if (res.data) {
                    const products = res.data;
                    commit("SET_PRODUCTS", products);
                    commit("updateSnackbar", { show: true, text: "Produto actualizado", color: "green" });
                    window.location.reload();
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async updateImage({ commit }, { productId, formData }) {
            try {
                const res = await axios.put(`${config.apiURL}/product/image/${productId}`, formData, { headers: { "Content-Type": "multipart/form-data", ...headers } });

                if (res.data) {
                    const products = res.data;
                    commit("updateSnackbar", { show: true, text: "Produto actualizado", color: "green" });
                    window.location.reload();
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        ////////////// delete
        async deleteProduct({ commit }, { productId, router }) {
            try {
                const res = await axios.delete(`${config.apiURL}/product/${productId}`, { headers });

                commit("updateSnackbar", { show: true, text: "Produto apagado", color: "green" });
                router.push({ name: "produtos" });
            } catch (error) {
                errorMessage(error);
            }
        },

        async getAllProductsAdmin({ commit }, payload) {
            try {
                const res = await axios.request({
                    method: "get",
                    baseURL: config.apiURL,
                    url: "/products/admin",
                    params: { offset: payload },
                    headers,
                });

                if (res.data) {
                    const products = res.data;
                    commit("SET_PRODUCTS", products);
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async getProducts({ commit }, payload) {
            try {
                const res = await axios.request({
                    method: "get",
                    baseURL: config.apiURL,
                    url: "/products",
                    params: { offset: payload },
                });

                if (res.data) {
                    const products = res.data;
                    commit("SET_PRODUCTS", products);
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async detailsProductAdmin({ commit }, produtoId) {
            try {
                const res = await axios.get(`${config.apiURL}/product/admin/${produtoId}`, { headers });
                const productDetails = res.data.product;
                commit("productDetails", { ...productDetails });
                return;
            } catch (error) {
                errorMessage(error);
            }
        },

        /*

        Cataegories

        */

        async getAllCategoryAdmin({ commit }) {
            try {
                const res = await axios.get(`${config.apiURL}/categories`);
                const categories = res.data.categories;
                commit("SET_CATEGORIES", categories);
            } catch (error) {
                errorMessage(error);
            }
        },

        async getAllCategory({ commit }) {
            try {
                const res = await axios.get(`${config.apiURL}/categories/all`);
                const categories = res.data.categories;
                commit("SET_CATEGORIES", categories);
            } catch (error) {
                errorMessage(error);
            }
        },

        async getAllCategoryAdmin({ commit }) {
            try {
                const res = await axios.get(`${config.apiURL}/categories`, { headers });
                const categories = res.data.categories;
                commit("SET_CATEGORIES", categories);
            } catch (error) {
                errorMessage(error);
            }
        },

        async createCategory({ commit, dispatch }, categoryName) {
            try {
                const res = await axios.post(
                    `${config.apiURL}/category`,
                    {
                        categoryName,
                    },
                    { headers }
                );

                if (res.status === 200) {
                    commit("updateSnackbar", { show: true, text: "Categoria criada", color: "green" });
                    dispatch("getAllCategory");
                    return;
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async createSubCategory({ commit, dispatch }, payload) {
            try {
                const res = await axios.post(
                    `${config.apiURL}/subCategory`,

                    payload,
                    { headers }
                );

                if (res.status === 200) {
                    commit("updateSnackbar", { show: true, text: "SubCategoria criada", color: "green" });
                    dispatch("getAllCategory");
                    return;
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async createSub_category({ commit, dispatch }, payload) {
            try {
                const res = await axios.post(
                    `${config.apiURL}/sub_category`,

                    payload,
                    { headers }
                );

                if (res.status === 200) {
                    commit("updateSnackbar", { show: true, text: "Sub_categoria criada", color: "green" });
                    dispatch("getAllCategory");
                    return;
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        /*
        Orders
        */
        ////////// all
        async getAllOrders({ commit }, payload) {
            try {
                const res = await axios.request({
                    method: "get",
                    baseURL: config.apiURL,
                    url: "/orders/admin",
                    params: { offset: payload },
                    headers: headers,
                });

                const orders = res.data.orders;
                commit("SET_ORDERS", { ...orders });
            } catch (error) {
                errorMessage(error);
            }
        },

        /*
        Orders
        */
        ////////// all
        async getAllCustomers({ commit }, payload) {
            try {
                const res = await axios.request({
                    method: "get",
                    baseURL: config.apiURL,
                    url: "/customers",
                    params: { offset: payload },
                    headers: {
                        Authorization: `Ecommerce ${authToken}`,
                    },
                });

                const customers = res.data;

                commit("SET_CUSTOMERS", { ...customers });
            } catch (error) {
                errorMessage(error);
            }
        },

        /*/////////////////// Cliente /////////////////////*/

        /*
            Categories
        */
        async detailsCategory({ commit }, categoryId) {
            try {
                const res = await axios.get(`${config.apiURL}/category/${categoryId}`);

                const categoryDetails = res.data.category;
                commit("categoryDetails", { ...categoryDetails });
                return;
            } catch (error) {
                errorMessage(error);
            }
        },
        /*
       Products
       */

        async getAllProducts({ commit }, payload) {
            try {
                const res = await axios.request({
                    method: "get",
                    baseURL: config.apiURL,
                    url: "products",
                    params: {
                        ...payload,
                    },
                });

                if (res.data) {
                    const products = res.data;
                    commit("SET_PRODUCTS", products);
                }
            } catch (error) {
                errorMessage(error);
            }
        },
        async detailsProduct({ commit }, produtoId) {
            try {
                const res = await axios.get(`${config.apiURL}/product/${produtoId}`);
                const productDetails = res.data.product;
                commit("productDetails", { ...productDetails });
                return;
            } catch (error) {
                errorMessage(error);
            }
        },

        /*
            Users
        */

        async addToCart({ commit }, { isAuthenticated, item }) {
            if (!isAuthenticated) {
                let tempCart = getCookie("tempCart");
                if (!tempCart) {
                    tempCart = [];
                } else {
                    tempCart = JSON.parse(tempCart);
                }

                const existingProductIndex = tempCart.findIndex((product) => product.id === item.id);

                if (existingProductIndex !== -1) {
                    tempCart[existingProductIndex].quantity += item.quantity;
                } else {
                    tempCart.push(item);
                }

                setCookie("tempCart", JSON.stringify(tempCart), 7);

                commit("updateSnackbar", { show: true, text: "Produto adicionado ao carrinho ", color: "green" });
            } else {
                console.log("Usuário autenticado, adicionando produto ao carrinho no servidor...");
            }
        },

        async displayTempCartPrices({ commit }, isAuthenticated) {
            const tempCart = getCookie("tempCart");

            try {
                if (isAuthenticated) {
                    return;
                } else {
                    if (tempCart) {
                        const Products = JSON.parse(tempCart);

                        const tempPrices = [];
                        const cartProducts = [];

                        for (const product of Products) {
                            try {
                                const res = await axios.get(`${config.apiURL}/product/${product.id}`);
                                const productDetails = res.data.product;

                                cartProducts.push({
                                    productId: productDetails._id,
                                    productName: productDetails.productName,
                                    productPrice: productDetails.productPrice,
                                    picture: productDetails.productImage[0],
                                    quantity: Number(product.quantity),
                                    subtotal: product.quantity * productDetails.productPrice,
                                });

                                tempPrices.push(product.quantity * productDetails.productPrice);
                            } catch (error) {
                                errorMessage(error);
                            }
                        }
                        const totalPrice = tempPrices.reduce((total, currentValue) => total + currentValue, 0);
                        commit("SET_CARTPRODUCTS", cartProducts);

                        return;
                    }
                }
            } catch (error) {}
        },

        async sendOrder({ commit }, payload) {
            console.log(payload);
            return
            try {
                const res = await axios.request({
                    method: "post",
                    baseURL: config.apiURL,
                    url: "/user",
                    data: payload.values,
                });
                commit("updateSnackbar", { show: true, text: "Pedido enviado", color: "green" });
                payload.router.push({ name: "/" });
            } catch (error) {
                errorMessage(error);
            }
        },

        async newUser({ commit }, payload) {
            try {
                const res = await axios.request({
                    method: "post",
                    baseURL: config.apiURL,
                    url: "/user",
                    data: payload.values,
                });
                commit("updateSnackbar", { show: true, text: "Conta criada", color: "green" });
                payload.router.push({ name: "login" });
            } catch (error) {
                errorMessage(error);
            }
        },

        async login({ commit }, payload) {
            try {
                const res = await api.post("/login", payload.values);
                const user = res.data.user;
                if (user.role.includes("admin")) {
                    setCookie("authToken", user.token, 1);
                    setCookie("poRO", user.role[1], 1);
                } else {
                    setCookie("authToken", user.token, 4);
                }

                localStorage.setItem("userData", JSON.stringify({ name: user.name, email: user.email, id: user._id }));

                const redirect = payload.router.currentRoute.value.query.redirect || "/";
                payload.router.push(redirect);
            } catch (error) {
                errorMessage(error);
            }
        },

        async logout({ commit }, router) {
            try {
                removeCookie("authToken");
                removeCookie("poRO");
                localStorage.removeItem("userData");
                router.push({ name: "login" });
            } catch (error) {
                errorMessage(error);
            }
        },
    },
    modules: {},
});
