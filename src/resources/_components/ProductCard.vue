<template>
    <router-link :to="{ name: RouterName || 'product-details', params: { id: `${product._id}` } }">
        <el-tooltip :content="product.productName">
            <div class="product-card group h-full w-full bg-white duration-700">
                <div class="flex h-full flex-col justify-between p-3 duration-700 md:group-hover:bg-blue-400">
                    <div class="title w-full">
                        <p class="md:hover: mb-2 truncate text-center text-[#0062bd] duration-700 md:group-hover:text-white">{{ product.productName }}</p>
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
                            <div class="image-slot flex h-full min-h-40 w-full items-center justify-center">
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
                            :to="{ name: 'product-details', params: { id: `${product._id}` } }">
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
