<template>
    <div class="flex flex-row flex-1">
        <!-- Filtrar -->
        <section class="w-[274px] hidden lg:flex flex-col gap-4 bg-foreground_2">
            <div class="w-full categories-list overflow-auto">
                <h2 class="p-1 bg-details font-semibold h-[40px]">Categorias</h2>

                <ul
                    v-if="categories && categories.length > 0"
                    class="categories-list indent-2 p-1 overflow-auto list-none min-w-52 text-text13 bg-foreground_2">
                    <router-link :to="{ name: 'products-list' }"><li class="duration-75 item-list-category">Todos produtos</li></router-link>

                    <li
                        v-for="category in categories"
                        :key="category._id"
                        class="item-list-category">
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

                            <ul
                                v-for="subCategory in category.subCategories"
                                :key="subCategory._id"
                                class="list-none indent-2 p-1 bg-foreground_2 min-w-52 text-text13">
                                <li class="subCategory item-list-category">
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
                                        <ul
                                            v-if="subCategory.sub_categories && subCategory.sub_categories.length > 0"
                                            class="list-none indent-2 p-1 min-w-52 text-text13 bg-foreground_2">
                                            <li
                                                v-for="sub_category in subCategory.sub_categories"
                                                :key="sub_category._id"
                                                class="item-list-category">
                                                <button @click="filterProduct(category, subCategory, sub_category)">
                                                    {{ sub_category.sub_categoryName }}
                                                </button>
                                            </li>
                                        </ul>
                                    </v-menu>
                                </li>
                            </ul>
                        </v-menu>
                    </li>
                </ul>
            </div>

            <div class="filter-container w-full ">
                <div class="price p-3">
                    <h2 class="p-2 font-semibold">Preço</h2>
                    <div class="slider-demo-block">
                        <p class="font-serif">{{ priceValue }}</p>
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
        <!-- Filtrar -->

        <section class="flex-1 flex flex-col gap-1">
            <div class="h-[40px] p-2 bg-foreground_2 justify-between flex flex-row items-center">
                <div class="flex flex-row justify-between">
                    <h2>{{ category || "Todos Produtos" }}</h2>
                </div>

            </div>

            <ProductSkeleton v-if="skeleton" />
            <div
                v-loading="loading"
                v-if="products?.docs?.length > 0 && !skeleton"
                class="flex-1 w-full flex flex-col overflow-hidden">
                <div
                    class="products"
                    v-if="products && products.docs.length > 0">
                    <ProductCard
                        class="productCard"
                        v-for="(product, index) in products.docs"
                        :key="index"
                        :product="product"
                        :RouterName="nameRoute" />
                    <div class="w-full min-h-2 productCard self-center mt-2">
                        <el-button
                            v-if="products.hasNextPage === true"
                            @click="load"
                            class="w-full"
                            type="primary"
                            plain>
                            {{ loading ? "Processando" : "Ver mais..." }}</el-button
                        >
                    </div>
                </div>
            </div>
            <div
                v-if="!products || (products.docs?.length === 0 && !skeleton)"
                class="self-center">
                <p>Sem produtos para mostrar!!!</p>
            </div>
        </section>
    </div>
</template>

<script setup>
    import ProductSkeleton from "@/components/skeletons/ProductSkeleton.vue";
    import { defineProps, computed, ref, onBeforeUnmount, onBeforeMount, watch } from "vue";
    import { useStore } from "vuex";
    import { useRouter, useRoute } from "vue-router";
    import ProductCard from "@/resources/_components/ProductCard.vue";
    import { useHead } from "@vueuse/head";

    const props = defineProps({
        nameRoute: String,
        fetchRouteName: String,
        fetchCategories: String,
        fetchProducts: String,
    });

    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const products = computed(() => store.state.products.products);
    const categories = computed(() => store.state.categories.categories);
    const category = ref(null);

    watch(
        () => route.query,
        () => {
            fetchProducts();
        }
    );

    const priceValue = ref(0);
    const pricelimit = ref(200000);
    const loading = ref(true);
    const skeleton = ref(true);

    function filterProduct(category, subCategory, sub_category) {
        const query = {
            categoryName: category.categoryName,
            category: category._id,
        };

        if (subCategory) {
            query.subcategory = subCategory._id;
        }

        if (sub_category) {
            query.sub_category = sub_category._id;
        }

        router.push({
            query: query,
            params: { by: "filter" },
        });
    }

    onBeforeUnmount(() => {
        store.commit("products/CLEAR_PRODUCTS");
    });

    const offset = ref(route.query.subcategory || 1);

    async function fetchProducts() {
        loading.value = true;
        const query = { offset: offset.value };

        if (route.query.category) {
            category.value = route.query.categoryName;
            query.category = route.query.category;
        }
        if (route.query.subcategory) {
            query.subcategory = route.query.subcategory;
        }
        if (route.query.sub_category) {
            query.sub_category = route.query.sub_category;
        }

        if (route.params?.by === "search") {
            query.search = route.query.search;
            await store.dispatch("products/searchProducts", { query });
        } else if (route.params?.by === "filter") {
            await store.dispatch("products/filterProducts", { query });
        } else {
            await store.dispatch(props.fetchProducts || "products/fetchProducts", { query });
        }
        head();
        loading.value = false;
        return;
    }

    onBeforeMount(async () => {
        await store.dispatch(props.fetchCategories || "categories/fetchCategories");
        await fetchProducts();
        loading.value = false;
        skeleton.value = false;
    });

    const load = async () => {
        if (!products.value.hasNextPage) return;
        loading.value = true;
        offset.value += 1;
        await fetchProducts();
        loading.value = false;
        skeleton.value = false;
    };

    function head() {
        useHead({
            title: computed(() => `${store.state.storeName} - ${category.value || "Todos Produtos"}`),
            meta: [
                {
                    name: "description",
                    content: `Melhores produtos importados!`,
                },
            ],
        });
    }
</script>

<style scoped>
    .productCard {
        max-height: 270px;
    }
    .productCard:last-child {
        grid-column: 1 / -1;
    }

    .products {
        margin: 0 5px;
        display: grid;
        gap: 5px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-auto-rows: min-content;
        padding: 5px;
    }

    @media (min-width: 425px) {
        .products {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }
    @media (min-width: 768px) {
        .products {
            margin: 0;
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
    }
    @media (min-width: 1247px) {
        .products {
            margin: 0;

            grid-template-columns: repeat(5, minmax(0, 1fr));
        }
    }
</style>
<style></style>
