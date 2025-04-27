<template lang="">
    <ProductDetaislsSkeleton v-if="skeleton"></ProductDetaislsSkeleton>
    <ProductDetailsComp
        :price="product.productPrice"
        :fifthButton="delRating"
        v-if="!skeleton && product">
        <template #opcoes>
            <!-- Botões de ação -->
            <div
                ref="buttons"
                class="buttons flex-row flex gap-[5px] flex-wrap">
                <div>
                    <el-button
                        size="small"
                        :loading="loading_button"
                        type="danger"
                        @click="delProduct">
                        Apagar
                        <el-icon><Delete /></el-icon>
                    </el-button>
                    <el-button
                        size="small"
                        :loading="loading_button"
                        type="primary"
                        @click="navigateTo">
                        Actualizar
                    </el-button>
                </div>

                <div>
                    <el-button
                        size="small"
                        :loading="loading_button"
                        type="success"
                        @click="addImage">
                        Fotos
                    </el-button>
                    <el-button
                        size="small"
                        :loading="loading_button"
                        type="info"
                        @click="variations">
                        Variações
                    </el-button>
                </div>
            </div>
        </template>

        <template #product-statistic>
            <div class="">
                <div class="flex flex-row justify-center flex-nowrap gap-4 my-3">
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
                <div class="flex items-center flex-wrap">
                    <span class="font-semibold">Fornecedor: </span>
                    <el-input
                        size="small"
                        v-model="product.productVendor"
                        readonly />
                </div>
            </div>
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
    import { Receipt, Copy } from "lucide-vue-next";
    import { formatCurrency } from "@/util/functions";
    import { Delete } from "@element-plus/icons-vue";

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
        router.push({ name: "admin-product-update", params: { id: route.params.id } });
    }
    function addImage() {
        router.push({ name: "admin-product-images", params: { id: route.params.id } });
    }
    function variations() {
        router.push({ name: "admin-product-variations-list", params: { id: route.params.id } });
    }
    onBeforeMount(async () => {
        await store.dispatch("products/fetchProductByIdAdmin", route.params.id);
        skeleton.value = false;
    });

    onBeforeUnmount(() => {
        store.commit("products/CLEAR_PRODUCT", {});
    });
</script>
