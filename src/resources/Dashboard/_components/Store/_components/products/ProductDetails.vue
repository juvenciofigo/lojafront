<template lang="">
    <div class="flex relative flex-row flex-1 gap-1 m-2 rounded-md bg-white">
        <ProductDetailsComp
            :firstButton="deleteProduct"
            :titleFirst="`Apagar`"
            :secondButton="navigateTo"
            :titleSecond="`Actualizar`"
            :thirdButton="addImage"
            :titleThird="`Fotos`"
            :styl="`bg-yellow-300 px-4 rounded-md`" />
    </div>
</template>
<script setup>
    import ProductDetailsComp from "@/resources/_components/ProductDetailsComp.vue";
    import { onMounted } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";

    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    async function deleteProduct() {
        await store.dispatch("deleteProduct", { productId: route.params.id, router });
    }

    function navigateTo() {
        router.push({ name: "update" });
    }
    function addImage() {
        router.push({ name: "addImage", params: { id: route.params.id } });
    }
    onMounted(() => {
        store.dispatch("detailsProductAdmin", route.params.id);
    });
</script>
