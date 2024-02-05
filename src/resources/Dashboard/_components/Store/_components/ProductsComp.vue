<template>
    <div class="flex flex-row flex-1 gap-1 m-2 rounded-md">
        <div class="bg-white w-[274px]">fdfsdf</div>

        <div class="relative flex-1 flex flex-col h-full">
            <div class="h-[50px] p-2 sticky bg-white justify-between flex flex-row">
                <div class="flex flex-row gap-64">
                    <h2>Categoria</h2>
                    <router-link class="border flex items-center text-center px-3 rounded-md bg-slate-400" :to="{ name: `novoproduto` }">Adicionar produto</router-link>
                </div>
                <div class="rounded-lg pr-2 flex gap-1 flex-row items-center flex-nowrap bg-slate-300">
                    <Input class="w-[10%] flex-1 bg-slate-300" />
                    <Search class="w-5 h-5" />
                </div>
            </div>

            <div class="absolute bottom-0 top-[58px] right-0 flex-1 w-full flex flex-row flex-wrap overflow-auto gap-2 justify-center">
                <template v-for="(item, index) in products" :key="item._id">
                    <router-link :to="{ name: 'detalhes', params: { id: `${item._id}` } }" class="w-[270px] h-[350px] p-2 flex justify-between flex-col bg-white">
                        <div class="w-[240px] h-[240px] self-center">
                            <img v-if="item.productImage && item.productImage.length > 0" :src="item.productImage[0]" class="object-cover" alt="Imagem do Produto" />
                            <div v-else class="w-[240px] h-[240px] bg-gray-200 flex items-center justify-center">Sem imagem</div>
                        </div>

                        <div class="text-center flex flex-col justify-between gap-1">
                            <p class="font-medium text-lg">{{ item.productName }}</p>
                            <p>estrelas</p>
                            <p class="font-bold text-xl">{{ item.productPrice }}mt</p>
                        </div>
                    </router-link>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted } from "vue";
    import { useStore } from "vuex";
    const store = useStore();

    const products = computed(() => store.state.products);

    onMounted(() => {
        // console.log(store);
        store.dispatch("getAllProducts");
    });
</script>

<style>
    /* Adicione estilos adicionais conforme necessário */
</style>
