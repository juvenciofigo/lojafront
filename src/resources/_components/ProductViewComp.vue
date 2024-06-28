<template>
    <div class="products flex flex-row gap-2 p-1 flex-1 flex-wrap xl:justify-start w-fit">
        <router-link
            v-for="product in products"
            :key="product._id"
            :to="{ name: RouterName, params: { id: `${product._id}` } }"
            class="shadow-md rounded-md duration-200 hover:-translate-x-1 mx-auto hover:-translate-y-1 h-[180px] max-w-[350px] md:w-[250px] md:h-[360px] w-full flex md:!flex-col flex-row bg-white p-2">
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
