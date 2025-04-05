<template>
    <AllProductsComp
        :nameRoute="`admin-product-details`"
        fetchProducts="products/fetchAllProductsAdmin"
        fetchCategories="categories/fetchCategoriesAdmin">
        <template #addProduct>
            <router-link :to="{ name: 'admin-product-create' }">
                <el-button
                    link
                    type="primary"
                    size="small">
                    <Plus />Novo Produto
                </el-button>
            </router-link>
        </template>
    </AllProductsComp>
</template>

<script setup>
    import AllProductsComp from "@/resources/_components/AllProductsComp.vue";
</script>
