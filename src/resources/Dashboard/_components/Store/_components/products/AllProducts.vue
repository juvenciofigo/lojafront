<template lang="">
    <AllProductsComp
        :nameRoute="`details`"
        :inputShow="`flex`"
        :category="categorySelected.categoryName || 'Todos Produtos'" />
</template>
<script setup>
    import AllProductsComp from "@/resources/_components/AllProductsComp.vue";

    import { computed, ref, onMounted, onBeforeUnmount, watchEffect } from "vue";
    import { useStore } from "vuex";
    import { useRouter, useRoute } from "vue-router";

    const router = useRouter();
    const route = useRoute();

    const store = useStore();

    const fetchProducts = () => {
        const offset = route.query.offset || 1;
        store.dispatch("getAllProductsAdmin", offset);
    };

    const categorySelected = computed(() => store.state.category);

    onBeforeUnmount(() => {
        store.commit("CLEAR_CATEGORY");
    });

    onMounted(() => {
        fetchProducts();
    });
</script>
<style lang=""></style>
