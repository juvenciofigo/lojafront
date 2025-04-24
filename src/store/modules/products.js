import sendAxio from "@/util/sendAxio";
import { errorMessage } from "@/util/cookieUtils";
import notification from "@/util/notifications";

const state = {
    products: {},
    product: {},
    variations: [],
    brands: [],
};

const mutations = {
    SET_PRODUCTS(state, data) {
        if (data.page === 1) {
            state.products = data;
        } else {
            state.products.docs = [...state.products.docs, ...data.docs];
            state.products.hasNextPage = data.hasNextPage;
        }
    },
    SET_BRANDS(state, data) {
        state.brands = data;
    },
    SET_PRODUCT(state, data) {
        state.product = data;
    },
    SET_VARIATIONS(state, data) {
        state.variations = data;
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
                notification({ title: "Sucesso", message: res.data.message, type: "success" });
                return true;
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
                commit("SET_PRODUCT", res.data.product);
                notification({ title: "Sucesso", type: "success", message: res.data.message });
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

    async addVariation({ commit }, payload) {
        try {
            const res = await sendAxio({
                method: "post",
                url: `/variation/${payload.product}`,
                data: payload.formData,
                customHeaders: { "Content-Type": "multipart/form-data" },
            });

            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                commit("SET_VARIATIONS", res.data.variations);
                return true;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
            return false;
        }
    },

    async updateVariation({ commit }, payload) {
        try {
            const res = await sendAxio({ method: "put", url: `/variation/${payload.id}`, data: payload.formData, customHeaders: { "Content-Type": "multipart/form-data" } });

            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                commit("SET_VARIATIONS", res.data.variations);
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

    async fetchVariationsAdmin({ commit }, payload) {
        try {
            const res = await sendAxio({ method: "get", url: `/variations`, params: { product: payload } });
            if (res.status === 200) {
                commit("SET_VARIATIONS", res.data.variations);
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async deleteVariation({ commit }, payload) {
        try {
            const res = await sendAxio({ method: "delete", url: `/variation/${payload}` });
            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                commit("SET_VARIATIONS", res.data.variations);
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async fetchAllProductsAdmin({ commit }, payload) {
        try {
            const res = await sendAxio({ method: "get", url: "/products/admin", query: payload.query });

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
                console.log(res.data);

                commit("SET_PRODUCT", res.data.product);
                return true;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
            return false;
        }
    },

    async fetchBrands({ commit }) {
        try {
            const res = await sendAxio({ method: "get", url: "/brands/admin/" });

            if (res.status === 200) {
                commit("SET_BRANDS", res.data.brands);
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    async addBrands({ commit }, payload) {
        try {
            const res = await sendAxio({ method: "post", url: "/brands/admin/", data: payload });

            if (res.status === 201) {
                notification({ title: "Sucesso", message: res.data.message, type: "success" });
                commit("SET_BRANDS", res.data.brands);
                return;
            }
            throw new Error();
        } catch (error) {
            errorMessage(error);
        }
    },

    /////////// Client ////////

    async fetchProducts({ commit }, payload) {
        try {
            const res = await sendAxio({ method: "get", url: "/products", query: payload?.query });
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
                return true;
            }

            throw new Error();
        } catch (error) {
            errorMessage(error);
            return false;
        }
    },

    async searchProducts({ commit }, payload) {
        if (!payload.query.search) {
            return;
        }

        try {
            const res = await sendAxio({
                method: "get",
                url: `/products/search/`,
                query: payload.query,
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

    async filterProducts({ commit }, payload) {
        try {
            const res = await sendAxio({
                method: "get",
                url: `/products`,
                query: payload.query,
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
