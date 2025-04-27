<template>
    <AllProductsComp
        :nameRoute="`admin-product-details`"
        fetchProducts="products/fetchAllProductsAdmin"
        fetchCategories="categories/fetchCategoriesAdmin">
    </AllProductsComp>
</template>

<script setup>
    import AllProductsComp from "@/resources/_components/AllProductsComp.vue";
</script>
