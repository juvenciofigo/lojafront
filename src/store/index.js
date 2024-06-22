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

const user = JSON.parse(localStorage.getItem("userData"));

async function sendAxio(method, url, data = null, headers = null, params = null) {
    try {
        const res = await axios.request({
            method: method,
            baseURL: config.apiURL,
            url: url,
            data: data,
            headers: headers,
            params: params,
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
        storeName: process.env.VUE_APP_STORE_NAME,
        // users
        userDetails: null,
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
        addresses: null,
        selectAddress: null,
        selected: false,
        /// payment
        amoutPayment: null,
        orderPaymentId: null,

        /// customers
        customers: {},

        ///carts
        cartProducts: [],
        cartPrice: [],

        /// snackbar
        snackbar: false,
        snackbarText: "",
        snackbarColor: "",
        redirectTo: null,
        authToken: null,

        // confirmation dialog
        overlay: false,
        // dialog
        payment: false,
        loginOverlay: false,
        registerOverlay: false,
        // statistic
        dataStatistic: {},
    },

    getters: {
        ///user
        userDetails: (state) => state.userDetails,
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
        /// payment
        amoutPayment: (state) => state.amoutPayment,
        ///cart
        cartProducts: (state) => state.cartProducts,
        tempCart: () => (cookieName) => {
            return getCookie(cookieName);
        },
        cartPrice: (state) => state.cartPrice,
        addresses: (state) => state.addresses,
        selectAddress: (state) => state.selectAddress,

        // overlay
        overlay: (state) => state.overlay,
        payment: (state) => state.payment,
        loginOverlay: (state) => state.loginOverlay,
        registerOverlay: (state) => state.registerOverlay,
        snackbar: (state) => state.snackbar,
        snackbarText: (state) => state.snackbarText,
        snackbarColor: (state) => state.snackbarColor,
    },

    mutations: {
        // users
        DETAILS_USER(state, data) {
            state.userDetails = data;
        },
        updateSnackbar(state, payload) {
            state.snackbar = payload.show;
            state.snackbarText = payload.text;
            state.snackbarColor = payload.color;
            setTimeout(() => {
                state.snackbar = false;
                state.snackbarText = "";
            }, 4000);
        },
        // loginOverlay
        SET_LOGIN_OVERLAY(state, status) {
            state.loginOverlay = status;
        },
        SET_REGISTER_OVERLAY(state, status) {
            state.registerOverlay = status;
        },
        setRedirectTo(state, route) {
            state.redirectTo = route;
        },

        //  Overlay
        SET_OVERLAY(state, data) {
            state.overlay = data;
        },
        //  Payment
        SET_PAYMENT(state) {
            state.payment = !state.payment;
        },
        SET_AMOUTPAYMENT(state, amont) {
            state.amoutPayment = amont;
        },
        SET_ID_ORDER(state, amont) {
            state.orderPaymentId = amont;
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
        SET_ADDRESSES(state, data) {
            state.addresses = data;
        },
        CLEAR_ADDRESSES(state) {
            state.addresses = null;
        },
        SET_ADDRESS(state, data) {
            state.selectAddress = data;
        },
        CLEAR_ADDRESS(state) {
            state.selectAddress = null;
        },
        SET_PROVIDE_ADDRESS(state, data) {
            state.selected = data;
        },
        CLEAR_PROVIDE_ADDRESS(state) {
            state.selected = false;
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
        // statistic
        SET_DATA_STATISTIC(state, data) {
            state.dataStatistic = data;
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

        async addVariation({ commit }, payload) {
            try {
                const res = await axios.request({
                    method: "post",
                    baseURL: config.apiURL,
                    url: `/variation/${payload.product}`,
                    data: payload.variation,
                    headers: headers(),
                });

                if (res.status === 200) {
                    return true;
                }
                commit;
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

        async detailsProductAdmin({ commit }, produtoId) {
            try {
                const res = await axios.request({
                    method: "get",
                    baseURL: config.apiURL,
                    url: `/product/admin/${produtoId}`,
                    headers: headers(),
                });
                console.log(res);
                const productDetails = res.data.product;
                commit("productDetails", productDetails);
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
                    params: { offset: payload.offset },
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
                    url: "/customers/admin",
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
                    url: "/carts/admin",
                    headers: headers(),
                });
                console.log(res);
                return;
            } catch (error) {
                errorMessage(error);
            }
        },

        /**
         Estatistica
         */
        async estatistic({ commit }) {
            try {
                const res = await sendAxio("get", `/estatistic`, null, headers());
                if (res.status === 200) return res.data;
                commit();
            } catch (error) {
                errorMessage(error);
            }
        },

        async recentOrders({ commit }) {
            try {
                const res = await sendAxio("get", `/orders/admin`, null, headers(), { sortType: "createAt-descending", limit: 10 });
                if (res.status === 200) return res.data.orders.docs;
                commit();
            } catch (error) {
                errorMessage(error);
            }
        },

        async DataByMonth({ commit }) {
            try {
                const res = await sendAxio("get", `/DataByMonth`, null, headers());
                if (res.status === 200) commit("SET_DATA_STATISTIC", res.data);
                return;
            } catch (error) {
                errorMessage(error);
            }
        },

        /////////////////////////////////////////////////////////////////////////////////////////////////////

        /*/////////////////// Cliente /////////////////////*/

        /*
            Categories cliente
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
       Products cliente
       */

        async getAllProducts({ commit }, payload) {
            try {
                const res = await axios.request({
                    method: "get",
                    baseURL: config.apiURL,
                    url: "products",
                    params: { ...payload },
                });

                if (res.data) {
                    const products = res.data;
                    commit("SET_PRODUCTS", products);
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async searchProducts({ commit }, payload) {
            console.log(payload);
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
       Carts cliente
       */

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
                const res = await sendAxio("delete", `/cart/${user.id}/remove/${payload.product}`, null, headers());

                commit("updateSnackbar", { show: true, text: `${res.data.message}`, color: "green" });
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
           Olders cliente
       */

        async sendOrder({ commit, state }, payload) {
            console.log(payload);
            const user = JSON.parse(localStorage.getItem("userData"));

            async function sendOrderRequest(data) {
                const { cart, prices, address, reference } = data;
                const payment = { ...prices };
                const delivery = { address, reference };

                const res = await sendAxio("post", `/order`, { cart, payment, delivery }, headers());
                console.log(res);
                if (res.status === 200) {
                    const order = res.data.order;
                    commit("updateSnackbar", { show: true, text: "Pedido enviado", color: "green" });
                    // window.location.reload();
                    commit("SET_ID_ORDER", order._id);
                    commit("SET_AMOUTPAYMENT", order.totalPrice);
                    commit("SET_PAYMENT");
                    return true;
                } else {
                    return false;
                }
            }

            try {
                if (state.selected === false) {
                    const res = await sendAxio("post", `/customer/${user.id}/address`, payload.selectAddress, headers());

                    if (res.status === 200) {
                        const addressId = res.data.addressId;
                        await sendOrderRequest({
                            cart: payload.cart,
                            prices: payload.prices,
                            address: addressId,
                            reference: payload.reference,
                        });
                    }
                } else {
                    await sendOrderRequest({
                        cart: payload.cart,
                        prices: payload.prices,
                        address: payload.selectAddress.addressId,
                        reference: payload.reference,
                    });
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async getOldersCustomer({ commit }, payload) {
            try {
                const res = await axios.request({
                    method: "get",
                    baseURL: config.apiURL,
                    url: `/orders/${payload.user}`,
                    params: { offset: payload.offset },
                    headers: headers(),
                });

                if (res.status === 200) {
                    commit("SET_ORDERS", { ...res.data.orders });
                }
            } catch (error) {
                errorMessage(error);
                console.log(error);
                return false;
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

        /*
            Users
        */

        async newUser({ commit }, payload) {
            try {
                const res = await sendAxio("post", `/user`, payload.values, null);
                if (res.status === 200) {
                    commit("updateSnackbar", { show: true, text: "Conta criada", color: "green" });
                    commit("SET_LOGIN_OVERLAY", true);
                    commit("SET_REGISTER_OVERLAY", false);
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        // auth
        async login({ commit, state }, payload) {
            try {
                const res = await sendAxio("post", `/login`, payload.values, null);
                if (!res.status === 200) {
                    commit("updateSnackbar", { show: true, text: "Dados errados", color: "red" });
                }
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
                        firstName: auth.firstName,
                        lastName: auth.lastName,
                        email: auth.email,
                        id: auth._id,
                        profilePhoto: auth.profilePhoto,
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
                if (state.redirectTo !== null) {
                    redirect = state.redirectTo;
                    commit("setRedirectTo", null);
                    commit("SET_LOGIN_OVERLAY", false);
                    window.location.href = redirect;
                    return;
                }
                window.location.reload();
                return;
            } catch (error) {
                errorMessage(error);
            }
        },

        async logout({ commit }) {
            try {
                await removeCookie("authToken");
                await removeCookie("poRO");

                localStorage.removeItem("userData");

                commit("CLEAR_CARTPRICE");

                commit("updateSnackbar", { show: false, text: "", color: "" });

                window.location.reload();
                return;
            } catch (error) {
                errorMessage(error);
            }
        },

        async mySelfUserDetails({ commit }, payload) {
            try {
                const res = await sendAxio("get", `user/${payload}`, null, headers());

                if (res.status === 200) {
                    commit("DETAILS_USER", res.data);
                    return;
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        /*
        /// addresses
        */

        async addresses({ commit }) {
            const user = JSON.parse(localStorage.getItem("userData"));

            try {
                const res = await sendAxio("get", `/customer/${user.id}/addresses`, null, headers());

                if (res.status === 200) {
                    commit("SET_ADDRESSES", res.data);
                    return;
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async deleteAddress({ commit }, payload) {
            try {
                const res = await sendAxio("put", `/customer/${payload}/address`, null, headers());

                if (res.status === 200) {
                    commit("updateSnackbar", { show: true, text: "Endereço apagado", color: "green" });
                    return;
                } else {
                    commit("updateSnackbar", { show: true, text: "Falha ao apagar", color: "green" });
                    return;
                }
            } catch (error) {
                console.log("errrrrr", error);
                errorMessage(error);
            }
        },

        /*
         Cliente
        */

        async mpesapay({ commit, state }, payload) {
            try {
                const res = await sendAxio("post", `/mpesaPay`, { ...payload, orderId: state.orderPaymentId }, headers());

                console.log(res);

                if (res.status === 200 || res.status === 201) {
                    commit("updateSnackbar", { show: true, text: res.data.message, color: "green" });
                    commit("SET_PAYMENT");
                    window.location.href = `/perfil/${user.id}/pedidos`;
                    return;
                }
            } catch (error) {
                errorMessage(error);
                return false;
            }
        },
    },
    modules: {},
});
