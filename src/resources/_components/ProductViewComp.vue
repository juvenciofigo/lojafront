<template>
    <div class="products flex flex-col md:flex-row gap-2 p-1 flex-1 flex-wrap justify-center items-center xl:justify-start">
        <ProductSkeleton v-if="skeleton" />
        <ProductSkeleton v-if="skeleton" />
        <ProductSkeleton v-if="skeleton" />
        <ProductSkeleton v-if="skeleton" />
        <ProductSkeleton v-if="skeleton" />
        <ProductSkeleton v-if="skeleton" />

        <template v-if="skeleton === false">
            <router-link
                v-for="product in products"
                :key="product._id"
                :to="{ name: RouterName, params: { id: `${product._id}` } }"
                class="shadow-md rounded-md duration-200 hover:-translate-x-1 hover:-translate-y-1 h-[180px] max-w-[350px] md:w-[250px] md:h-[360px] w-full flex md:!flex-col flex-row bg-white p-2">
                <div class="image flex justify-center w-full">
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
                <div class="description min-w-[135px] min-h-[90px] grow p-2 text-sm flex flex-col justify-between">
                    <p class="text-center font-semibold text-[#0062bd] truncate">{{ product.productName }}</p>
                    <div class="flex flex-row justify-center">
                        <span class="text-lg font-bold">{{ formatCurrency(product.productPrice) }}</span>
                    </div>
                    <v-btn
                        size="small"
                        class="w-max self-center bg-blue"
                        :to="{ name: RouterName, params: { id: `${product._id}` } }">
                        Detalhes
                    </v-btn>
                </div>
            </router-link>
        </template>
    </div>
</template>
<script setup>
    import ProductSkeleton from "@/components/skeletons/ProductSkeleton.vue";
    import { defineProps } from "vue";

    defineProps({
        products: Object,
        RouterName: String,
        skeleton: Boolean,
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
<style lang=""></style>
