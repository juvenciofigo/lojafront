import sendAxio from "@/util/sendAxio";
import { errorMessage } from "@/util/cookieUtils";
import notification from "@/util/notifications";

const state = {
    products: [],
    product: {},
};

const mutations = {
    SET_PRODUCTS(state, products) {
        state.products = products;
    },
    SET_PRODUCT(state, product) {
        state.product = product;
    },
    CLEAR_PRODUCTS(state) {
        state.products = [];
    },
    CLEAR_PRODUCT(state) {
        state.product = {};
    },
};

const actions = {
    // Admin
    async addProduct(_, payload) {
        try {
            const res = await sendAxio({ method: "post", url: `/product`, data: payload });

            if (res.status === 200) {
                notification({ title: "erro", message: res.data.message, type: "success" });
                window.location.reload();
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async updateProduct({ commit }, payload) {
        try {
            const res = await sendAxio({ method: "put", url: `/product/${payload.productSeleted}`, data: payload.formData });

            if (res.status === 200) {
                commit("SET_PRODUCTS", res.data);
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                window.location.reload();
                return true;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
            return false;
        }
    },

    async updateImage(_, { productId, formData }) {
        try {
            const res = await sendAxio({ method: "put", url: `/product/image/${productId}`, data: formData, customHeaders: { "Content-Type": "multipart/form-data" } });

            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                window.location.reload();
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async deleteProduct(_, { productId, router }) {
        try {
            const res = await sendAxio({ method: "delete", url: `/product/${productId}` });

            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                router.push({ name: "produtos" });
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async addVariation(_, payload) {
        try {
            const res = await sendAxio({
                method: "post",
                url: `/variation/${payload.product}`,
                data: payload.formData,
                customHeaders: { "Content-Type": "multipart/form-data" },
            });

            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                return true;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
            return false;
        }
    },

    async updateVariation(_, payload) {
        try {
            const res = await sendAxio({ method: "put", url: `/variation/${payload.id}`, data: payload.formData, customHeaders: { "Content-Type": "multipart/form-data" } });

            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                return true;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
            return false;
        }
    },

    async detailsVariation(_, payload) {
        try {
            const res = await sendAxio({ method: "get", url: `/variation/${payload.variation}`, params: { product: payload.product } });
            if (res.status === 200) {
                return res.data.variation;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async fetchVariationsAdmin(_, payload) {
        try {
            const res = await sendAxio({ method: "get", url: `/variations`, params: { product: payload } });
            if (res.status === 200) {
                return res.data.variations;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async fetchAllProductsAdmin({ commit }, payload) {
        try {
            const res = await sendAxio({ method: "get", url: "/products/admin", params: payload });

            if (res.data) {
                commit("SET_PRODUCTS", res.data);
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async fetchProductByIdAdmin({ commit }, produtoId) {
        try {
            const res = await sendAxio({ method: "get", url: `/product/admin/${produtoId}` });

            if (res.status === 200) {
                commit("SET_PRODUCT", res.data.product);
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
            return true;
        }
    },

    /////////// Client ////////

    async fetchProducts({ commit }, payload) {
        try {
            const res = await sendAxio({ method: "get", url: "/products", params: payload });
            if (res.status === 200) {
                commit("SET_PRODUCTS", res.data);
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async fetchProductById({ commit }, productId) {
        try {
            const res = await sendAxio({ method: "get", url: `/product/${productId}` });
            if (res.status === 200) {
                commit("SET_PRODUCT", res.data.product);
                return res;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async filtreProducts({ commit }, payload) {
        try {
            const res = await sendAxio({
                method: "get",
                url: `/products/search/${payload.search}`,
                params: { offset: payload, category: payload.category },
            });

            if (res.data) {
                commit("SET_PRODUCTS", res.data);
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
