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
            const res = await sendAxio("post", `/product`, payload);

            if (res.status === 200) {
                notification({ title: "erro", message: res.data.message, type: "success" });
                window.location.reload();
            }
        } catch (error) {
            errorMessage(error);
        }
    },

    async updateProduct({ commit }, payload) {
        try {
            const res = await sendAxio("put", `/product/${payload.productSeleted}`, payload.formData);

            // const res = await axios.request({
            //     method: "put",
            //     baseURL: config.apiURL,
            //     url: `/product/${payload.productSeleted}`,
            //     headers: headers(),
            //     data: payload.formData,
            // });

            if (res.status === 200) {
                commit("SET_PRODUCTS", res.data);
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                window.location.reload();
            }
        } catch (error) {
            errorMessage(error);
        }
    },

    async updateImage(_, { productId, formData }) {
        try {
            const res = await sendAxio("put", `/product/image/${productId}`, formData, { "Content-Type": "multipart/form-data" });

            // const res = await axios.request({
            // method: "put",
            // baseURL: config.apiURL,
            // url: `${config.apiURL}/product/image/${productId}`,
            // headers: { "Content-Type": "multipart/form-data", ...headers() },
            // data: formData,
            // });

            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                window.location.reload();
            }
        } catch (error) {
            errorMessage(error);
        }
    },

    async deleteProduct(_, { productId, router }) {
        try {
            // await axios.request({
            // method: "delete",
            // baseURL: config.apiURL,
            // url: `${config.apiURL}/product/${productId}`,
            // headers: headers(),
            // });

            const res = await sendAxio("delete", `/product/${productId}`);

            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });

                router.push({ name: "produtos" });
            }
        } catch (error) {
            errorMessage(error);
        }
    },

    async addVariation(_, payload) {
        try {
            // const res = await axios.request({
            //     method: "post",
            //     baseURL: config.apiURL,
            //     url: `/variation/${payload.product}`,
            //     data: payload.formData,
            //     headers: { "Content-Type": "multipart/form-data", ...headers() },
            // });

            const res = await sendAxio("post", `/variation/${payload.product}`, payload.formData, { "Content-Type": "multipart/form-data" });

            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                return true;
            }
        } catch (error) {
            errorMessage(error);
            return false;
        }
    },

    async updateVariation(_, payload) {
        try {
            // const res = await axios.request({
            //     method: "put",
            //     baseURL: config.apiURL,
            //     url: `/variation/${payload.id}`,
            //     data: payload.formData,
            //     headers: { "Content-Type": "multipart/form-data", ...headers() },
            // });
            const res = await sendAxio("put", `/variation/${payload.id}`, payload.formData, { "Content-Type": "multipart/form-data" });

            if (res.status === 200) {
                notification({ title: "Sucesso", type: "success", message: res.data.message });
                return true;
            }
        } catch (error) {
            errorMessage(error);
            return false;
        }
    },

    async detailsVariation(_, payload) {
        try {
            const res = await sendAxio("get", `/variation/${payload.variation}`, null, {}, { product: payload.product });
            if (res.status === 200) {
                return res.data.variation;
            }
        } catch (error) {
            errorMessage(error);
        }
    },

    async AllvariationsAdmin(_, payload) {
        // fetchVariationsAdmin
        try {
            const res = await sendAxio("get", `/variations`, null, {}, { product: payload });
            if (res.status === 200) {
                return res.data.variations;
            }
        } catch (error) {
            errorMessage(error);
        }
    },

    async getAllProductsAdmin({ commit }, payload) {
        //fetchAllProductsAdmin
        try {
            const res = await sendAxio("get", "/products/admin", null, {}, payload);

            if (res.status === 200) {
                commit("SET_PRODUCTS", res.data);
            }
        } catch (error) {
            errorMessage(error);
        }
    },

    async detailsProductAdmin({ commit }, produtoId) {
        //fetchProductByIdAdmin
        try {
            // const res = await axios.request({
            //     method: "get",
            //     baseURL: config.apiURL,
            //     url: `/product/admin/${produtoId}`,
            //     headers: headers(),
            // });
            const res = await sendAxio("get", `/product/admin/${produtoId}`);

            if (res.status === 200) {
                commit("SET_PRODUCT", res.data.product);
                return;
            }
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
            }
            return;
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
