import { createStore } from "vuex";
import axios from "axios";
import config from "@/config/config";
import { setCookie, getCookie, removeCookie, cookieExists, errorMessage } from "@/config/cookieUtils";

let tempCart = getCookie("tempCart");
function getAuthToken() {
    return getCookie("authToken");
}

function headers() {
    const authToken = getAuthToken();
    return {
        Authorization: authToken ? `Ecommerce ${authToken}` : null,
    };
}

async function sendAxio(method, url, data = null, headers = null) {
    try {
        const res = await axios.request({
            method: method,
            baseURL: config.apiURL,
            url: url,
            data: data,
            headers: headers,
        });

        return res;
    } catch (error) {
        console.error(`Erro na requisição ${method} para ${url}:`, error);
        throw error;
    }
}

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
        totalprice: 0,
        deliveryData: {},

        /// customers
        customers: {},

        ///carts
        cartProducts: [],
        cartPrice: [],

        /// snackbar
        snackbar: false,
        snackbarText: "",
        snackbarColor: "",
        dialogLog: false,
        redirectTo: null,
        authToken: null,
    },

    getters: {
        ///user
        isAuthenticated: () => (cookieName) => {
            return cookieExists(cookieName);
        },
        isUserAdmin: async () => {
            try {
                const roleCookieValue = await getCookie("poRO");
                if (roleCookieValue) {
                    return roleCookieValue === "admin";
                }
                return false;
            } catch (error) {
                return false;
            }
        },

        ///cart
        tempCart: () => (cookieName) => {
            return getCookie(cookieName);
        },
        cartProducts: (state) => state.cartProducts,
        cartPrice: (state) => state.cartPrice,
        deliveryData: (state) => state.deliveryData,
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
        // Dialog login
        dialogLog(state, status) {
            state.dialogLog = status;
        },
        setRedirectTo(state, route) {
            state.redirectTo = route;
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
        SET_DELIVERYDATA(state, data) {
            state.deliveryData = data;
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
        SET_CARTPRICE(state, price) {
            state.cartPrice = price;
        },
        CLEAR_CARTPRICE(state) {
            state.cartPrice = [];
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
                const res = await axios.request({
                    method: "post",
                    baseURL: config.apiURL,
                    url: `/product/`,
                    headers: headers(),
                    data: payload,
                });

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
                    headers: headers(),
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
                // const res = await axios.put(`${config.apiURL}/product/image/${productId}`, formData, { headers: { "Content-Type": "multipart/form-data", ...headers } });

                const res = await axios.request({
                    method: "put",
                    baseURL: config.apiURL,
                    url: `${config.apiURL}/product/image/${productId}`,
                    headers: { "Content-Type": "multipart/form-data", ...headers() },
                    data: formData,
                });

                if (res.data) {
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
                await axios.request({
                    method: "delete",
                    baseURL: config.apiURL,
                    url: `${config.apiURL}/product/${productId}`,
                    headers: headers(),
                });

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
                    headers: headers(),
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
                const res = await axios.request({
                    method: "get",
                    baseURL: config.apiURL,
                    url: `/product/admin/${produtoId}`,
                    headers: headers(),
                });

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
                const res = await axios.request({
                    method: "get",
                    baseURL: config.apiURL,
                    url: "/categories",
                    headers: headers(),
                });

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

        async createCategory({ commit, dispatch }, categoryName) {
            try {
                const res = await axios.request({
                    method: "post",
                    baseURL: config.apiURL,
                    url: `${config.apiURL}/category`,
                    headers: headers(),
                    data: categoryName,
                });

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
                const res = await axios.request({
                    method: "post",
                    baseURL: config.apiURL,
                    url: `${config.apiURL}/subCategory`,
                    headers: headers(),
                    data: payload,
                });

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
                const res = await axios.request({
                    method: "post",
                    baseURL: config.apiURL,
                    url: `${config.apiURL}/sub_category`,
                    headers: headers(),
                    data: payload,
                });
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
                    headers: headers(),
                });

                const orders = res.data.orders;
                commit("SET_ORDERS", { ...orders });
            } catch (error) {
                errorMessage(error);
            }
        },

        /*
        Customers
        */
        ////////// all
        async getAllCustomers({ commit }, payload) {
            try {
                const res = await axios.request({
                    method: "get",
                    baseURL: config.apiURL,
                    url: "/customers",
                    params: { offset: payload },
                    headers: headers(),
                });
                const customers = res.data;
                commit("SET_CUSTOMERS", { ...customers });
            } catch (error) {
                errorMessage(error);
            }
        },

        /*
        Carts
        */
        ////////// all
        async allCarts() {
            try {
                const res = await axios.request({
                    method: "get",
                    baseURL: config.apiURL,
                    url: "/carts",
                    headers: headers(),
                });
                console.log(res);
                return;
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

        async addToCart({ commit }, { isAuthenticated, item }) {
            const user = JSON.parse(localStorage.getItem("userData"));

            if (!isAuthenticated) {
                let tempCart = getCookie("tempCart");

                if (!tempCart) {
                    tempCart = [];
                } else {
                    tempCart = JSON.parse(tempCart);
                }

                const existingProductIndex = tempCart.findIndex((product) => item.productId === product.productId);

                if (existingProductIndex !== -1) {
                    tempCart[existingProductIndex].quantity += Number(item.quantity);
                } else {
                    tempCart.push(item);
                }

                setCookie("tempCart", JSON.stringify(tempCart), 7);
                commit("updateSnackbar", { show: true, text: "Produto adicionado ao carrinho ", color: "green" });
                return;
            } else {
                const res = await sendAxio("post", `/cart/${user.id}/addProduct`, item, headers());

                commit("updateSnackbar", { show: true, text: `${res.data.msg}`, color: "green" });
                return;
            }
        },

        async removeProductCart({ commit }, payload) {
            const user = JSON.parse(localStorage.getItem("userData"));

            if (!payload.isAuthenticated) {
                let tempCart = getCookie("tempCart");

                if (!tempCart) {
                    return;
                } else {
                    tempCart = JSON.parse(tempCart);

                    tempCart = tempCart.filter((item) => item.productId !== payload.product);

                    setCookie("tempCart", JSON.stringify(tempCart), 1);
                }

                commit("updateSnackbar", { show: false, text: "Produto adicionado ao carrinho ", color: "green" });
                return;
            } else {
                const res = await axios.request({
                    method: "delete",
                    baseURL: config.apiURL,
                    url: `/cart/${user.id}/remove/${payload.product}`,
                });

                commit("updateSnackbar", { show: true, text: `${res.data.msg}`, color: "green" });
                return;
            }
        },

        async displayTempCartPrices({ commit }, isAuthenticated) {
            const user = JSON.parse(localStorage.getItem("userData"));
            const tempCart = getCookie("tempCart");

            try {
                if (isAuthenticated) {
                    const res = await axios.request({
                        method: "get",
                        baseURL: config.apiURL,
                        url: `/cart/${user.id}/prices`,
                        headers: headers(),
                    });

                    commit("SET_CARTPRICE", res.data);
                } else {
                    if (tempCart) {
                        const Products = JSON.parse(tempCart);
                        const tempPrices = [];

                        for (const product of Products) {
                            try {
                                const res = await axios.get(`${config.apiURL}/product/${product.productId}`);
                                const productDetails = res.data.product;

                                tempPrices.push(product.quantity * productDetails.productPrice);
                            } catch (error) {
                                errorMessage(error);
                            }
                        }
                        commit("SET_CARTPRICE", tempPrices);

                        return;
                    }
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async displayTempCartProducts({ commit }, isAuthenticated) {
            const tempCart = JSON.parse(getCookie("tempCart"));
            const user = JSON.parse(localStorage.getItem("userData"));
            let cartProducts = [];

            try {
                if (isAuthenticated === true) {
                    const res = await sendAxio("post", `/cart/${user.id}/products`, null, headers());

                    cartProducts = res.data;
                    commit("SET_CARTPRODUCTS", cartProducts);
                    return;
                } else if (tempCart) {
                    if (tempCart.length === 0) {
                        return false;
                    }
                    const userId = false;

                    const res = await sendAxio("post", `/cart/${userId}/products`, tempCart, headers());

                    cartProducts = res.data;
                    commit("SET_CARTPRODUCTS", cartProducts);
                    return;
                }

                return;
            } catch (error) {
                errorMessage(error);
            }
        },

        async updateProductQuantity({ commit }, payload) {
            const user = JSON.parse(localStorage.getItem("userData"));

            if (!payload.isAuthenticated) {
                let tempCart = getCookie("tempCart");

                if (!tempCart) {
                    return;
                } else {
                    let tempCart = JSON.parse(getCookie("tempCart"));

                    const existingProductIndex = tempCart.findIndex((product) => payload.productId === product.productId);

                    if (existingProductIndex !== -1) {
                        tempCart[existingProductIndex].quantity = Number(payload.quantity);

                        setCookie("tempCart", JSON.stringify(tempCart), 1);
                    }
                }

                commit("updateSnackbar", { show: false, text: "Produto adicionado ao carrinho ", color: "green" });
                return;
            } else {
                const res = await sendAxio("put", `/cart/${user.id}/update/${payload.productId}/${Number(payload.quantity)}`, null, headers());

                commit("updateSnackbar", { show: false, text: `${res.data.msg}`, color: "green" });
                return;
            }
        },

        /*
            Users
        */

        async newUser({ commit }, payload) {
            try {
                const res = await sendAxio("post", `/user`, payload.values, null, null);
                if (res.data) {
                    commit("updateSnackbar", { show: true, text: "Conta criada", color: "green" });
                    payload.router.push({ name: "login" });
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        // auth
        async login({ commit, state }, payload) {
            try {
                const res = await sendAxio("post", `/login`, payload.values, null, null);

                const auth = res.data.user;

                // Definir o tempo de expiração do cookie baseado no papel do usuário
                if (auth.role.includes("admin")) {
                    setCookie("authToken", auth.token, 1);
                    setCookie("poRO", auth.role[1], 1);
                } else {
                    setCookie("authToken", auth.token, 4);
                }

                // Armazenar dados do usuário no localStorage
                localStorage.setItem(
                    "userData",
                    JSON.stringify({
                        name: auth.name,
                        email: auth.email,
                        id: auth._id,
                    })
                );

                const user = JSON.parse(localStorage.getItem("userData"));
                // Se houver um carrinho temporário, enviá-lo para o banco de dados
                if (tempCart) {
                    const res = await sendAxio("post", `/cart/${user.id}/addProduct`, JSON.parse(tempCart), headers());
                    if (res.data.success) {
                        // Limpar o cookie do carrinho
                        removeCookie("tempCart");
                    }
                }

                commit("updateSnackbar", { show: true, text: "Bem-vindo", color: "green" });
                let redirect = null;

                if (state.redirectTo) {
                    redirect = state.redirectTo;
                    commit("setRedirectTo", null);
                    commit("dialogLog", false);
                } else {
                    redirect = payload.router.currentRoute.value.query.redirect || "/";
                }
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
                commit("CLEAR_CARTPRICE");
                router.push({ name: "login" });
                commit("updateSnackbar", { show: false, text: "", color: "" });
            } catch (error) {
                errorMessage(error);
            }
        },

        // Order ////////

        async sendOrder({ commit }, payload) {
            const user = JSON.parse(localStorage.getItem("userData"));

            async function sendOrder(data) {
                const cart = data.cart;
                const payment = {
                    totalProductsPrice: data.confirmationData.totalProductsPrice,
                    amount: data.confirmationData.total,
                };
                const delivery = {
                    deliveryCost: data.confirmationData.shippingPrice,
                    referenceOrder: data.referece,
                };
                const res = await sendAxio("post", `/order/`, { cart, payment, delivery }, headers());

                if (res.data.success === true) {
                    // window.location.reload();
                    commit("updateSnackbar", { show: true, text: "Pedido enviado", color: "green" });
                }
            }

            try {
                if (payload.status === false) {
                    const res = await sendAxio("post", `/customer/${user.id}`, payload.data.delivery, headers());

                    if (res.data) {
                        commit("updateSnackbar", { show: true, text: "Pedido enviado", color: "green" });
                        payload.router.push({ name: "/" });
                    }
                    return;
                } else {
                    sendOrder(payload.data);
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async deliveryData({ commit }) {
            const user = JSON.parse(localStorage.getItem("userData"));

            try {
                const res = await sendAxio("get", `/customer/${user.id}/delivery`, null, headers());

                if (res) {
                    commit("SET_DELIVERYDATA", res.data);
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async buyNow({ commit }, { product }) {
            const tempPrices = [];
            const cartProducts = [];

            try {
                const res = await sendAxio("get", `/product/${product.id}`, null, null);

                const productDetails = res.data.product;

                cartProducts.push({
                    productId: productDetails._id,
                    productName: productDetails.productName,
                    productPrice: productDetails.productPrice,
                    picture: productDetails.productImage[0],
                    quantity: product.quantity,
                    subtotal: product.quantity * productDetails.productPrice,
                });

                tempPrices.push(product.quantity * productDetails.productPrice);
            } catch (error) {
                errorMessage(error);
            }

            commit("SET_CARTPRODUCTS", cartProducts);
        },

        async mpesapay({ commit }, payload) {
            try {
                const res = await sendAxio("post", `/mpesaPay`, { ...payload, value: this.state.totalprice }, headers());

                if (res.data.error) {
                    commit("updateSnackbar", { show: true, text: res.data.error, color: "red" });
                    payload.router.push({ name: "login" });
                }
                if (res.data.data) {
                    switch (res.data.data.output_ResponseCode) {
                        case "INS-0":
                            commit("updateSnackbar", { show: true, text: "Pagamento efectuado", color: "green" });
                            payload.router.push({ name: "login" });
                            break;

                        case "INS-4":
                            commit("updateSnackbar", { show: true, text: "Número fora de área", color: "red" });
                            payload.router.push({ name: "login" });
                            break;

                        case "INS-6":
                            commit("updateSnackbar", { show: true, text: "TFalha na transação", color: "red" });
                            payload.router.push({ name: "login" });
                            break;

                        case "INS-9":
                            commit("updateSnackbar", { show: true, text: "	Tempo limite da solicitação", color: "red" });
                            payload.router.push({ name: "login" });
                            break;

                        case "INS-15":
                            commit("updateSnackbar", { show: true, text: "Valor inválido usado", color: "red" });
                            payload.router.push({ name: "login" });
                            break;

                        case "INS-995":
                            commit("updateSnackbar", { show: true, text: "Perfil do cliente tem problemas", color: "red" });
                            payload.router.push({ name: "login" });
                            break;

                        case "INS-2006":
                            commit("updateSnackbar", { show: true, text: "Saldo insuficiente", color: "red" });
                            payload.router.push({ name: "login" });
                            break;

                        case "INS-2051":
                            commit("updateSnackbar", { show: true, text: "Número inválido", color: "red" });
                            payload.router.push({ name: "login" });
                            break;

                        case "INS-10":
                            commit("updateSnackbar", { show: true, text: "Trasanção duplicada", color: "red" });
                            payload.router.push({ name: "login" });
                            break;

                        default:
                            commit("updateSnackbar", { show: true, text: "Erro", color: "red" });
                            payload.router.push({ name: "login" });
                            break;
                    }
                }
            } catch (error) {
                errorMessage(error);
            }
        },
    },
    modules: {},
});
