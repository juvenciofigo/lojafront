<template lang="">
    <!-- start header-2 -->
    <nav class="header-2 lg:h-[70px] h-[50px] flex flex-row gap-4 items-center bg-white">
        <div class="lg:hidden flex flex-col"></div>

        <div class="py-2 px-3 lg:block rounded-md hidden duration-700 hover:-translate-y-1">
            <LogoPart />
        </div>

        <div class="search flex-1 flex flex-row md:gap-[10%] justify-end">
            <div class="ml-3 w-full md:m-0 border-[#2196F3] flex flex-1 max-w-[700px] flex-row">
                <el-input
                    v-model="textSearch"
                    style="max-width: 600px"
                    placeholder="Pesquise pelo nome do produto"
                    class="input-with-select">
                    <template #prepend>
                        <div>
                            <div class="hidden lg:block">
                                <el-select
                                    clearable
                                    v-model="selectedCategory"
                                    placeholder="Ver por categoria"
                                    style="width: 150px; padding: 0">
                                    <el-option
                                        v-for="category in categories"
                                        :key="category._id"
                                        :value="category.categoryName"
                                        :label="category.categoryName" />
                                </el-select>
                            </div>
                            <Button
                                class="lg:hidden block"
                                @click.stop="drawer = !drawer"
                                variant="gost">
                                <Menu class="h-7.5 w-7.5" />
                            </Button>
                        </div>
                    </template>
                    <template #append>
                        <el-button
                            v-on:click="search"
                            :icon="Search" />
                    </template>
                </el-input>
            </div>
        </div>
    </nav>

    <!-- end header-2 -->

    <nav class="mobile lg:hidden">
        <el-drawer
            :size="300"
            v-model="drawer"
            :close-on-click-modal="true"
            direction="ltr">
            <template #header>
                <div class="flex ml-2">
                    <LogoPart />
                </div>
            </template>
            <hr />
            <p class="text-sm mb-1 text-muted-foreground">Categorias</p>
            <template v-if="categories && categories.length > 0">
                <nav class="flex flex-col gap-1">
                    <el-tag
                        size="small"
                        class="cursor-pointer w-full">
                        <router-link :to="{ name: 'allProductsClient' }">Todos produtos</router-link>
                    </el-tag>
                    <el-tag
                        class="cursor-pointer w-full"
                        size="small"
                        v-for="category in categories"
                        :key="category._id"
                        @click="filterProduct(category)">
                        {{ category.categoryName }}
                    </el-tag>
                </nav>
            </template>
        </el-drawer>
    </nav>
</template>

<script setup>
    import { computed, ref, onBeforeUnmount, onBeforeMount } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    import { Search } from "lucide-vue-next";
    import LogoPart from "./LogoPart.vue";

    import { Button } from "@/components/ui/button";
    import { Menu } from "lucide-vue-next";

    const store = useStore();
    const router = useRouter();

    const categories = computed(() => store.state.categories.categories);
    const selectedCategory = ref(null);
    const textSearch = ref(null);

    function search() {
        if (textSearch.value === null) return;

        const query = {
            search: textSearch.value,
        };

        if (selectedCategory.value !== null) {
            query.category = selectedCategory.value;
        }
        router.push({
            name: "allProductsClient",
            query: query,
        });
    }

    const drawer = ref(false);

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1279) {
            drawer.value = false;
        }
    });

    function filterProduct(category) {
        drawer.value = false;
        let query;
        if (!drawer.value) {
            query = {
                _id: category._id,
                category: category.categoryName,
            };
        }

        router.push({
            name: "allProductsClient",
            query: query,
        });
    }

    onBeforeMount(async () => {
        await store.dispatch("categories/fetchCategories");
    });
    onBeforeUnmount(() => {
        store.commit("CLEAR_CATEGORIES");
    });
</script>
<style scoped>
    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    .el-dropdown-link {
        cursor: pointer;
        display: flex;
        align-items: center;
    }
</style>
<style>
    .with-loader .circular {
        width: 20px !important;
    }
    .with-loader .el-loading-spinner {
        top: 0 !important;
    }
    .el-notification {
        height: auto !important;
        padding: 5px !important;
        font-size: 10px !important;
    }
    .search .el-select__wrapper {
        padding: 8px;
    }
    .search .el-input-group__prepend {
        padding: 0px !important;
    }
</style>
