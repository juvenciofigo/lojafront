<template>
    <div class="flex flex-row flex-1 gap-1 m-2 rounded-md">
        <div class="bg-white w-[274px] hidden lg:block">fdfsdf</div>

        <div class="flex-1 flex flex-col h-full">
            <div class="h-[50px] p-2 sticky bg-white justify-between flex flex-row">
                <div class="flex flex-row justify-between">
                    <h2>{{ category }}</h2>
                </div>

                <div
                    class="rounded-lg pr-2 gap-1 flex-row items-center flex-nowrap bg-slate-300"
                    :class="inputShow">
                    <Input class="w-[10%] min-w-28 flex-1 bg-slate-300" />
                    <Search class="w-5 h-5" />
                </div>
            </div>

            <div
                v-if="products?.length > 0"
                class="bottom-0 top-[58px] right-0 flex-1 w-full flex flex-col overflow-auto">
                <ProductViewComp
                    :products="products"
                    :RouterName="nameRoute" />

                <div>
                    <v-pagination
                        @update:model-value="pushWithQuery"
                        density="compact"
                        variant="flat"
                        v-model="currentPage"
                        class="my-4"
                        :length="totalPages"></v-pagination>
                </div>
            </div>
            <div
                v-else
                class="self-center">
                <p>Sem produtos para mostrar!!!</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import ProductViewComp from "./ProductViewComp.vue";
    import { defineProps, computed, ref, onBeforeUnmount } from "vue";
    import { useStore } from "vuex";
    import { useRouter, useRoute } from "vue-router";

    defineProps({
        nameRoute: String,
        inputShow: String,
        category: String,
    });
    const products = computed(() => store.state.products.products);


    const router = useRouter();
    const route = useRoute();

    const store = useStore();

    const currentPage = ref(Number(route.query.offset) || 1);

    const totalPages = computed(() => {
        if (store.state.products.products) {
            return Math.ceil(store.state.products.quantity / 10);
        } else {
            return 0;
        }
    });

    const pushWithQuery = (query) => {
        router.push({ name: "produtos", query: { offset: `${query}` } });
    };
    onBeforeUnmount(() => {
        store.commit("CLEAR_PRODUCTS");
    });
</script>
