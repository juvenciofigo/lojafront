<template lang="">
    <ProductDetaislsSkeleton v-if="skeleton"></ProductDetaislsSkeleton>

    <ProductDetailsComp
        v-else
        :firstButton="delProduct"
        :titleFirst="`Apagar`"
        :secondButton="navigateTo"
        :titleSecond="`Actualizar`"
        :thirdButton="addImage"
        :titleThird="`Fotos`"
        :fourthButton="variations"
        :titleFourth="`Variações `"
        :fifthButton="delRating"
        :styl_firstbutton="`bg-red-500 hover:bg-red-200 rounded-md text-sm duration-300 p-1 shadow-md font-semibold`"
        :styl_secondbutton="`bg-blue-500 hover:bg-blue-200 rounded-md text-sm duration-300 p-1 shadow-md font-semibold`"
        :styl_thirdbutton="`bg-green-500 hover:bg-green-200 rounded-md text-sm duration-300 p-1 shadow-md font-semibold`"
        :styl_fourthbutton="`bg-sky-500 hover:bg-sky-200 rounded-md text-sm duration-300 p-1 shadow-md font-semibold`">
        <template #product-statistic>
            <div class="border border-slate-50 p-2 rounded-md">
                <div class="flex flex-row flex-wrap gap-4 my-3">
                    <div class="flex flex-row shadow-md p-4 rounded-md border-[0.6px] border-slate-50 gap-2">
                        <div class="flex items-center p-2">
                            <Copy />
                        </div>
                        <div class="flex flex-col text-center">
                            <h2>Nr. pedidos::</h2>
                            <div>{{ totalOrders }}</div>
                        </div>
                    </div>
                    <div class="flex flex-row shadow-md p-4 rounded-md border-[0.6px] border-slate-50">
                        <div class="flex items-center p-2">
                            <Receipt />
                        </div>
                        <div class="flex flex-col text-center">
                            <h2>Total vendido:</h2>
                            <div>{{ formatCurrency(totalRevenue) }}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Fornecedor:</h2>
                    <div>{{ product.productVendor }}</div>
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

    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const totalOrders = ref(0);
    const totalRevenue = ref(0);
    const product = computed(() => store.state.product);
    const skeleton = ref(true);
    const itemDelete = ref("");
    const text = ref("");

    watch(
        product,
        (newProduct) => {
            if (newProduct && Array.isArray(newProduct.sales)) {
                totalOrders.value = newProduct.sales.reduce((total, item) => total + item.quantity, 0);
            }
            totalRevenue.value = newProduct.totalRevenue || 0; // Verifique se totalRevenue está disponível
        },
        { immediate: true }
    );
    const showDialog = ref(false);
    const deleteIndex = ref(null);

    function delRating(index) {
        console.log(index);
        deleteIndex.value = index;
        itemDelete.value = "Rating";
        text.value = "Avaliação";
        showDialog.value = true;
    }

    function delProduct(index) {
        console.log(index.target);
        deleteIndex.value = index;
        text.value = "Produto";
        itemDelete.value = "Product";
        showDialog.value = true;
    }

    async function deleteProduct() {
        await store.dispatch("deleteProduct", { productId: route.params.id, router });
        showDialog.value = false;
    }

    async function deleteRating() {
        await store.dispatch("deleteRating", { rating: deleteIndex.value });
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
        router.push({ name: "update", params: { id: route.params.id } });
    }
    function addImage() {
        router.push({ name: "addImage", params: { id: route.params.id } });
    }
    function variations() {
        router.push({ name: "variations", params: { id: route.params.id } });
    }

    const formatCurrency = (value) => {
        if (typeof value !== "number" || isNaN(value)) {
            return "MZN 0.00";
        }
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };

    onBeforeMount(async () => {
        await store.dispatch("detailsProductAdmin", route.params.id);
        skeleton.value = false;
    });

    onBeforeUnmount(() => {
        store.commit("productDetails", {});
    });
</script>
