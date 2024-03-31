<template lang="">
    <AllProductsComp
        :nameRoute="`detailsClient`"
        :inputShow="`hidden`"
        :category="categorySelected.categoryName || 'Todos Produtos'" />
</template>
<script setup>
    import AllProductsComp from "@/resources/_components/AllProductsComp.vue";

    import { computed, onMounted, onBeforeUnmount, watch } from "vue";
    import { useStore } from "vuex";
    import { useRouter, useRoute } from "vue-router";

    const router = useRouter();
    const route = useRoute();

    const store = useStore();
    const categorySelected = computed(() => store.state.category);

    const offset = route.query.offset || 1;
    const category = route.query.category;
    const subcategory = route.query.subcategory;
    const sub_category = route.query.sub_category;

    const fetchProducts = async () => {
        const payload = { offset, category, subcategory, sub_category };
        if (category) {
            await store.dispatch("detailsCategory", category);
        }
        await store.dispatch("getAllProducts", payload);
    };
    onBeforeUnmount(() => {
        store.commit("CLEAR_CATEGORY");
    });
    watch(
        () => router.currentRoute.value,
        () => {
            window.location.reload();
        }
    );
    onMounted(() => {
        fetchProducts();
    });
</script>
<style lang=""></style>
