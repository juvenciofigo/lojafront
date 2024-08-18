<template lang="">
    <div>
        <router-link
            :to="{ name: RouterName, params: { id: `${product._id}` } }"
            v-for="product in products"
            :key="product._id"
            class="product rounded-md sm:mx-0 flex flex-col group md:hover:bg-blue-400 duration-700 p-1">
            <div class="image block">
                <el-image
                    v-if="product.productImage && product.productImage.length > 0"
                    :src="product.productImage[0]"
                    fit="contain"
                    class="">
                    <template #error>
                        <div class="image-slot">
                            <el-icon><icon-picture /></el-icon>
                        </div>
                    </template>
                </el-image>

                <div
                    v-else
                    class="el-image">
                    Sem imagem
                </div>
            </div>

            <div class="description grow p-2 flex flex-col justify-end">
                <div class="flex flex-col gap-2">
                    <p class="text-center md:group-hover:text-white duration-700 text-[#0062bd] truncate">{{ product.productName }}</p>
                    <div class="flex flex-row justify-center">
                        <span class="font-bold">{{ formatCurrency(product.productPrice) }}</span>
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
</script>
<style scoped></style>
