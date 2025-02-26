import { createStore } from "vuex";
import axios from "axios";
import config from "@/config/config";
import { setCookie, getCookie, removeCookie, cookieExists, errorMessage } from "@/config/cookieUtils";
import router from "@/router";

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
        categories: null,
        category: {},
        subCategories: [],
        sub_categories: [],

        /// orders:
        orders: {},
        addresses: [],
        selectAddress: null,
        selected: false,
        /// payment
        amoutPayment: null,
        orderPaymentId: null,

        /// customers
        customers: {},

        ///carts
        cart: {},
        cartPrice: 0,

        /// snackbar
        snackbarText: "",
        snackbarType: "",
        redirectTo: null,
        authToken: null,

        // confirmation dialog
        overlay: false,
        // dialog
        payment: false,
        loginOverlay: false,
        // statistic
        dataStatistic: {},
    },

    getters: {
        // producs
        products: (state) => state.products,

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
        cart: (state) => state.cart,
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
        snackbarText: (state) => state.snackbarText,
        snackbarType: (state) => state.snackbarType,
    },

    mutations: {
        // users
        DETAILS_USER(state, data) {
            state.userDetails = data;
        },
        updateSnackbar(state, payload) {
            state.snackbarText = payload.text;
            state.snackbarType = payload.snackbarType;
            setTimeout(() => {
                state.snackbarText = "";
            }, 4000);
        },
        // loginOverlay
        SET_LOGIN_OVERLAY(state, status) {
            state.loginOverlay = status;
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
            state.cart = {};
        },
        SET_CARTPRODUCTS(state, products) {
            state.cart = products;
        },
        SET_CARTPRICE(state, price) {
            state.cartPrice = price;
        },
        CLEAR_CARTPRICE(state) {
            state.cartPrice = null;
        },

        // categories
        SET_CATEGORIES(state, payload) {
            state.categories = payload;
        },
        CLEAR_CATEGORIES(state) {
            state.categories = null;
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
                const res = await sendAxio("post", `/product`, payload, headers());

                if (res.status === 200) {
                    commit("updateSnackbar", { text: "Produto adicionado", snackbarType: "success" });
                    window.location.reload();
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        ///////////////// update
        async updateProduct({ commit }, payload) {
            try {
                const res = await axios.request({
                    method: "put",
                    baseURL: config.apiURL,
                    url: `/product/${payload.productSeleted}`,
                    headers: headers(),
                    data: payload.formData,
                });

                if (res.data) {
                    const products = res.data;
                    commit("SET_PRODUCTS", products);
                    commit("updateSnackbar", { text: "Produto actualizado", snackbarType: "success" });
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
                    commit("updateSnackbar", { text: "Produto actualizado", snackbarType: "success" });
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

                commit("updateSnackbar", { text: "Produto apagado", snackbarType: "success" });
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
                    data: payload.formData,
                    headers: { "Content-Type": "multipart/form-data", ...headers() },
                });

                if (res.status === 200) {
                    commit("updateSnackbar", { text: "Variçãao criada", snackbarType: "success" });
                    return true;
                }
            } catch (error) {
                errorMessage(error);
                return false;
            }
        },

        async updateVariation({ commit }, payload) {
            try {
                const res = await axios.request({
                    method: "put",
                    baseURL: config.apiURL,
                    url: `/variation/${payload.id}`,
                    data: payload.formData,
                    headers: { "Content-Type": "multipart/form-data", ...headers() },
                });

                if (res.status === 200) {
                    commit("updateSnackbar", { text: "Varição modificada", snackbarType: "success" });
                    return true;
                }
            } catch (error) {
                errorMessage(error);
                return false;
            }
        },

        async detailsVariation({ commit }, payload) {
            try {
                const res = await sendAxio("get", `/variation/${payload.variation}`, null, headers(), { product: payload.product });
                if (res.status === 200) {
                    return res.data.variation;
                }
                commit("updateSnackbar", { text: "", snackbarType: "" });
            } catch (error) {
                errorMessage(error);
            }
        },

        async AllvariationsAdmin({ commit }, payload) {
            try {
                const res = await sendAxio("get", `/variations`, null, headers(), { product: payload });
                if (res.status == 200) {
                    return res.data.variations;
                }
                commit("updateSnackbar", { text: "", snackbarType: "" });
            } catch (error) {
                errorMessage(error);
            }
        },

        async getAllProductsAdmin({ commit }, payload) {
            try {
                const res = await sendAxio("get", "/products/admin", null, headers(), payload);

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
                if (res.status === 200) {
                    commit("productDetails", res.data.product);
                    return;
                }
            } catch (error) {
                errorMessage(error);
                return true;
            }
        },

        /*
       Rating
       */
        async deleteRating({ commit }, payload) {
            try {
                const res = await sendAxio("patch", `/rating/${payload.rating}/delete`, null, headers(), null);
                if (res.status === 200) {
                    commit("updateSnackbar", { text: "Comentário apagado", snackbarType: "success" });
                }
                return;
            } catch (error) {
                errorMessage(error);
                return;
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
                    commit("updateSnackbar", { text: "Categoria criada", snackbarType: "success" });
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
                    commit("updateSnackbar", { text: "SubCategoria criada", snackbarType: "success" });
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
                    commit("updateSnackbar", { text: "Sub_categoria criada", snackbarType: "success" });
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
                return res;
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
                    url: "/products/",
                    params: payload,
                });
                if (res.status === 200) {
                    const products = res.data;
                    commit("SET_PRODUCTS", products);
                    return;
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async searchProducts({ commit }, payload) {
            try {
                const res = await axios.request({
                    method: "get",
                    baseURL: config.apiURL,
                    url: `/products/search/${payload.search}`,
                    params: { offset: payload, category: payload.category },
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
                const res = await sendAxio("get", `${config.apiURL}/product/${produtoId}`, null, headers(), null);
                if (res.status === 200) {
                    commit("productDetails", res.data.product);
                }
                return;
            } catch (error) {
                errorMessage(error);
            }
        },

        /*
       Rating cliente
       */
        async sendRating({ commit }, payload) {
            try {
                const res = await sendAxio("post", `${config.apiURL}/rating/${payload.productId}`, { ratingScore: payload.ratingScore, ratingText: payload.ratingText }, headers(), null);

                if (res.status === 200) {
                    commit("updateSnackbar", { text: "Avaliaçao adicionada!", snackbarType: "success" });
                    window.location.reload();
                }
                return;
            } catch (error) {
                errorMessage(error);
                return;
            }
        },

        /*
       Carts cliente
       */

        async addToCart({ commit }, { isAuthenticated, item }) {
            const itemProduct = item;
            const user = JSON.parse(localStorage.getItem("userData"));

            try {
                if (!isAuthenticated) {
                    let tempCart = getCookie("tempCart");

                    if (!tempCart) {
                        tempCart = [];
                    } else {
                        tempCart = JSON.parse(tempCart);
                    }

                    const existingProductIndex = tempCart.findIndex((item) => {
                        if (item.productId == itemProduct.productId) {
                            if (item.variation.snackbarType == itemProduct.variation.snackbarType) {
                                if (item.variation.model == itemProduct.variation.model) {
                                    if (item.variation.material == itemProduct.variation.material) {
                                        return item.variation.size == itemProduct.variation.size;
                                    }
                                    return false;
                                }
                                return false;
                            }
                            return false;
                        }
                        return false;
                    });

                    if (existingProductIndex !== -1) {
                        tempCart[existingProductIndex].quantity += Number(itemProduct.quantity) || 1;
                    } else {
                        tempCart.push({
                            productId: itemProduct.productId,
                            quantity: Number(itemProduct.quantity) || 1,
                            variation: {
                                snackbarType: itemProduct.variation.snackbarType,
                                model: itemProduct.variation.model,
                                size: itemProduct.variation.size,
                                material: itemProduct.variation.material,
                            },
                            item: Date.now(),
                        });
                    }

                    setCookie("tempCart", JSON.stringify(tempCart), 7);
                    commit("updateSnackbar", { text: "Produto adicionado ao carrinho ", snackbarType: "success" });
                    return;
                } else {
                    const res = await sendAxio("post", `/cart/${user.id}/addProduct`, item, headers());

                    commit("updateSnackbar", { text: `${res.data.message}`, snackbarType: "success" });
                    return;
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async removeProductCart({ commit }, payload) {
            const user = JSON.parse(localStorage.getItem("userData"));

            try {
                if (!payload.isAuthenticated) {
                    let tempCart = JSON.parse(getCookie("tempCart"));

                    if (tempCart && tempCart.length > 0) {
                        tempCart = tempCart.filter((item) => item.item !== payload.item);

                        setCookie("tempCart", JSON.stringify(tempCart), 1);

                        if (tempCart.length == 0) {
                            window.location.reload();
                        }
                        commit("updateSnackbar", { text: "Item removido", snackbarType: "success" });
                    } else {
                        commit("updateSnackbar", { text: "Carrinho vaio", snackbarType: "success" });
                        window.location.reload();
                    }

                    return;
                } else {
                    const res = await sendAxio("delete", `/cart/${user.id}/remove/${payload.item}`, null, headers());

                    commit("updateSnackbar", { text: `${res.data.message}`, snackbarType: "success" });
                    return;
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async displayCartPrices({ commit }, isAuthenticated) {
            const user = JSON.parse(localStorage.getItem("userData"));
            const tempCart = getCookie("tempCart");

            try {
                if (isAuthenticated) {
                    const res = await axios.request({
                        method: "post",
                        baseURL: config.apiURL,
                        url: `/cart/${user.id}/prices`,
                        headers: headers(),
                    });

                    commit("SET_CARTPRICE", res.data.totalProducts);
                } else {
                    if (tempCart) {
                        const res = await sendAxio("post", `/cart/${false}/prices`, JSON.parse(tempCart), headers());

                        commit("SET_CARTPRICE", res.data.totalProducts);
                        return;
                    }
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async displayCartProducts({ commit }, isAuthenticated) {
            const tempCart = JSON.parse(getCookie("tempCart"));
            const user = JSON.parse(localStorage.getItem("userData"));

            try {
                if (isAuthenticated === true) {
                    const res = await sendAxio("post", `/cart/${user.id}/products`, null, headers());
                    if (res.status === 200) {
                        commit("SET_CARTPRODUCTS", { ...res.data });
                        return;
                    }
                    throw new Error();
                } else if (tempCart) {
                    if (tempCart.length === 0) {
                        return false;
                    }
                    const userId = false;
                    const res = await sendAxio("post", `/cart/${userId}/products`, tempCart, headers());
                    if (res.status === 200) {
                        commit("SET_CARTPRODUCTS", { ...res.data });
                        return;
                    }
                }
                throw new Error();
            } catch (error) {
                errorMessage(error);
            }
        },

        async updateProductQuantity({ commit }, payload) {
            const user = JSON.parse(localStorage.getItem("userData"));

            if (payload.isAuthenticated === false) {
                if (!tempCart) {
                    return;
                } else {
                    let tempCart = JSON.parse(getCookie("tempCart"));
                    const existingProductIndex = tempCart.findIndex((product) => payload.item === product.item);

                    if (existingProductIndex !== -1) {
                        tempCart[existingProductIndex].quantity = Number(payload.quantity);

                        setCookie("tempCart", JSON.stringify(tempCart), 1);
                    }
                }

                commit("updateSnackbar", { text: "Produto adicionado ao carrinho ", snackbarType: "success" });
                return;
            } else {
                const res = await sendAxio("put", `/cart/${user.id}/update/${payload.item}/${Number(payload.quantity)}`, null, headers());

                commit("updateSnackbar", { text: `${res.data.msg}`, snackbarType: "success" });
                return;
            }
        },

        /*
           Olders cliente
       */

        async sendOrder({ commit, state }, payload) {
            const user = JSON.parse(localStorage.getItem("userData"));

            async function sendOrderRequest(data) {
                const { cart, address, reference } = data;

                const delivery = { address, reference };
                try {
                    const res = await sendAxio("post", `/order`, { cart, delivery }, headers());
                    if (res.status === 200) {
                        const order = res.data.order;
                        commit("updateSnackbar", { text: "Pedido enviado", snackbarType: "success" });
                        commit("SET_ID_ORDER", order._id);
                        commit("SET_AMOUTPAYMENT", order.totalPrice);
                        commit("SET_PAYMENT");
                        router.push({ name: "selfOrders", params: { user: `${user.id}` } });
                    }
                } catch (error) {
                    errorMessage(error);
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
                            address: addressId,
                            reference: payload.reference,
                        });
                    }
                } else {
                    await sendOrderRequest({
                        cart: payload.cart,
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

        async deleteOrderClient({ commit }, payload) {
            try {
                const res = await sendAxio("patch", `/order/${payload}`, null, headers());

                if (res.status === 200) {
                    commit("updateSnackbar", { text: "Pedido apagado", snackbarType: "success" });
                    router.go(0);
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async orderToFalse({ commit }, payload) {
            try {
                const res = await sendAxio("patch", `/order/${payload}`, null, headers());

                if (res.status === 200) {
                    commit("updateSnackbar", { text: "Pedido apagado", snackbarType: "success" });
                    router.go(0);
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        /*
            Users
        */

        async newUser({ commit }, payload) {
            const values = {
                email: payload.emailSignUp,
                password: payload.passwordSignUp,
                firstName: payload.firstNameSignUp,
                lastName: payload.lastNameSignUp,
            };
            try {
                const res = await sendAxio("post", `/user`, values, null);
                if (res.status === 200) {
                    commit("updateSnackbar", { text: "Conta criada, faça o login", snackbarType: "success" });
                    commit("SET_LOGIN_OVERLAY", true);
                }
            } catch (error) {
                errorMessage(error);
            }
        },
        async novoVisitante({ commit }) {
            sendAxio("get", `/visitaReg`, null, null);
            commit("", false);
        },
        // auth
        async login({ commit, state }, payload) {
            try {
                const res = await sendAxio("post", `/login`, payload.values, null);

                if (res.status === 200) {
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
                        "userData", // name //
                        JSON.stringify({
                            firstName: auth.firstName,
                            lastName: auth.lastName,
                            email: auth.email,
                            id: auth._id,
                            profilePhoto: auth.profilePhoto,
                        })
                    );
                } else {
                    commit("updateSnackbar", { text: "Dados errados", snackbarType: "error" });
                    return;
                }

                const user = JSON.parse(localStorage.getItem("userData"));

                if (tempCart) {
                    const res = await sendAxio("post", `/cart/${user.id}/addProduct`, JSON.parse(tempCart), headers());
                    if (res.status === 200) {
                        // Limpar o cookie do carrinho
                        removeCookie("tempCart");
                    }
                }

                commit("updateSnackbar", { text: "Bem-vindo", snackbarType: "success" });
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

                commit("updateSnackbar", { text: "", snackbarType: "" });

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
                    return true;
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async deleteAddress({ commit }, payload) {
            try {
                const res = await sendAxio("put", `/customer/${payload}/address`, null, headers());

                if (res.status === 200) {
                    commit("updateSnackbar", { text: "Endereço apagado", snackbarType: "success" });
                    return;
                } else {
                    commit("updateSnackbar", { text: "Falha ao apagar", snackbarType: "success" });
                    return;
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        /*
         Payment
        */

        async mpesapay({ commit, state }, payload) {
            try {
                const res = await sendAxio("post", `/mpesaPay`, { ...payload, orderId: state.orderPaymentId }, headers());
                if (res.status === 200 || res.status === 201) {
                    commit("updateSnackbar", { text: res.data.message, snackbarType: "success" });
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
