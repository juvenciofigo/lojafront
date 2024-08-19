<template lang="">
    <div
        v-if="productsAnswer"
        class="flex flex-col">
        <div class="bg-white rounded-[10px] flex flex-row justify-between p-2">
            <h1 class="text-xl">{{ title }}</h1>
            <el-button>{{ link }}</el-button>
        </div>
        <div class="flex flex-row gap-3 overflow-x-auto scroll-container w-[calc(100%)] py-2">
            <template
                v-for="(product, index) in products"
                :key="index">
                <router-link
                    :to="{ name: 'detailsClient', params: { id: `${product._id}` } }"
                    class="product-card">
                    <el-image
                        class="flex-1"
                        v-if="product.productImage && product.productImage.length > 0"
                        :src="product.productImage[0]"
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
                    <div class="title-price self-end">
                        <div class="title">
                            <p class="text-center md:group-hover:text-white duration-700 text-[#0062bd] truncate">{{ product.productName }}</p>
                        </div>
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
                </router-link>
            </template>
        </div>
    </div>

    <div v-else>
        <div class="bg-white rounded-[10px] flex flex-row justify-between p-2">
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
    import { defineProps, watch, ref } from "vue";
    import { Picture } from "@element-plus/icons-vue";
    const props = defineProps({
        title: String,
        products: Array,
        link: String,
    });

    const productsAnswer = ref(false);
    watch(
        () => props.products,
        () => {
            productsAnswer.value = true;
        }
    );

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
<style scoped>
    .product-card {
        flex-shrink: 0;
        border-radius: 10px;
        width: 200px;
        height: 300px;
        box-shadow: 0 2px 2px 0 rgba(77, 77, 79, 0.08), 0 0 2px 0 rgba(77, 77, 79, 0.16);
        background-color: #fff;
        border-radius: 10px;
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

    /* Estilizando a barra de rolagem */
    .scroll-container::-webkit-scrollbar {
        height: 8px; /* Altura da barra de rolagem */
    }

    /* Cor do track (fundo da barra de rolagem) */
    .scroll-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }

    /* Cor da thumb (a parte que se move da barra de rolagem) */
    .scroll-container::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 10px;
        border: 2px solid #f1f1f1; /* Espaçamento entre thumb e track */
    }

    /* Cor da thumb ao passar o mouse */
    .scroll-container::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }

    @media screen and (max-width: 768px) {
        .product-card {
            height: 250px;
        }
    }
</style>
