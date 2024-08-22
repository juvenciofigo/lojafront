<template>
    <div class="flex flex-row flex-1 gap-1 m-2 rounded-md bg-slate-100">
        <section class="w-[274px] hidden lg:flex flex-col gap-4 p-2">
            <div class="w-full p-3 bg-white categories-list indent-4 overflow-auto">
                <h2 class="bg-[#3a7ebe] p-2 font-semibold">Categorias</h2>

                <ul class="list-none">
                    <li class="whitespace-nowrap hover:text-[#0062bd] duration-500"><router-link :to="{ name: 'allProductsClient' }">Todos produtos</router-link></li>
                    <template
                        v-for="category in categories"
                        :key="category._id">
                        <li class="whitespace-nowrap hover:text-[#0062bd] duration-500">
                            <v-menu
                                transition="scroll-x-transition"
                                location="end"
                                close-delay="10"
                                open-delay="10"
                                open-on-hover>
                                <template v-slot:activator="{ props }">
                                    <button
                                        @click="filterProduct(category)"
                                        class="w-[calc(100%-16px)] text-start justify-between"
                                        v-bind="props">
                                        {{ category.categoryName }}
                                    </button>
                                </template>
                                <div class="bg-white p-2 flex flex-col gap-2">
                                    <ul
                                        v-for="subCategory in category.subCategories"
                                        :key="subCategory._id">
                                        <li class="whitespace-nowrap hover:text-[#0062bd]">
                                            <v-menu
                                                transition="scale-transition"
                                                location="end"
                                                close-delay="10"
                                                open-delay="10"
                                                open-on-hover>
                                                <template v-slot:activator="{ props }">
                                                    <button
                                                        @click="filterProduct(category, subCategory)"
                                                        class="w-full text-start justify-between"
                                                        v-bind="props">
                                                        {{ subCategory.subCategoryName }}
                                                    </button>
                                                </template>
                                                <div
                                                    v-if="subCategory.sub_categories && subCategory.sub_categories.length > 0"
                                                    class="bg-white p-2 flex flex-col gap-2">
                                                    <ul
                                                        v-for="sub_category in subCategory.sub_categories"
                                                        :key="sub_category._id">
                                                        <li class="whitespace-nowrap hover:text-[#0062bd]">
                                                            <button @click="filterProduct(category, subCategory, sub_category)">{{ sub_category.sub_categoryName }}</button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </v-menu>
                                        </li>
                                    </ul>
                                </div>
                            </v-menu>
                        </li>
                    </template>
                </ul>
            </div>

            <div class="filter-container w-full bg-white">
                <div class="price p-3">
                    <h2 class="p-2 font-semibold">Preço</h2>
                    <div class="slider-demo-block">
                        <p class="text-base font-serif">{{ priceValue }}</p>
                        <el-slider
                            v-model="priceValue"
                            size="small"
                            :step="5000"
                            range
                            :max="pricelimit" />
                    </div>
                </div>
                <div class="marca">
                    <h2 class="p-2 font-semibold">Marca</h2>
                    <div class="p-3"></div>
                </div>
                <div class="deal p-3">
                    <h2 class="p-2 font-semibold">Negócio</h2>
                    <div class="p-3"></div>
                </div>
                <div class="rating p-3">
                    <h2 class="p-2 font-semibold">Preço</h2>
                    <div class="p-3"></div>
                </div>
            </div>
        </section>

        <section class="flex-1 flex flex-col h-full">
            <div class="h-[40px] mt-2 p-2 sticky bg-white justify-between flex flex-row">
                <div class="flex flex-row justify-between">
                    <h2>{{ category || "Todos Produtos" }}</h2>
                </div>
                <div>
                    <router-link :to="{ name: newProduct }">
                        <el-button
                            :class="buttonShow"
                            link
                            type="primary"
                            size="small">
                            <Plus />Novo Produto
                        </el-button>
                    </router-link>
                </div>
            </div>

            <ProductSkeleton v-if="skeleton" />
            <div v-else>
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
                            :length="totalPages">
                        </v-pagination>
                    </div>
                </div>
                <div
                    v-else
                    class="self-center">
                    <p>Sem produtos para mostrar!!!</p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
    import ProductViewComp from "./ProductViewComp.vue";
    import ProductSkeleton from "@/components/skeletons/ProductSkeleton.vue";
    import { defineProps, computed, ref, onBeforeUnmount, onBeforeMount, watch } from "vue";
    import { useStore } from "vuex";
    import { useRouter, useRoute } from "vue-router";
    // import { Plus } from "lucide-vue-next";

    const props = defineProps({
        nameRoute: String,
        fetchRouteName: String,
        buttonShow: String,
        newProduct: String,
        skeleton: Boolean,
        getCategories: String,
    });

    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    const products = computed(() => store.getters.products.docs);
    const categories = computed(() => store.state.categories);
    const currentPage = ref(Number(route.query.offset) || 1);
    const category = ref(null);
    watch(
        () => route.query.category,
        (newRoute) => {
            category.value = newRoute;
        }
    );

    const totalPages = computed(() => {
        if (store.state.products.products) {
            return Math.ceil(store.state.products.quantity / 10);
        } else {
            return 0;
        }
    });

    const pushWithQuery = (offset) => {
        router.push({ name: props.fetchRouteName || "allProductsClient", query: { offset: offset } });
    };

    const priceValue = ref(0);
    const pricelimit = ref(200000);

    function filterProduct(category, subCategory, sub_category) {
        const query = {
            _id: category._id,
            category: category.categoryName,
        };

        if (subCategory) {
            query.subcategory = subCategory._id;
        }

        if (sub_category) {
            query.sub_category = sub_category._id;
        }

        router.push({
            name: props.fetchRouteName || "allProductsClient",
            query: query,
        });
    }

    onBeforeUnmount(() => {
        store.commit("CLEAR_PRODUCTS");
    });

    onBeforeMount(async () => {
        category.value = route.query.category;
        await store.dispatch(props.getCategories || "getAllCategory");
    });
</script>
<style scoped>
    .slider-demo-block {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .slider-demo-block .el-slider {
        margin-top: 10px;
        margin: 0 15px;
    }
</style>
