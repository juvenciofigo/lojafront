<template>
    <div class="flex-1 grid x:grid-cols-2 :grid-cols-3 md:grid-cols-4 lg:grid-cols-13 gap-2 p-2">
        <template
            v-for="(item, index) in 8"
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
</template>
<style scoped>
    .product-card {
        flex-shrink: 0;
        border-radius: 10px;
        height: 250px;
        width: 150px;
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
</style>
