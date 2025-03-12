<template lang="">
    <!-- start header-2 -->
    <nav class="header-2 lg:h-[70px] h-[50px] flex flex-row gap-4 items-center bg-white">
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
                        <el-select
                            clearable
                            v-model="selectedCategory"
                            placeholder="Categoria"
                            style="width: 115px">
                            <el-option
                                v-for="category in categories"
                                :key="category._id"
                                :value="category.categoryName"
                                :label="category.categoryName" />
                        </el-select>
                    </template>
                    <template #append>
                        <el-button
                            v-on:click="search"
                            :icon="Search" />
                    </template>
                </el-input>
            </div>
        </div>

        <div class="flex flex-col gap-2 lg:flex-row lg:gap-5">
            <router-link
                v-for="link in Links"
                :key="link"
                :to="link"
                class="text-[#333333] hover:scale-110 font-medium duration-700 hover:text-[#2196F3]">
                {{ link }}
            </router-link>
        </div>
    </nav>
    <!-- end header-2 -->
</template>

<script setup>
    import { computed, ref, onBeforeUnmount, onMounted } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    import { Search } from "lucide-vue-next";
    import LogoPart from "./LogoPart.vue";

    const store = useStore();
    const router = useRouter();

    const categories = computed(() => store.state.categories);
    const selectedCategory = ref(null);
    const textSearch = ref(null);

    function search() {
        if (textSearch.value == null) return;

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

    onMounted(async () => {
        await store.dispatch("getAllCategory");
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
</style>
