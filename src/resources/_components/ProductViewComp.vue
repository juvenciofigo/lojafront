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
        justify-content: center;
        align-content: center;
        flex-grow: 1;
        display: grid;
        gap: 5px;
        grid-template-columns: repeat(2, minmax(100px, 1fr));
    }
    .products > .product {
        max-width: 180px;
        max-height: 400px;
    }
    .description {
        font-size: x-small;
    }

    .el-image {
        padding: 0 5px;
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

    @media screen and (min-width: 430px) {
        .products {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }
        .products > .product {
            min-width: 140px;
        }

        .el-image {
            max-height: 400px;
        }
        .description {
            font-size: small;
        }
    }
    @media screen and (min-width: 900px) {
        .products {
            gap: 10px;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        }

        .el-image {
            max-height: 400px;
        }
        .description {
            font-size: small;
        }
    }
</style>
