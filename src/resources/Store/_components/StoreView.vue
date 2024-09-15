<template lang="">
    <section class="flex-1 bg-slate-100">
        <div class="mt-6 mx-2 flex flex-row">
            <!-- Categorias -->
            <div class="m-2 categories-card hidden lg:block flex-col w-72 rounded-lg ml-5 bg-white pb-1">
                <p class="bg-yellow-300 p-2 rounded-t-lg font-semibold">Categorias</p>

                <div
                    v-if="categories && categories.length > 0"
                    class="categories-list indent-4 overflow-auto">
                    <ul class="list-none">
                        <li class="whitespace-nowrap hover:text-[#0062bd]">
                            <router-link :to="{ name: 'allProductsClient' }">Todos produtos</router-link>
                        </li>
                        <template
                            v-for="category in categories"
                            :key="category._id">
                            <li class="whitespace-nowrap hover:text-[#0062bd]">
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
        <div class="w-full flex lg:flex-row gap-3 p-2 flex-col-reverse">
            <div class="overflow-hidden flex-1 gap-2 flex flex-col">
                <SelectdProducs
                    :title="`Produtos Recentes`"
                    :products="products"
                    :link="`produtos`" />

                <SelectdProducs
                    :title="`Top Produtos`"
                    :products="products"
                    :link="`produtos`" />
            </div>
            <div class="ads slider gap-2 self-center">
                <template
                    v-for="(item, index) in promos"
                    :key="index">
                    <div class="ads-content bg-slate-100">
                        <img
                            class="object-contain rounded-md h-full w-full"
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
    import SelectdProducs from "@/resources/_components/SelectdProducs.vue";
    import BannerComp from "@/resources/Store/_components/Store/_components/banners/BannerComp.vue";

    const store = useStore();
    const router = useRouter();
    const categories = computed(() => store.state.categories);
    const products = computed(() => store.getters.products.docs);
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
            name: "allProductsClient",
            query: query,
        });
    }

    onBeforeMount(async () => {
        await store.dispatch("getAllProducts");
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
