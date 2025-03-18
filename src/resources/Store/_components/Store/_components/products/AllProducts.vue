<template>
    <AllProductsComp
        :nameRoute="`detailsClient`"
        :inputShow="`hidden`"
        :buttonShow="`hidden`"
        :skeleton="skeleton" />
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

    const offset = route.query.offset || 1;
    const category = route.query._id;
    const subcategory = route.query.subcategory;
    const sub_category = route.query.sub_category;

    const payload = { offset, category, subcategory, sub_category };

    async function fetchProducts(value) {
        skeleton.value = true;

        if (category) {
            await store.dispatch("products/fetchProducts", value);
            skeleton.value = false;
            return;
        }
        await store.dispatch("products/fetchProducts");
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
