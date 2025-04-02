<template lang="">
    <ProductDetaislsSkeleton v-if="skeleton"></ProductDetaislsSkeleton>

    <!-- prettier-ignore -->
    <ProductDetailsComp
    
        v-if="!skeletone && product"
        :firstButton="delProduct"
        :secondButton="navigateTo"
        :thirdButton="addImage"
        :fourthButton="variations"
        :fifthButton="delRating"

        :titleFirst="`Apagar`"
        :titleSecond="`Actualizar`"
        :titleThird="`Fotos`"
        :titleFourth="`Variações `"
        
        :styl_firstbutton="`danger`"
        :styl_secondbutton="`primary`"
        :styl_thirdbutton="`success`"
        :styl_fourthbutton="`info`">

        <template #product-statistic>
            <div class="border border-slate-50 p-1 rounded-md">
                <div class="flex flex-row justify-center flex-wrap gap-4 my-3">

                    <div class="flex flex-row shadow-md items-center p-2 rounded-md border-[0.6px] border-slate-50 gap-2">
                        <div class="flex items-center p-1">
                            <Copy />
                        </div>
                        <div class="flex flex-col text-center">
                            <p class="font-semibold">Nr. pedidos:</p>
                            <p>{{ totalOrders }}</p>
                        </div>
                    </div>

                    <div class="flex flex-row items-center shadow-md p-2 rounded-md border-[0.6px] border-slate-50">
                        <div class="flex items-center p-1">
                            <Receipt />
                        </div>
                        <div class="flex flex-col text-center">
                            <p class="font-semibold">Total vendido:</p>
                            <p>{{ formatCurrency(totalRevenue) }}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <span class="font-semibold">Fornecedor: </span>
                    <span> {{ product.productVendor }}</span>
                </div>
            </div>
        </template>

        <template #fifth-icon>
            <Trash2
                class="text-red-600"
                stroke-width="1" />
        </template>

    </ProductDetailsComp>

    <DialogConfirmation
        :dialog="showDialog"
        :tileConfirmation="`Deleção de ${text}`"
        :textConfirmation="`Você tem certeza de que deseja deletar  ${text}?`"
        positiveConfirmation="Deletar"
        @update:dialog="showDialog = $event"
        @cancelar="handleCancel"
        @confirmar="handleConfirm(itemDelete)" />
</template>

<script setup>
    import ProductDetailsComp from "@/resources/_components/ProductDetailsComp.vue";
    import { onBeforeMount, onBeforeUnmount, ref, computed, watch } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";
    import DialogConfirmation from "@/components/partials/DialogConfirmation.vue";
    import ProductDetaislsSkeleton from "@/components/skeletons/ProductDetaislsSkeleton.vue";
    import { Receipt, Copy, Trash2 } from "lucide-vue-next";
    import { formatCurrency } from "@/util/functions";

    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const totalOrders = ref(0);
    const totalRevenue = ref(0);
    const product = computed(() => store.state.products.product);
    const skeleton = ref(true);
    const itemDelete = ref("");
    const text = ref("");

    watch(
        product,
        (newProduct) => {
            if (newProduct && Array.isArray(newProduct.sales)) {
                totalOrders.value = newProduct.sales.reduce((total, item) => total + item.quantity, 0);
            }
            totalRevenue.value = newProduct.totalRevenue || 0;
        },
        { immediate: true }
    );
    const showDialog = ref(false);
    const deleteIndex = ref(null);

    function delRating(index) {
        deleteIndex.value = index;
        itemDelete.value = "Rating";
        text.value = "Avaliação";
        showDialog.value = true;
    }

    function delProduct(index) {
        deleteIndex.value = index;
        text.value = "Produto";
        itemDelete.value = "Product";
        showDialog.value = true;
    }

    async function deleteProduct() {
        await store.dispatch("products/deleteProduct", { productId: route.params.id, router });
        showDialog.value = false;
    }

    async function deleteRating() {
        await store.dispatch("rating/deleteRating", { rating: deleteIndex.value });
        showDialog.value = false;
    }

    const handleCancel = () => {
        showDialog.value = false;
    };

    const handleConfirm = (item) => {
        if (item === "Rating") {
            deleteRating();
        } else if (item === "Product") {
            deleteProduct();
        }
    };

    function navigateTo() {
        router.push({ name: "update", params: { productID: route.params.id } });
    }
    function addImage() {
        router.push({ name: "addImage", params: { id: route.params.id } });
    }
    function variations() {
        router.push({ name: "variations", params: { id: route.params.id } });
    }
    onBeforeMount(async () => {
        await store.dispatch("products/fetchProductByIdAdmin", route.params.id);
        skeleton.value = false;
    });

    onBeforeUnmount(() => {
        store.commit("products/CLEAR_PRODUCT", {});
    });
</script>
