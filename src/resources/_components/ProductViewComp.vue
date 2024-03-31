<template>
    <div class="products grid grid-cols-1 sm:grid-cols-2 md:flex-wrap md:flex gap-4 p-4 w-full justify-center justify-items-center">
        <router-link
            v-for="product in products"
            :key="product._id"
            :to="{ name: RouterName, params: { id: `${product._id}` } }"
            class="border h-[180px] max-w-[387px] md:w-[250px] md:h-[360px] w-full flex md:!flex-col flex-row">
            <div class="image flex justify-center w-full">
                <v-img
                    v-if="product.productImage && product.productImage.length > 0"
                    :src="product.productImage[0]"></v-img>
                <div
                    v-else
                    class="w-40 h-40 bg-gray-200 flex items-center justify-center">
                    Sem imagem
                </div>
            </div>

            <div class="description min-w-[135px] min-h-[90px] grow p-2 text-sm flex flex-col justify-between">
                <p class="text-center font-semibold text-[#0062bd]">{{ product.productName }}</p>
                <div class="flex flex-row justify-between">
                    <div>
                        <span class="text-xl">{{ product.productPrice }}</span>
                        <span> mzn</span>
                    </div>
                    <div>cart</div>
                </div>
                <div>
                    <button>1</button>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script setup>
    import { defineProps } from "vue";
    defineProps({
        products: Object,
        RouterName: String,
    });
</script>
<style lang=""></style>
