<template lang="">
    <AllProductsComp
        :nameRoute="`details`"
        :inputShow="`flex`"
        :category="categorySelected.categoryName || 'Todos Produtos'"
        :newProduct="`novoproduto`" />
</template>
<script setup>
    import AllProductsComp from "@/resources/_components/AllProductsComp.vue";

    import { computed, onBeforeMount, onBeforeUnmount } from "vue";
    import { useStore } from "vuex";
    import { useRoute } from "vue-router";

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
    

    onBeforeMount(() => {
        fetchProducts();
    });
</script>
<style lang=""></style>
