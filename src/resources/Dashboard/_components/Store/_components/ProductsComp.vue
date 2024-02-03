<template>
    <div>
        <h2>Produtos</h2>
        <div class="flex flex-row gap-2 flex-wrap">
            <template v-for="(item, index) in products" :key="item._id">
                <div class="w-[290px] h-[370px] border-2 p-2 flex flex-col">
                    <div class="w-[240px] h-[240px] border-2">
                        <img v-if="item.productImage && item.productImage.length > 0" :src="item.productImage[0]" class="object-cover" alt="Imagem do Produto" />

                        <div v-else class="w-[240px] h-[240px] bg-gray-200 flex items-center justify-center">Sem imagem</div>
                    </div>
                    <div class="border-2">
                        <p>{{ item.productName }}</p>
                        <p>{{  }}</p>
                        <p>{{ item.productPrice }}mt</p>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import axios from "axios";
    const products = ref([]);

    const URI = "http://localhost:3000";

    async function getAllProducts() {
        try {
            const response = await axios.get(`${URI}/products`);
            products.value = response.data.products;
            console.log(products.value);
        } catch (error) {
            console.error(error);
        }
    }

    onMounted(() => {
        getAllProducts();
    });
</script>

<style>
    /* Adicione estilos adicionais conforme necessário */
</style>
