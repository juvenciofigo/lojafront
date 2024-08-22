<template>
    <AllProductsComp
        :nameRoute="`details`"
        :inputShow="`flex`"
        :category="categorySelected || 'Todos Produtos'"
        :skeleton="skeleton"
        :newProduct="`novoproduto`"
        :fetchRouteName="fetchRouteName"
        :getCategories="'getAllCategoryAdmin'" />
</template>

<script setup>
    import AllProductsComp from "@/resources/_components/AllProductsComp.vue";
    import { onBeforeUnmount, onBeforeMount, watch, ref } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";

    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const skeleton = ref(true);
    const fetchRouteName = "productsAdmin";

    const categorySelected = route.query.category;

    const offset = route.query.offset || 1;
    const category = route.query._id;
    const subcategory = route.query.subcategory;
    const sub_category = route.query.sub_category;

    const payload = { offset, category, subcategory, sub_category };

    async function fetchProducts(payload) {
        skeleton.value = true;
        if (category) {
            await store.dispatch("getAllProductsAdmin", payload);
            skeleton.value = false;
            return;
        }
        await store.dispatch("getAllProductsAdmin");
        skeleton.value = false;
    }

    watch(
        () => router.currentRoute.value,
        async (newRoute) => {
            const offset = newRoute.query.offset || 1;
            const category = newRoute.query._id;
            const subcategory = newRoute.query.subcategory;
            const sub_category = newRoute.query.sub_category;
            const payload = { offset, category, subcategory, sub_category };
            fetchProducts(payload);
        }
    );

    onBeforeUnmount(() => {
        store.commit("CLEAR_CATEGORY");
    });

    onBeforeMount(() => {
        fetchProducts(payload);
    });
</script>
