<template>
    <AllProductsComp
        :nameRoute="`details`"
        fetchProducts="products/fetchAllProductsAdmin"
        fetchCategories="categories/fetchCategoriesAdmin">
        <template #addProduct>
            <router-link :to="{ name: 'novoproduto' }">
                <el-button
                    link
                    type="primary"
                    size="small">
                    <Plus />Novo Produto
                </el-button>
            </router-link>
        </template>
    </AllProductsComp>
</template>

<script setup>
    import AllProductsComp from "@/resources/_components/AllProductsComp.vue";
    // import { onBeforeUnmount, onBeforeMount, watch, ref } from "vue";
    // import { useStore } from "vuex";
    // import { useRoute, useRouter } from "vue-router";
    // import { Plus } from "lucide-vue-next";
    // const router = useRouter();
    // const route = useRoute();
    // const store = useStore();
    // const skeleton = ref(true);

    // const categorySelected = route.query.category;

    // const offset = route.query.offset || 1;
    // const category = route.query._id;
    // const subcategory = route.query.subcategory;
    // const sub_category = route.query.sub_category;

    // const payload = { offset, category, subcategory, sub_category };

    // async function fetchProducts(payload) {
    //     skeleton.value = true;
    //     if (category) {
    //         await store.dispatch("products/fetchAllProductsAdmin", payload);
    //         skeleton.value = false;
    //         return;
    //     }
    //     await store.dispatch("products/fetchAllProductsAdmin");
    //     skeleton.value = false;
    // }

    // watch(
    //     () => router.currentRoute.value,
    //     async (newRoute) => {
    //         const offset = newRoute.query.offset || 1;
    //         const category = newRoute.query._id;
    //         const subcategory = newRoute.query.subcategory;
    //         const sub_category = newRoute.query.sub_category;
    //         const payload = { offset, category, subcategory, sub_category };
    //         fetchProducts(payload);
    //     }
    // );

    // onBeforeUnmount(() => {
    //     store.commit("categories/CLEAR_CATEGORY");
    // });

    // onBeforeMount(() => {
    //     fetchProducts(payload);
    // });
</script>
