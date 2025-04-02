<template lang="">
    <el-table
        v-loading="loadingPriceUpdate"
        stripe
        border
        max-height="400"
        fit
        show-header
        element-loading-text="Processando"
        style="width: max-content"
        :data="items"
        size="small"
        v-if="items && items.length > 0">
        <el-table-column
            width="350"
            header-align="center"
            align="center"
            label="Produto">
            <template #default="scope">
                <div class="flex flex-row items-center gap-2">
                    <slot name="deletebotton"></slot>
                    <button
                        @click="goTo(scope.row.productId)"
                        class="flex flex-row justify-center items-center gap-2">
                        <el-image
                            style="width: 80px; height: 80px; border-radius: 5px"
                            :src="scope.row.picture"
                            alt="Imagem do Produto">
                            <template #placeholder>
                                <el-skeleton-item
                                    animeted
                                    variant="image"
                                    style="width: 70px; height: 70px" />
                            </template>
                            <template #error>
                                <div class="image-slot h-full flex justify-center items-center w-full">
                                    <el-icon><Picture /></el-icon>
                                </div>
                            </template>
                        </el-image>
                        <span class="font-semibold">{{ scope.row.productName }}</span>
                    </button>
                </div>
            </template>
        </el-table-column>
        <el-table-column
            header-align="center"
            width="110"
            align="center"
            label="Preço unit.">
            <template #default="scope">
                <span class="whitespace-nowrap">{{ formatCurrency(scope.row.productPrice) }}</span>
            </template>
        </el-table-column>
        <el-table-column
            header-align="center"
            width="110"
            align="center"
            label="Quant.">
            <template #default>
                <slot name="input_quantity"></slot>
            </template>
        </el-table-column>
        <el-table-column
            header-align="center"
            align="center"
            label="Espec.">
            <template #default="scope">
                <div
                    class="text-[12px] leading-[15px] font-semibold"
                    v-if="
                        (scope.row.variation && scope.row.variation.color) ||
                        (scope.row.variation && scope.row.variation.model) ||
                        (scope.row.variation && scope.row.variation.size) ||
                        (scope.row.variation && scope.row.variation.material)
                    ">
                    <div
                        class="color whitespace-nowrap"
                        v-if="scope.row.variation && scope.row.variation.color">
                        <span> Cor: </span>
                        <span class="font-normal">{{ scope.row.variation.color.variationValue }}</span>
                    </div>
                    <div
                        class="model whitespace-nowrap"
                        v-if="scope.row.variation && scope.row.variation.model">
                        <span>Modelo: </span>
                        <span class="font-normal">{{ scope.row.variation.model.variationValue }}</span>
                    </div>
                    <div
                        class="size whitespace-nowrap"
                        v-if="scope.row.variation && scope.row.variation.size">
                        <span>Tamanho: </span>
                        <span class="font-normal">{{ scope.row.variation.size.variationValue }}</span>
                    </div>
                    <div
                        class="material whitespace-nowrap"
                        v-if="scope.row.variation && scope.row.variation.material">
                        <span>Material: </span>
                        <span class="font-normal">{{ scope.row.variation.material.variationValue }}</span>
                    </div>
                </div>
                <span v-else> Sem dados</span>
            </template>
        </el-table-column>
        <el-table-column
            header-align="center"
            width="100"
            align="center"
            label="Subtotal">
            <template #default="scope">
                {{ formatCurrency(scope.row.subtotal) }}
            </template>
        </el-table-column>
    </el-table>
    <div
        v-else
        class="text-center">
        <p>Carinho vazio</p>
    </div>
</template>
<script setup>
    import { defineProps, computed } from "vue";
    import { useRouter } from "vue-router";
    import { useStore } from "vuex";
    import { formatCurrency } from "@/util/functions";

    const router = useRouter();
    const store = useStore();

    defineProps({
        items: Array,
        // image: String,
        // tableRowHeight: String,
        // actionButton: String,
    });

    // const isAuthenticated = computed(() => store.getters.isAuthenticated("authToken"));
    const loadingPriceUpdate = computed(() => store.getters.loadingPriceUpdate);

    // async function update() {
    //     await store.dispatch("carts/displayCartPrices", isAuthenticated.value);
    //     await store.dispatch("carts/displayCartProducts", isAuthenticated.value);
    //     store.commit("SET_loadingPriceUpdate");
    // }

    function goTo(product) {
        router.push({ name: "detailsClient", params: { id: product } });
    }

    // async function updateQuantity(item, quantity) {
    //     store.commit("SET_loadingPriceUpdate");
    //     await store.dispatch("carts/updateProductQuantity", { item, quantity: quantity || 1, isAuthenticated: isAuthenticated.value, store });
    //     update();
    // }
</script>
<style>
    @media screen and (max-width: 600px) {
        .v-stepper-window {
            margin: 2px !important;
        }
    }

    input::-webkit-inner-spin-button,
    input::-webkit-outer-spin-button {
        appearance: none;
    }
</style>
