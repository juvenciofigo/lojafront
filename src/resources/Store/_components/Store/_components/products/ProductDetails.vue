<template lang="">
    <ProductDetailsComp
        :firstButton="addToCart"
        :titleFirst="`Adicionar ao carinho`"
        :styl_firstbutton="`bg-blue-400 hover:bg-blue-200 text-sm p-1 rounded-md duration-300`"
        :secondButton="buyNow"
        :titleSecond="`Comprar Agora`"
        :styl_secondbutton="`bg-green-400 hover:bg-green-200 p-1 rounded-md duration-300`"
        @value-updated="handleValueUpdate" />
</template>
<script setup>
    import { onMounted, ref, computed } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    import ProductDetailsComp from "@/resources/_components/ProductDetailsComp.vue";
    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));
    const quantity = ref(1);

    async function addToCart() {
        await store.dispatch("addToCart", { isAuthenticated: isAuthenticated.value, item: { productId: route.params.id, quantity: quantity.value || 1 } });
        await store.dispatch("displayTempCartPrices", isAuthenticated.value);
    }

    async function buyNow() {
        router.push({ name: "makeOrder", query: { productsFrom: "payNow", product: route.params.id, quantity: quantity.value || 1 } });
    }

    function handleValueUpdate(value) {
        quantity.value = value;
    }
    onMounted(() => {
        store.dispatch("detailsProduct", route.params.id);
    });
</script>
