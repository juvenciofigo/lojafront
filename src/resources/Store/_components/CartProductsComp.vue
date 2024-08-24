<template lang="">
    <div
        v-if="cart.items && cart.items.length > 0"
        class="bg-white lg:m-3 rounded-md lg:p-3">
        <el-table
            :data="cart.items"
            :fit="true"
            show-header
            size="small">
            <el-table-column
                header-align="center"
                align="center"
                fixed
                label="Produto">
                <template #default="scope">
                    <button
                        @click="goTo(scope.row.productId)"
                        class="flex flex-row flex-wrap justify-center items-center lg:text-lg gap-2">
                        <img
                            :src="scope.row.picture"
                            alt="Imagem do Produto"
                            class="min-h-10 max-h-24 border"
                            :class="image" />
                        {{ scope.row.productName }}
                    </button>
                </template>
            </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                prop="productPrice"
                label="Preço unit.">
                <template #default="scope">
                    <span class="whitespace-nowrap">{{ formatCurrency(scope.row.productPrice) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                label="Quant.">
                <template #default="scope">
                    <input
                        class="text-center w-9 border"
                        type="number"
                        placeholder="Digite a quantidade"
                        v-model.number="scope.row.quantity"
                        @change="updateQuantity(scope.row.item, scope.row.quantity)"
                        min="1" />
                </template>
            </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                prop="variation"
                label="Espec."
                :formatter="formatCurrency">
                <template #default="scope">
                    <div
                        class="color whitespace-nowrap"
                        v-if="scope.row.variation && scope.row.variation.color">
                        <span>{{ scope.row.variation.color.variationType }}: </span>
                        <span>{{ scope.row.variation.color.variationValue }}</span>
                    </div>
                    <div
                        class="model whitespace-nowrap"
                        v-if="scope.row.variation && scope.row.variation.model">
                        <span>{{ scope.row.variation.model.variationType }}: </span>
                        <span>{{ scope.row.variation.model.variationValue }}</span>
                    </div>
                    <div
                        class="size whitespace-nowrap"
                        v-if="scope.row.variation && scope.row.variation.size">
                        <span>{{ scope.row.variation.size.variationType }}: </span>
                        <span>{{ scope.row.variation.size.variationValue }}</span>
                    </div>
                    <div
                        class="material whitespace-nowrap"
                        v-if="scope.row.variation && scope.row.variation.material">
                        <span>{{ scope.row.variation.material.variationType }}: </span>
                        <span>{{ scope.row.variation.material.variationValue }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                label="Subtotal">
                <template #default="scope">
                    {{ formatCurrency(scope.row.subtotal) }}
                </template>
            </el-table-column>

            <el-table-column
                header-align="center"
                align="center"
                label="Ações"
                min-width="120">
                <template #default="scope">
                    <el-button
                        link
                        type="danger"
                        size="small"
                        @click="removeProduct(scope.row.item)">
                        <Trash2
                            color="red"
                            size="18" />
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div
        v-else
        class="text-center">
        <p>Carinho vazio</p>
    </div>
</template>
<script setup>
    import { defineProps, ref, computed } from "vue";
    import { useRouter } from "vue-router";
    import { useStore } from "vuex";
    import { Trash2 } from "lucide-vue-next";

    const router = useRouter();
    const store = useStore();

    defineProps({
        cart: Object,
        image: String,
        tableRowHeight: String,
        actionButton: String,
    });

    function goTo(product) {
        router.push({ name: "detailsClient", params: { id: product } });
    }

    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));

    async function update() {
        await store.dispatch("displayCartPrices", isAuthenticated.value);
        await store.dispatch("displayCartProducts", isAuthenticated.value);
    }

    async function removeProduct(item) {
        await store.dispatch("removeProductCart", { isAuthenticated: isAuthenticated.value, item });
        update();
    }

    async function updateQuantity(item, quantity) {
        await store.dispatch("updateProductQuantity", { item, quantity: quantity || 1, isAuthenticated: isAuthenticated.value, store });
        update();
    }

    // Função para formatar valores monetários
    const formatCurrency = (value) => {
        if (typeof value !== "number" || isNaN(value)) {
            return "MZN 0.00";
        }
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };
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
