import { setCookie, removeCookie, getCookie, errorMessage } from "@/util/cookieUtils";
import notification from "@/util/notifications";
import sendAxio from "@/util/sendAxio";

const state = {
    cart: {},
    cartPrice: 0,
};

const getters = {
    totalProducts: (state) => state.cart.totalProducts,
};
const mutations = {
    SET_CART(state, cart) {
        state.cart = cart;
    },
    SET_CART_PRICE(state, price) {
        state.cartPrice = price;
    },
    CLEAR_CART_PRICE(state) {
        state.cartPrice = 0;
    },
    CLEAR_CART(state) {
        state.cart = {};
        state.cartPrice = 0;
        removeCookie("tempCart");
    },
    SET_CART_PRODUCTS(state, data) {
        state.cart = data;
    },
    CLEAR_CARTPRODUCTS(state) {
        state.cart = {};
    },
};

const actions = {
    async allCartsAdmin() {
        try {
            const res = await sendAxio({
                method: "get",
                url: "/carts/admin",
            });
            return res;
        } catch (error) {
            errorMessage(error);
        }
    },

    /////////////////Client ///////////
    async addToCart(_, { isAuthenticated, item }) {
        console.log(true);

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

                notification({ title: "Sucesso", type: "success", message: "Produto adicionado ao carrinho" });

                return;
            } else {
                const res = await sendAxio({ method: "post", url: `/cart/${user.id}/addProduct`, data: item });

                if (res.status === 200) {
                    notification({ title: "Sucesso", type: "success", message: res.data.message });
                    return;
                }
            }
        } catch (error) {
            errorMessage(error);
        }
    },

    async removeFromCart(_, payload) {
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

                    notification({ title: "Sucesso", type: "success", message: "Item removido" });
                } else {
                    notification({ title: "Sucesso", type: "success", message: "Carrinho vazio" });
                    window.location.reload();
                }

                return;
            } else {
                const res = await sendAxio({ method: "delete", url: `/cart/${user.id}/remove/${payload.item}` });
                if (res.status === 200) {
                    notification({ title: "Sucesso", type: "success", message: res.data.message });
                    return;
                }
            }
        } catch (error) {
            errorMessage(error);
        }
    },

    async updateProductQuantity(_, payload) {
        const user = JSON.parse(localStorage.getItem("userData"));

        try {
            if (!payload.isAuthenticated) {
                if (!getCookie("tempCart")) {
                    return;
                } else {
                    let tempCart = JSON.parse(getCookie("tempCart"));
                    const existingProductIndex = tempCart.findIndex((product) => payload.item === product.item);

                    if (existingProductIndex !== -1) {
                        tempCart[existingProductIndex].quantity = Number(payload.quantity);

                        setCookie("tempCart", JSON.stringify(tempCart), 1);
                    }
                }

                notification({ title: "Sucesso", type: "success", message: "Produto adicionado ao carrinho" });

                return;
            } else {
                const res = await sendAxio({ method: "put", url: `/cart/${user.id}/update/${payload.item}/${Number(payload.quantity)}` });

                if (res.status === 200) {
                    notification({ title: "Sucesso", type: "success", message: res.data.message });
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
                const res = await sendAxio({ method: "post", url: `/cart/${user.id}/products` });
                if (res.status === 200) {
                    commit("SET_CART_PRODUCTS", res.data);
                    return;
                }
                throw new Error();
            } else if (tempCart) {
                if (tempCart.length === 0) {
                    return false;
                }
                const userId = false;
                const res = await sendAxio({ method: "post", url: `/cart/${userId}/products`, data: tempCart });
                if (res.status === 200) {
                    commit("SET_CART_PRODUCTS", res.data);
                    return;
                }
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async displayCartPrices({ commit }, isAuthenticated) {
        const user = JSON.parse(localStorage.getItem("userData"));
        const tempCart = getCookie("tempCart");

        try {
            if (isAuthenticated) {
                const res = await sendAxio({ method: "post", url: `/cart/${user.id}/prices` });
                commit("SET_CART_PRICE", res.data.totalProducts);
            } else {
                if (tempCart) {
                    const res = await sendAxio({ method: "post", url: `/cart/${false}/prices`, data: JSON.parse(tempCart) });
                    commit("SET_CART_PRICE", res.data.totalProducts);
                    return;
                }
            }
        } catch (error) {
            errorMessage(error);
        }
    },

    updateCartProducts({ commit }, products) {
        commit("SET_CART_PRODUCTS", products);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
