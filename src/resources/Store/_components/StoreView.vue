<template lang="">
    <section class="flex flex-1 flex-col gap-3">
        <div class="flex flex-row gap-2">
            <!-- Categorias -->
            <div class="categories-card hidden w-72 flex-col bg-white pb-1 lg:block">
                <p class="bg-yellow-300 p-2 font-semibold">Categorias</p>

                <div
                    v-if="categories && categories.length > 0"
                    class="categories-list overflow-auto p-1 indent-4">
                    <ul class="list-none">
                        <li class="item-list duration-75">
                            <router-link :to="{ name: 'products-list' }">Todos produtos</router-link>
                        </li>
                        <template
                            v-for="category in categories"
                            :key="category._id">
                            <li class="item-list">
                                <v-menu
                                    transition="scroll-x-transition"
                                    location="end"
                                    close-delay="10"
                                    open-delay="10"
                                    open-on-hover>
                                    <template v-slot:activator="{ props }">
                                        <button
                                            @click="filterProduct(category)"
                                            class="w-[calc(100%-16px)] justify-between text-start"
                                            v-bind="props">
                                            {{ category.categoryName }}
                                        </button>
                                    </template>
                                    <div class="bg-white">
                                        <ul
                                            v-for="subCategory in category.subCategories"
                                            :key="subCategory._id">
                                            <li class="subCategory item-list">
                                                <v-menu
                                                    transition="scale-transition"
                                                    location="end"
                                                    close-delay="10"
                                                    open-delay="10"
                                                    open-on-hover>
                                                    <template v-slot:activator="{ props }">
                                                        <button
                                                            @click="filterProduct(category, subCategory)"
                                                            class="w-full justify-between text-start"
                                                            v-bind="props">
                                                            {{ subCategory.subCategoryName }}
                                                        </button>
                                                    </template>
                                                    <div
                                                        v-if="subCategory.sub_categories && subCategory.sub_categories.length > 0"
                                                        class="bg-white">
                                                        <ul
                                                            v-for="sub_category in subCategory.sub_categories"
                                                            :key="sub_category._id">
                                                            <li class="item-list">
                                                                <button @click="filterProduct(category, subCategory, sub_category)">
                                                                    {{ sub_category.sub_categoryName }}
                                                                </button>
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

                <div v-else>
                    <el-skeleton
                        style="width: 100%"
                        :rows="6"
                        animated />
                </div>
            </div>

            <!-- Banner -->
            <BannerComp />
        </div>

        <!-- Produtos e Promoções -->
        <div class="mt- flex w-full flex-col-reverse gap-1 lg:flex-row">
            <div
                v-if="products"
                class="flex flex-1 flex-col gap-3 overflow-hidden">
                <SelectedProducts
                    :title="`Novidades`"
                    :products="products.docs"
                    :link="`produtos`" />

                <SelectedProducts
                    :title="`Destaque`"
                    :products="products.docs"
                    :link="`produtos`" />
            </div>
            <div class="ads slider gap-2">
                <template
                    v-for="(item, index) in promos"
                    :key="index">
                    <div class="ads-content bg-slate-100">
                        <img
                            class="h-full w-full object-contain"
                            :src="item.image"
                            :alt="`Promoção ${index + 1}`" />
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script setup>
    import { useHead } from "@vueuse/head";

    import { useStore } from "vuex";
    import { onBeforeMount, computed, ref } from "vue";
    import { useRouter } from "vue-router";
    import SelectedProducts from "@/resources/_components/SelectedProducts.vue";
    import BannerComp from "@/resources/Store/_components/Store/_components/banners/BannerComp.vue";

    const store = useStore();
    const router = useRouter();
    const categories = computed(() => store.state.categories.categories);
    const products = computed(() => store.state.products.products);
    const skeleton = ref(true);
    const promos = [
        {
            image: "images/promo/promo1.webp",
        },
        {
            image: "images/promo/promo2.webp",
        },
        {
            image: "images/promo/promo3.webp",
        },
    ];

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
            name: "products-list",
            query: query,
            params: { by: "filter" },
        });
    }

    onBeforeMount(async () => {
        await store.dispatch("products/fetchProducts");
        skeleton.value = false;
        updateHead();
    });

    function updateHead() {
        useHead({
            title: `${store.state?.storeName} - Pagina inicial`,
            meta: [
                {
                    name: "description",
                    content: `Produtos importados, com os melhores preços. Confira agora!`,
                },
            ],
        });
    }
</script>

<style scoped>
    .ads {
        display: flex;
        flex-direction: row;
    }

    .categories-card {
        width: 350px;
    }

    .item-list {
        padding: 6px 5px;
        font-size: 13px;
        line-height: 20px;
    }

    .item-list:hover {
        color: #0062bd;
        outline: 1px solid #0062bd;
    }

    @media (min-width: 1024px) {
        .ads {
            flex-direction: column;
        }
        .ads-content {
            width: 220px;
            height: 220px;
        }
    }
</style>
