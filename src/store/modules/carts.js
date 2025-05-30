import { setCookie, removeCookie, getCookie, errorMessage, getTempCart } from "@/util/cookieUtils";
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
        try {
            const itemProduct = item;

            if (!isAuthenticated) {
                // Obter carrinho temporário
                let tempCart = [];
                const cookie = getCookie("tempCart");

                if (cookie) {
                    try {
                        tempCart = JSON.parse(cookie);
                    } catch (err) {
                        console.warn("Erro ao parsear tempCart:", err);
                        tempCart = [];
                    }
                }

                // Verificar se item já existe no carrinho
                const existingProductIndex = tempCart.findIndex(
                    (cartItem) =>
                        cartItem.productId === itemProduct.productId &&
                        cartItem.variation.color === itemProduct.variation.color &&
                        cartItem.variation.model === itemProduct.variation.model &&
                        cartItem.variation.material === itemProduct.variation.material &&
                        cartItem.variation.size === itemProduct.variation.size &&
                        cartItem.deliveryEstimate === itemProduct.deliveryEstimate
                );

                if (existingProductIndex !== -1) {
                    tempCart[existingProductIndex].quantity += Number(itemProduct.quantity) || 1;
                } else {
                    tempCart.push({
                        productId: itemProduct.productId,
                        quantity: Number(itemProduct.quantity) || 1,
                        variation: {
                            color: itemProduct.variation.color,
                            model: itemProduct.variation.model,
                            size: itemProduct.variation.size,
                            material: itemProduct.variation.material,
                        },
                        deliveryEstimate: itemProduct.deliveryEstimate,
                        item: Date.now(),
                    });
                }

                setCookie("tempCart", JSON.stringify(tempCart), 7);

                notification({
                    title: "Sucesso",
                    type: "success",
                    message: "Produto adicionado ao carrinho",
                });

                return;
            }

            // Usuário autenticado
            const userData = localStorage.getItem("userData");
            if (!userData) throw new Error("Usuário não encontrado no localStorage.");

            const user = JSON.parse(userData);

            const res = await sendAxio({
                method: "post",
                url: `/cart/${user.id}/addProduct`,
                data: item,
            });

            if (res.status === 200) {
                notification({
                    title: "Sucesso",
                    type: "success",
                    message: res.data.message,
                });
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
        const tempCart = getTempCart("tempCart");

        try {
            if (isAuthenticated) {
                const res = await sendAxio({ method: "post", url: `/cart/${user.id}/prices` });
                commit("SET_CART_PRICE", res.data.totalProducts);
            } else {
                if (tempCart) {
                    const res = await sendAxio({ method: "post", url: `/cart/${false}/prices`, data: tempCart });
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
