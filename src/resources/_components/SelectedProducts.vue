<template lang="">
    <div
        v-if="products"
        class="flex flex-col">
        <div class="bg-white flex flex-row justify-between p-2">
            <h1 class="text-xl">{{ title }}</h1>
            <router-link :to="link">
                <el-button> Ver Mais</el-button>
            </router-link>
        </div>
        <hr class="h-1" />
        <div class="flex flex-row gap-1 overflow-x-auto scroll-container w-[calc(100%)]">
            <template
                v-for="(product, index) in products"
                :key="index">
                <el-tooltip :content="product.productName">
                    <router-link
                        :to="{ name: 'product-details', params: { id: `${product._id}` } }"
                        class="product-card">
                        <el-image
                            class="flex-1"
                            v-if="product.productImage && product.productImage.length > 0"
                            :src="product.productImage[0]"
                            :alt="product.productName"
                            fit="contain">
                            <template #placeholder>
                                <el-skeleton-item
                                    animeted
                                    variant="image"
                                    style="width: 100%; height: 100%" />
                            </template>
                            <template #error>
                                <div class="image-slot h-full flex justify-center items-center w-full">
                                    <el-icon><Picture /></el-icon>
                                </div>
                            </template>
                        </el-image>
                        <div class="title">
                            <p class="text-center md:group-hover:text-white duration-700 text-[#0062bd] truncate">{{ product.productName }}</p>
                        </div>

                        <div class="title-price self-end">
                            <div class="price text-center">
                                <span class="font-bold">{{ formatCurrency(product.productPrice) }}</span>
                            </div>
                            <el-button
                                size="small"
                                class="w-full self-center"
                                :to="{ name: 'product-details', params: { id: `${product._id}` } }">
                                Detalhes
                            </el-button>
                        </div>
                    </router-link>
                </el-tooltip>
            </template>
        </div>
    </div>

    <div v-else>
        <div class="rounded-[10px] flex flex-row justify-between p-2">
            <el-skeleton
                animated
                style="width: 100px"
                :rows="0"
                variant="h1" />
            <el-skeleton
                animated
                style="width: 70px"
                :rows="0"
                variant="button" />
        </div>
        <div class="flex flex-row gap-3 overflow-x-auto scroll-container w-[calc(100%)] py-2">
            <template
                v-for="(item, index) in 5"
                :key="index">
                <div class="product-card">
                    <el-skeleton-item
                        animated
                        variant="image"
                        style="width: 100%; height: 100%" />

                    <div class="title-price self-end">
                        <el-skeleton
                            style="width: 100%"
                            :rows="3"
                            animated />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
    import { defineProps } from "vue";
    import { Picture } from "@element-plus/icons-vue";
    import { formatCurrency } from "@/util/functions";

    defineProps({
        title: String,
        products: Array,
        link: String,
    });
</script>
<style scoped>
    .product-card {
        flex-shrink: 0;
        width: 210px;
        height: 300px;
        box-shadow: 0 2px 2px 0 rgba(77, 77, 79, 0.08), 0 0 2px 0 rgba(77, 77, 79, 0.16);
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 5px;
    }
    .product-card .image {
        width: 100%;
        flex-shrink: 1;
    }

    .product-card .title-price {
        display: flex;
        gap: 2px;
        flex-direction: column;
        width: 100%;
    }

    @media screen and (min-width: 768px) {
        .product-card {
            width: 180px;
            height: 250px;
        }
    }
</style>
