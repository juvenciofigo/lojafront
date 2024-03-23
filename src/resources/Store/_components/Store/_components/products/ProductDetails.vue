<template lang="">
    <ProductDetailsComp
        :firstButton="addToCart"
        :titleFirst="`Adicionar ao carinho`"
        :secondButton="BuyNow"
        :titleSecond="`Comprar Agora`"
        @value-updated="handleValueUpdate" />
</template>
<script setup>
    import { onMounted, ref, computed } from "vue";
    import { useStore } from "vuex";
    import { useRoute } from "vue-router";

    const store = useStore();
    const route = useRoute();

    import ProductDetailsComp from "@/resources/_components/ProductDetailsComp.vue";
    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));
    const quantity = ref(1);

    async function addToCart() {
        await store.dispatch("addToCart", { isAuthenticated: isAuthenticated.value, item: { id: route.params.id, quantity: quantity.value } });
        await store.dispatch("displayTempCartPrices", isAuthenticated.value);
    }

    function BuyNow() {
        console.log("comprado");
    }
    function handleValueUpdate(value) {
        quantity.value = value;
    }
    onMounted(() => {
        store.dispatch("detailsProduct", route.params.id);
    });
</script>
