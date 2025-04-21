<template lang="">
    <section class="flex-1 flex flex-col gap-3">
        <div class="flex flex-row gap-2 bg-foreground_2">
            <!-- Categorias -->
            <div class="categories-card hidden lg:block flex-col w-72 pb-1">
                <h2 class="p-1 bg-details font-semibold">Categorias</h2>

                <ul
                    v-if="categories && categories.length > 0"
                    class="categories-list indent-2 p-1 overflow-auto list-none bg-foreground_2 min-w-52 text-text13">
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
                                            class="list-none indent-2 p-1 bg-white min-w-52 text-text13">
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
        <div class="w-full flex lg:flex-row gap-1 flex-col-reverse mt-">
            <div
                v-if="products"
                class="overflow-hidden flex-1 gap-3 flex flex-col">
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
                            class="object-contain h-full w-full"
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
