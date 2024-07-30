<template>
    <div class="products">
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

            <div class="description grow p-2 text-sm flex flex-col justify-end">
                <div class="flex flex-col gap-2">
                    <p class="text-center font-semibold md:group-hover:text-white duration-700 text-[#0062bd] truncate">{{ product.productName }}</p>
                    <div class="flex flex-row justify-center">
                        <span class="md:text-lg font-bold">{{ formatCurrency(product.productPrice) }}</span>
                    </div>
                </div>

                <el-button
                    size="small"
                    class="w-full self-center button"
                    :to="{ name: RouterName, params: { id: `${product._id}` } }">
                    Detalhes
                </el-button>
            </div>
        </router-link>
    </div>
</template>
<script setup>
    import { defineProps } from "vue";
    import { Picture as IconPicture } from "@element-plus/icons-vue";

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
<style scoped>
    .products {
        padding: 10px;
        flex-grow: 1;
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(2, minmax(100px, 1fr));
        grid-template-rows: repeat(auto, minmax(330px, 350px));
    }

    .el-image {
        padding: 0 5px;
        max-width: 400px;
        max-height: 200px;
    }
    .image-slot,
    .block {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    @media screen and (min-width: 600px) {
        .products {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }

        .el-image {
            max-height: 400px;
        }
    }
    @media screen and (min-width: 900px) {
        .products {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
    }
</style>
