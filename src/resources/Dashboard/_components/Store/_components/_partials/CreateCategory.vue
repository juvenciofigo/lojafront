<template>
    <div class="flex flex-col gap-2">
        <div class="grid gap-2 rounded-md bg-slate-100 p-2">
            <div class="flex flex-col gap-2">
                <Label for="categoria">Criar Categoria:</Label>
                <el-input
                    v-model="categoryName"
                    :disabled="loadingBtn"
                    autocomplete="off"
                    id="categoria"
                    type="text"
                    placeholder="Digite o nome da categoria"
                    aria-label="Digite o nome da categoria" />
                <el-button
                    size="small"
                    :loading="loadingBtn"
                    @click="createCategory()">
                    Criar Categoria
                </el-button>
            </div>
        </div>

        <!-- Criar Subcategoria -->
        <div class="grid gap-2 rounded-md bg-slate-100 p-2">
            <div class="flex flex-col gap-2">
                <Label for="subcategoria">Criar Subcategoria:</Label>

                <el-input
                    v-model="subCategoryName"
                    :disabled="loadingBtn"
                    autocomplete="off"
                    id="subcategoria"
                    type="text"
                    placeholder="Digite o nome da subcategoria"
                    aria-label="Digite o nome da subcategoria" />

                <SelectRoot
                    class="bg-black"
                    v-model="selectedCategory">
                    <SelectTrigger
                        class="flex w-32 items-center justify-between gap-[5px] border px-[15px] text-[13px]"
                        aria-label="Customise options">
                        <SelectValue placeholder="Categoria" />
                        <ChevronDown class="h-3.5 w-3.5" />
                    </SelectTrigger>

                    <SelectPortal>
                        <SelectContent
                            class="z-[100] rounded-sm bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                            :side-offset="5">
                            <SelectScrollUpButton class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
                                <ChevronUp class="h-3.5 w-3.5" />
                            </SelectScrollUpButton>

                            <SelectViewport class="p-[5px]">
                                <SelectGroup>
                                    <SelectItem
                                        v-for="(category, index) in categories"
                                        :key="index"
                                        class="relative flex h-[25px] items-center pr-[35px] pl-[25px] text-[13px] leading-none select-none"
                                        :value="category._id">
                                        <SelectItemIndicator class="absolute left-0 inline-flex w-[25px] items-center justify-center">
                                            <Check class="h-3.5 w-3.5" />
                                        </SelectItemIndicator>
                                        <SelectItemText class="cursor-pointer">
                                            {{ category.categoryName }}
                                        </SelectItemText>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectViewport>

                            <SelectScrollDownButton class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
                                <ChevronDown class="h-3.5 w-3.5" />
                            </SelectScrollDownButton>
                        </SelectContent>
                    </SelectPortal>
                </SelectRoot>

                <el-button
                    size="small"
                    :loading="loadingBtn"
                    @click="createSubCategory()">
                    Criar Subcategoria
                </el-button>
            </div>
        </div>

        <!-- Criar Subcategoria de Subcategoria -->
        <div class="grid gap-2 rounded-md bg-slate-100 p-2">
            <div class="flex flex-col gap-2">
                <Label for="categoria">Criar sub_categoria:</Label>
                <el-input
                    v-model="sub_categoryName"
                    :disabled="loadingBtn"
                    autocomplete="off"
                    id="categoria"
                    type="text"
                    placeholder="Digite o nome da sub_categoria"
                    aria-label="Digite o nome da sub_categoria" />

                <SelectRoot
                    class="bg-black"
                    v-model="selectedSubcategory">
                    <SelectTrigger
                        class="flex w-32 items-center justify-between gap-[5px] border px-[15px] text-[13px]"
                        aria-label="Customise options">
                        <SelectValue placeholder="Subcategoria" />
                        <ChevronDown class="h-3.5 w-3.5" />
                    </SelectTrigger>

                    <SelectPortal>
                        <SelectContent
                            class="z-[100] rounded-sm bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                            :side-offset="5">
                            <SelectScrollUpButton class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
                                <ChevronUp class="h-3.5 w-3.5" />
                            </SelectScrollUpButton>

                            <SelectViewport class="p-[5px]">
                                <template
                                    v-for="(category, index) in categories"
                                    :key="index">
                                    <SelectLabel class="text-slate-500">{{ category.categoryName }}</SelectLabel>
                                    <hr />
                                    <SelectGroup>
                                        <SelectItem
                                            v-for="(subCategory, subIndex) in category.subCategories"
                                            :key="subIndex"
                                            :value="subCategory._id"
                                            class="indent-2">
                                            <SelectItemText class="cursor-pointer">{{ subCategory.subCategoryName }}</SelectItemText>
                                        </SelectItem>
                                    </SelectGroup>
                                </template>
                            </SelectViewport>

                            <SelectScrollDownButton class="text-violet11 flex h-[25px] cursor-default items-center justify-center bg-white">
                                <ChevronDown class="h-3.5 w-3.5" />
                            </SelectScrollDownButton>
                        </SelectContent>
                    </SelectPortal>
                </SelectRoot>

                <el-button
                    size="small"
                    :loading="loadingBtn"
                    @click="createSub_category()">
                    Criar Sub_Categoria
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from "vue";
    import { useStore } from "vuex";
    import { Check, ChevronDown, ChevronUp } from "lucide-vue-next";
    import {
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectItemIndicator,
        SelectItemText,
        SelectLabel,
        SelectPortal,
        SelectRoot,
        SelectScrollDownButton,
        SelectScrollUpButton,
        SelectTrigger,
        SelectValue,
        SelectViewport,
    } from "radix-vue";

    const store = useStore();

    const categoryName = ref(null);
    const subCategoryName = ref(null);
    const sub_categoryName = ref(null);

    const selectedCategory = ref(null);
    const selectedSubcategory = ref(null);
    const loadingBtn = ref(false);

    const categories = computed(() => store.state.categories.categories);

    const notification = (message) => {
        store.commit("SET_NOTIFICATION", { title: "Aviso", type: "warning", message: message });
    };

    async function createCategory() {
        loadingBtn.value = true;

        if (!categoryName.value) {
            //nome
            notification("Preencha o campo o nome da categoria");
            loadingBtn.value = false;
            return;
        }

        await store.dispatch("categories/createCategory", categoryName.value);
        loadingBtn.value = false;
    }

    async function createSubCategory() {
        loadingBtn.value = true;
        if (!selectedCategory.value) {
            notification("Escolha uma Categoria!");
            loadingBtn.value = false;
            return;
        }
        if (!subCategoryName.value) {
            // nome
            loadingBtn.value = false;
            notification("Preencha o campo o nome da subcategoria");
            return;
        }

        await store.dispatch("categories/createSubCategory", { categoryID: selectedCategory.value, subCategoryName: subCategoryName.value });
        loadingBtn.value = false;
    }

    async function createSub_category() {
        loadingBtn.value = true;
        if (!sub_categoryName.value) {
            //nome
            notification("Preencha o campo o nome da sub_categoria");
            loadingBtn.value = false;
            return;
        }

        if (!selectedSubcategory.value) {
            notification("Escolha uma Subcategoria");
            loadingBtn.value = false;
            return;
        }

        await store.dispatch("categories/createSub_category", { subCategoryID: selectedSubcategory.value, sub_categoryName: sub_categoryName.value });
        loadingBtn.value = false;
    }
</script>
