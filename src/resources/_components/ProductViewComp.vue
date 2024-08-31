<template>
    <div class="products">
        <template
            v-for="(product, index) in products"
            :key="index">
            <ProductCard
                :product="product"
                :RouterName="RouterName" />
        </template>
    </div>
</template>

<script setup>
    import { defineProps } from "vue";
    import ProductCard from "@/resources/_components/ProductCard.vue";

    defineProps({
        products: Array,
        RouterName: String,
    });
</script>
<style scoped>
    .products {
        margin: 5px;
        display: grid;
        gap: 10px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 425px) {
        .products {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
    @media (min-width: 768px) {
        .products {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }
    @media (min-width: 1247px) {
        .products {
            grid-template-columns: repeat(5, minmax(0, 1fr));
        }
    }
</style>
