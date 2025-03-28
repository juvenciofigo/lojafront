<template>
    <router-link :to="{ name: RouterName || 'detailsClient', params: { id: `${product._id}` } }">
        <el-tooltip :content="product.productName">
            <div class="h-full w-full product-card rounded-md group duration-700 bg-white">
                <div class="p-3 h-full rounded-md duration-700 md:group-hover:bg-blue-400 flex flex-col justify-between">
                    <div class="title w-full">
                        <p class="text-center md:hover: md:group-hover:text-white duration-700 text-[#0062bd] truncate mb-2">{{ product.productName }}</p>
                    </div>

                    <el-image
                        class="w-full"
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
                            <div class="image-slot min-h-40 h-full flex justify-center items-center w-full">
                                <el-icon><icon-picture /></el-icon>
                            </div>
                        </template>
                    </el-image>

                    <div class="price mt-1 w-full self-end">
                        <div class="price text-center">
                            <span class="font-bold">{{ formatCurrency(product.productPrice) }}</span>
                        </div>
                        <el-button
                            size="small"
                            class="w-full self-center"
                            :to="{ name: 'detailsClient', params: { id: `${product._id}` } }">
                            Detalhes
                        </el-button>
                    </div>
                </div>
            </div>
        </el-tooltip>
    </router-link>
</template>

<script setup>
    import { defineProps } from "vue";
    import { formatCurrency } from "@/util/functions";
    import { Picture as IconPicture } from "@element-plus/icons-vue";

    defineProps({
        product: Object,
        RouterName: String,
    });
</script>
