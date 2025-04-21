<template>
    <el-tooltip :content="product.productName">
        <router-link
            :to="{ name: RouterName || 'product-details', params: { id: `${product._id}` } }"
            class="flex flex-col product-card justify-end bg-foreground_2">
            <el-image
                class="flex-1"
                v-if="product.productImage && product.productImage.length > 0"
                :src="product.productImage[0]"
                :alt="product.productName"
                fit="cover">
                <template #viewer>
                    <div class="image-slot min-h-40 h-full flex justify-center items-center w-full">
                        <el-icon><Picture /></el-icon>
                    </div>
                </template>
                <template #placeholder>
                    <el-skeleton-item
                        animeted
                        variant="image"
                        style="width: 100%; height: 100%" />
                </template>
                <template #error>
                    <div class="image-slot min-h-40 h-full flex justify-center items-center w-full">
                        <el-icon><WarnTriangleFilled /></el-icon>
                    </div>
                </template>
            </el-image>
            <div class="">
                <div class="title">
                    <p class="text-center text-[14px] p-[2px] font-medium text-primary_2 truncate">{{ product.productName }}</p>
                </div>
                <div class="price mt-1 w-full self-end">
                    <div class="price text-center">
                        <span class="font-bold">{{ formatCurrency(product.productPrice) }}</span>
                    </div>
                    <el-button
                        plain
                        size="small"
                        class="w-full self-center"
                        :to="{ name: 'product-details', params: { id: `${product._id}` } }">
                        Detalhes
                    </el-button>
                </div>
            </div>
        </router-link>
    </el-tooltip>
</template>

<script setup>
    import { defineProps } from "vue";
    import { formatCurrency } from "@/util/functions";
    import { Picture, WarnTriangleFilled } from "@element-plus/icons-vue";

    defineProps({
        product: Object,
        RouterName: String,
    });
</script>
