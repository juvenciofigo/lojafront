import { createStore } from "vuex";
import axios from "axios";
import config from "@/config/config";
import { setCookie, getCookie, removeCookie, cookieExists, errorMessage } from "@/util/cookieUtils";
import router from "@/router";
import { ElNotification } from "element-plus";

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

import products from "./modules/products";
import categories from "./modules/categories";

export default createStore({
    namespaced: true,
    state: {
        /// Loja
        storeName: process.env.VUE_APP_STORE_NAME,
        // users
        tring: 0,
        dashboard: "dashboard",
        // profile
        mySelf: null,

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
        addresses: null,
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
        redirectTo: null,
        authToken: null,

        // confirmation dialog
        loadingPriceUpdate: false,
        // dialog
        payment: false,
        loginOverlay: false,
        // statistic
        dataStatistic: {},
    },

    getters: {
        // producs
        products: (state) => state.products,

        // profile
        mySelf: (state) => state.mySelf,

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

        /// payment
        amoutPayment: (state) => state.amoutPayment,

        ///cart
        cart: (state) => state.cart,
        tempCart: () => (cookieName) => {
            return getCookie(cookieName);
        },
        cartPrice: (state) => state.cartPrice,
        selectAddress: (state) => state.selectAddress,

        // overlay
        overlay: (state) => state.overlay,
        loadingPriceUpdate: (state) => state.loadingPriceUpdate,
        payment: (state) => state.payment,
        loginOverlay: (state) => state.loginOverlay,
    },

    mutations: {
        // Notificacao
        SET_NOTIFICATION(_, date) {
            ElNotification({
                title: date.title,
                type: date.type,
                message: date.message,
            });
        },
        SET_loadingPriceUpdate(state) {
            state.loadingPriceUpdate = !state.loadingPriceUpdate;
        },
        // loginOverlay
        SET_LOGIN_OVERLAY(state, status) {
            state.loginOverlay = status;
        },

        setRedirectTo(state, route) {
            state.redirectTo = route;
        },

        //  Payment
        SET_PAYMENT(state) {
            state.payment = !state.payment;
        },
        SET_AMOUTPAYMENT(state, data) {
            state.amoutPayment = data;
        },
        SET_ID_ORDER(state, data) {
            state.orderPaymentId = data;
        },

        // users
        Set_tringValue(state) {
            state.tring += 1;
        },
        //categories
        categoryDetails(state, data) {
            state.category = data;
        },
        CLEAR_CATEGORY(state) {
            state.category = {};
        },
        // products
        productDetails(state, data) {
            state.product = data;
        },
        CLEAR_PRODUCTS(state) {
            state.products = [];
        },
        SET_PRODUCTS(state, data) {
            state.products = data;
        },

        // orderes
        CLEAR_ORDERS(state) {
            state.orders = {};
        },
        SET_ORDERS(state, data) {
            state.orders = data;
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
        SET_CUSTOMERS(state, data) {
            state.customers = data;
        },

        //carts
        CLEAR_CARTPRODUCTS(state) {
            state.cart = {};
        },
        SET_CARTPRODUCTS(state, data) {
            state.cart = data;
        },
        SET_CARTPRICE(state, data) {
            state.cartPrice = data;
        },
        CLEAR_CARTPRICE(state) {
            state.cartPrice = 0;
        },

        // categories
        SET_CATEGORIES(state, data) {
            state.categories = data;
        },
        CLEAR_CATEGORIES(state) {
            state.categories = null;
        },

        // statistic
        SET_DATA_STATISTIC(state, data) {
            state.dataStatistic = data;
        },
        //
        SET_MYSELF(state, data) {
            state.mySelf = data;
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
                    commit("SET_NOTIFICATION", {
                        title: "Sucesso",
                        type: "success",
                        message: res.data.message,
                    });
                    window.location.reload();
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        ///////////////// update
        async updateProduct({ commit }, payload) {
            try {
                const res = await sendAxio("put", `/product/${payload.productSeleted}`, payload.formData, headers());

                // const res = await axios.request({
                //     method: "put",
                //     baseURL: config.apiURL,
                //     url: `/product/${payload.productSeleted}`,
                //     headers: headers(),
                //     data: payload.formData,
                // });

                if (res.status === 200) {
                    commit("SET_PRODUCTS", res.data);
                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });
                    window.location.reload();
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async updateImage({ commit }, { productId, formData }) {
            try {
                const res = await sendAxio("put", `/product/image/${productId}`, formData, { "Content-Type": "multipart/form-data", ...headers() });

                // const res = await axios.request({
                // method: "put",
                // baseURL: config.apiURL,
                // url: `${config.apiURL}/product/image/${productId}`,
                // headers: { "Content-Type": "multipart/form-data", ...headers() },
                // data: formData,
                // });

                if (res.status === 200) {
                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });
                    window.location.reload();
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        ////////////// delete
        async deleteProduct({ commit }, { productId, router }) {
            try {
                // await axios.request({
                // method: "delete",
                // baseURL: config.apiURL,
                // url: `${config.apiURL}/product/${productId}`,
                // headers: headers(),
                // });

                const res = await sendAxio("delete", `/product/${productId}`, null, headers());

                if (res.status === 200) {
                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });

                    router.push({ name: "produtos" });
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async addVariation({ commit }, payload) {
            try {
                // const res = await axios.request({
                //     method: "post",
                //     baseURL: config.apiURL,
                //     url: `/variation/${payload.product}`,
                //     data: payload.formData,
                //     headers: { "Content-Type": "multipart/form-data", ...headers() },
                // });

                const res = await sendAxio("post", `/variation/${payload.product}`, payload.formData, { "Content-Type": "multipart/form-data", ...headers() });

                if (res.status === 200) {
                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });
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
                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });
                    return true;
                }
            } catch (error) {
                errorMessage(error);
                return false;
            }
        },

        async detailsVariation(_, payload) {
            try {
                const res = await sendAxio("get", `/variation/${payload.variation}`, null, headers(), { product: payload.product });
                if (res.status === 200) {
                    return res.data.variation;
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async AllvariationsAdmin(_, payload) {
            try {
                const res = await sendAxio("get", `/variations`, null, headers(), { product: payload });
                if (res.status == 200) {
                    return res.data.variations;
                }
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
                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });
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
                    commit("SET_NOTIFICATION", { title: "Sucesso!", type: "success", message: res.data.message });
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
                    commit("SET_NOTIFICATION", { title: "Sucesso!", type: "success", message: res.data.message });
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
                    commit("SET_NOTIFICATION", { title: "Sucesso!", type: "success", message: res.data.message });
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

        /*
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

        // async getAllProducts({ commit }, payload) {
        //     try {
        //         const res = await axios.request({
        //             method: "get",
        //             baseURL: config.apiURL,
        //             url: "/products/",
        //             params: payload,
        //         });
        //         if (res.status === 200) {
        //             const products = res.data;
        //             commit("SET_PRODUCTS", products);
        //             return;
        //         }
        //     } catch (error) {
        //         errorMessage(error);
        //     }
        // },

        // async searchProducts({ commit }, payload) {
        //     try {
        //         const res = await axios.request({
        //             method: "get",
        //             baseURL: config.apiURL,
        //             url: `/products/search/${payload.search}`,
        //             params: { offset: payload, category: payload.category },
        //         });

        //         if (res.data) {
        //             const products = res.data;
        //             commit("SET_PRODUCTS", products);
        //         }
        //     } catch (error) {
        //         errorMessage(error);
        //     }
        // },

        // async detailsProduct({ commit }, produtoId) {
        //     try {
        //         const res = await sendAxio("get", `${config.apiURL}/product/${produtoId}`, null, headers(), null);
        //         console.log(res);

        //         if (res.status === 200) {
        //             commit("productDetails", res.data.product);
        //         }
        //         return;
        //     } catch (error) {
        //         errorMessage(error);
        //     }
        // },

        /*
       Rating cliente
       */
        async sendRating({ commit }, payload) {
            try {
                const res = await sendAxio("post", `${config.apiURL}/rating/${payload.productId}`, { ratingScore: payload.ratingScore, ratingText: payload.ratingText }, headers(), null);

                if (res.status === 200) {
                    commit("SET_NOTIFICATION", { title: "Sucesso!", type: "success", message: res.data.message });
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

                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: "Produto adicionado ao carrinho" });

                    return;
                } else {
                    const res = await sendAxio("post", `/cart/${user.id}/addProduct`, item, headers());

                    if (res.status === 200) commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });
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

                        commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: "Item removido" });
                    } else {
                        commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: "Carrinho vazio" });

                        window.location.reload();
                    }

                    return;
                } else {
                    const res = await sendAxio("delete", `/cart/${user.id}/remove/${payload.item}`, null, headers());
                    if (res.status === 200) commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });

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

            try {
                if (!payload.isAuthenticated) {
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

                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: "Produto adicionado ao carrinho" });

                    return;
                } else {
                    const res = await sendAxio("put", `/cart/${user.id}/update/${payload.item}/${Number(payload.quantity)}`, null, headers());

                    if (res.status === 200) {
                        commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });
                        return;
                    }
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        /*
           Olders cliente
       */

        async sendOrder({ commit, state }, payload) {
            const user = JSON.parse(localStorage.getItem("userData"));

            // Função separada para envio do pedido
            const sendOrderRequest = async (cart, address) => {
                try {
                    const res = await sendAxio("post", "/order", { cart, delivery: { address } }, headers());

                    if (res.status === 200) {
                        const order = res.data.order;
                        commit("CLEAR_CARTPRICE");
                        commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });
                        commit("SET_ID_ORDER", order._id);
                        commit("SET_AMOUTPAYMENT", order.totalPrice);
                        commit("SET_PAYMENT");
                        router.push({ name: "selfOrders", params: { user: `${user.id}` } });
                        return true;
                    }

                    throw new Error("Erro ao processar pedido.");
                } catch (error) {
                    errorMessage(error);
                    return false;
                }
            };

            try {
                // Determinar o endereço antes de chamar `sendOrderRequest`
                let addressId = payload.selectAddress.addressId;

                if (!state.selected) {
                    const res = await sendAxio("post", `/customer/${user.id}/address`, payload.selectAddress, headers());

                    if (res.status !== 200) throw new Error("Falha ao cadastrar endereço.");

                    addressId = res.data.addressId;
                }

                await sendOrderRequest(payload.cart, addressId);
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
                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });
                    router.go(0);
                }
                throw new Error();
            } catch (error) {
                errorMessage(error);
            }
        },

        async orderToFalse({ commit }, payload) {
            try {
                const res = await sendAxio("patch", `/order/${payload}`, null, headers());

                if (res.status === 200) {
                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });
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
                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: "Conta criada, faça o Login!" });
                    commit("SET_LOGIN_OVERLAY", true);
                    return;
                }
                throw new Error();
            } catch (error) {
                errorMessage(error);
            }
        },

        async novoVisitante({ commit }) {
            sendAxio("get", `/visitaReg`, null, null);
            commit("", false);
        },

        /*
            Profile
        */
        async MyProfile({ commit }, payload) {
            try {
                const res = await sendAxio("get", `/user/${payload.id}`, null, headers());
                if (res.status === 200) {
                    commit("SET_MYSELF", res.data);
                }
                return;
            } catch (error) {
                errorMessage(error);
            }
        },

        async updateMyProfile({ commit }, payload) {
            try {
                const res = await sendAxio("put", `/user/${payload.id}`, null, headers());
                if (res.status === 200) {
                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: "Conta criada, faça o Login!" });
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        /*
            Auth
        */
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
                    commit("SET_NOTIFICATION", { title: "Error", type: "error", message: res.data.message });
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

                commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: "Bem-vindo" });

                let redirect = null;
                if (state.redirectTo !== null) {
                    redirect = state.redirectTo;
                    commit("setRedirectTo", null);
                    commit("SET_LOGIN_OVERLAY", false);
                    window.location.href = redirect;
                    return;
                }
                window.location.reload();
            } catch (error) {
                errorMessage("resposta", error);
                return;
            }
        },

        async logout({ commit }) {
            try {
                await removeCookie("authToken");
                await removeCookie("poRO");

                localStorage.removeItem("userData");

                commit("CLEAR_CARTPRICE");
                window.location.reload();
                return;
            } catch (error) {
                errorMessage(error);
            }
        },

        /*
         addresses
        */

        async addresses({ commit }) {
            const user = JSON.parse(localStorage.getItem("userData"));

            try {
                const res = await sendAxio("get", `/customer/${user.id}/addresses`, null, headers());

                if (res.status === 200) {
                    commit("SET_ADDRESSES", res.data);
                    return res;
                }
            } catch (error) {
                errorMessage(error);
            }
        },

        async deleteAddress({ commit }, payload) {
            try {
                const res = await sendAxio("put", `/customer/${payload}/address`, null, headers());

                if (res.status === 200) {
                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });
                    return;
                }
                throw new Error();
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
                    commit("SET_NOTIFICATION", { title: "Sucesso", type: "success", message: res.data.message });
                    commit("SET_PAYMENT");
                    window.location.href = `/perfil/${user.id}/pedidos`;
                }
                throw new Error();
            } catch (error) {
                errorMessage(error);
                return false;
            }
        },
    },
    modules: {
        products,
        categories,
    },
});
