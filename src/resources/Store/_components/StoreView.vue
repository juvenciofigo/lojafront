<template lang="">
    <section class="flex-1 bg-slate-100">
        <div class="mt-6 mx-4 flex flex-row">
            <div
                v-if="categories && categories.length > 0"
                class="m-2 categories-card hidden xl:text-base xl:inline-flex flex-col w-72 rounded-lg ml-5 bg-white pb-1">
                <p class="bg-yellow-300 p-2 rounded-t-lg font-semibold">Categorias</p>

                <div class="categories-list indent-4 overflow-auto">
                    <ul class="list-none">
                        <li class="whitespace-nowrap hover:text-[#0062bd]"><router-link :to="{ name: 'allProductsClient' }">Todos produtos</router-link></li>
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
            </div>

            <BannerComp />
        </div>

        <div class="w-full flex md:flex-row gap-3 p-2 flex-col-reverse">
            <div class="overflow-hidden flex-1 flex flex-col">
                <SelectdProducs
                    :title="`Produtos Recentes`"
                    :products="products"
                    :link="`Ver`" />

                <SelectdProducs
                    :title="`Top Produtos`"
                    :products="products"
                    :link="`Ver`" />
            </div>
            <div class="ads slider gap-2 md:self-center">
                <template
                    v-for="(item, index) in promos"
                    :key="index">
                    <div class="w-48 h-48 bg-slate-100">
                        <img
                            class="object-contain rounded-md h-full w-full"
                            :src="item.image"
                            alt="" />
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>
<script setup>
    import { useStore } from "vuex";
    import { onBeforeMount, computed, ref } from "vue";
    import { useRouter } from "vue-router";
    // import ProductViewComp from "@/resources/_components/ProductViewComp.vue";
    import SelectdProducs from "@/resources/_components/SelectdProducs.vue";
    // import ProductSkeleton from "@/components/skeletons/ProductSkeleton.vue";
    import BannerComp from "@/resources/Store/_components/Store/_components/banners/BannerComp.vue";

    const store = useStore();
    const router = useRouter();
    const categories = computed(() => store.state.categories);
    const products = computed(() => store.getters.products.docs);
    const skeleton = ref(true);
    const promos = [
        {
            image: "images/promo/promo1.png",
        },
        {
            image: "images/promo/promo2.png",
        },
        {
            image: "images/promo/promo3.png",
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
    });
</script>
<style scoped>
    .ads {
        display: flex;
        flex-direction: row;
    }
    @media (min-width: 768px) {
        .ads {
            flex-direction: column;
        }
    }
</style>
