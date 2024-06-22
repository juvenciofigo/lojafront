<template lang="">
    <ProductDetailsComp
        :firstButton="confirmDelete"
        :titleFirst="`Apagar`"
        :secondButton="navigateTo"
        :titleSecond="`Actualizar`"
        :thirdButton="addImage"
        :titleThird="`Fotos`"
        :fourthButton="addVariation"
        :titleFourth="`Adicionar variações `"
        :styl_firstbutton="`bg-red-500 hover:bg-red-200 rounded-md text-sm duration-300 p-1 shadow-md font-semibold`"
        :styl_secondbutton="`bg-blue-500 hover:bg-blue-200 rounded-md text-sm duration-300 p-1 shadow-md font-semibold`"
        :styl_thirdbutton="`bg-green-500 hover:bg-green-200 rounded-md text-sm duration-300 p-1 shadow-md font-semibold`"
        :styl_fourthbutton="`bg-sky-500 hover:bg-sky-200 rounded-md text-sm duration-300 p-1 shadow-md font-semibold`" />

    <DialogConfirmation
        :dialog="showDialog"
        tileConfirmation="Deleção de Produto"
        textConfirmation="Você tem certeza de que deseja deletar este produto?"
        positiveConfirmation="Deletar"
        @update:dialog="showDialog = $event"
        @cancelar="handleCancel"
        @confirmar="handleConfirm" />
</template>
<script setup>
    import ProductDetailsComp from "@/resources/_components/ProductDetailsComp.vue";
    import { onBeforeMount, onBeforeUnmount, ref } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";
    import DialogConfirmation from "@/components/partials/DialogConfirmation.vue";

    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const showDialog = ref(false);
    const deleteIndex = ref(null);

    function confirmDelete(index) {
        deleteIndex.value = index;
        showDialog.value = true;
    }

    async function deleteProduct() {
        await store.dispatch("deleteProduct", { productId: route.params.id, router });
    }
    const handleCancel = () => {
        showDialog.value = false;
    };

    const handleConfirm = () => {
        deleteProduct();
    };

    function navigateTo() {
        router.push({ name: "update" });
    }
    function addImage() {
        router.push({ name: "addImage", params: { id: route.params.id } });
    }
    function addVariation() {
        router.push({ name: "addVariation", params: { id: route.params.id } });
    }
    onBeforeMount(() => {
        store.dispatch("detailsProductAdmin", route.params.id);
    });
    onBeforeUnmount(() => {
        store.commit("productDetails", {});
    });
</script>
