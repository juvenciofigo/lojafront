<template>
    <div class="flex-1 grid x:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-13 gap-2 p-2 overflow-hidden">
        <router-link
            :to="{ name: RouterName, params: { id: `${product._id}` } }"
            v-for="product in products"
            :key="product._id"
            class="rounded-md h-full md:w-full sm:mx-0 flex md:!flex-col group md:hover:bg-blue-400 duration-700 flex-row bg-[#d1e7fd65] p-2">
            <div class="image z-50 flex justify-center w-full md:group-hover:scale-95 duration-700 mx-auto min-w-2 max-w-44 md:max-w-full">
                <v-img
                    v-if="product.productImage && product.productImage.length > 0"
                    :src="product.productImage[0]"
                    :alt="`imagem ${product.productName}`"></v-img>
                <div
                    v-else
                    class="w-40 h-40 bg-gray-200 flex items-center justify-center">
                    Sem imagem
                </div>
            </div>

            <div class="description min-w-[135px] min-h-[90px] grow p-2 text-sm flex flex-col justify-end">
                <div class="flex flex-col gap-2">
                    <p class="text-center font-semibold md:group-hover:text-white duration-700 text-[#0062bd] truncate">{{ product.productName }}</p>
                    <div class="flex flex-row justify-center">
                        <span class="md:text-lg font-bold">{{ formatCurrency(product.productPrice) }}</span>
                    </div>
                </div>

                <el-button
                    size="small"
                    class="w-full self-center"
                    :to="{ name: RouterName, params: { id: `${product._id}` } }">
                    Detalhes
                </el-button>
            </div>
        </router-link>
    </div>
</template>
<script setup>
    import { defineProps } from "vue";

    defineProps({
        products: Array,
        RouterName: String,
    });

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
<style></style>
