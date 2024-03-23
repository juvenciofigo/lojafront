<template>
    <div class="flex flex-col gap-2">
        <div class="grid gap-2 bg-slate-100 p-2 rounded-md">
            <div class="flex flex-col gap-2">
                <Label for="categoria">Criar Categoria:</Label>
                <v-text-field
                    type="text"
                    placeholder="Digite o nome da categoria"
                    v-model="categoryName"
                    id="categoria"
                    density="compact"
                    flat
                    clearable
                    variant="outlined"></v-text-field>
                <Button
                    @click="createCategory"
                    class="w-max"
                    type="button"
                    variant="outline"
                    >Criar</Button
                >
            </div>
        </div>

        <!-- Criar Subcategoria -->
        <div class="grid gap-2 bg-slate-100 p-2 rounded-md">
            <div class="flex flex-col gap-2">
                <Label for="subcategoria">Criar Subcategoria:</Label>
                <v-text-field
                    type="text"
                    placeholder="Digite o nome da subcategoria"
                    v-model="subCategoryName"
                    id="subcategoria"
                    density="compact"
                    flat
                    clearable
                    variant="outlined">
                </v-text-field>

                <SelectRoot
                    class="bg-black"
                    v-model="selectedCategory">
                    <SelectTrigger
                        class="flex border items-center justify-between w-32 px-[15px] text-[13px] gap-[5px]"
                        aria-label="Customise options">
                        <SelectValue placeholder="Categoria" />
                        <ChevronDown class="h-3.5 w-3.5" />
                    </SelectTrigger>

                    <SelectPortal>
                        <SelectContent
                            class="bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-[100]"
                            :side-offset="5">
                            <SelectScrollUpButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                                <ChevronUp class="h-3.5 w-3.5" />
                            </SelectScrollUpButton>

                            <SelectViewport class="p-[5px]">
                                <SelectGroup>
                                    <SelectItem
                                        v-for="(category, index) in categories"
                                        :key="index"
                                        class="text-[13px] leading-none flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none"
                                        :value="category._id">
                                        <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                            <Check class="h-3.5 w-3.5" />
                                        </SelectItemIndicator>
                                        <SelectItemText class="cursor-pointer">
                                            {{ category.categoryName }}
                                        </SelectItemText>
                                    </SelectItem>
                                </SelectGroup>
                            </SelectViewport>

                            <SelectScrollDownButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                                <ChevronDown class="h-3.5 w-3.5" />
                            </SelectScrollDownButton>
                        </SelectContent>
                    </SelectPortal>
                </SelectRoot>

                <Button
                    @click="createSubCategory"
                    class="w-max"
                    type="button"
                    variant="outline"
                    >Criar</Button
                >
            </div>
        </div>

        <!-- Criar Subcategoria de Subcategoria -->
        <div class="grid gap-2 bg-slate-100 p-2 rounded-md">
            <div class="flex flex-col gap-2">
                <Label for="categoria">Criar sub_categoria:</Label>
                <v-text-field
                    type="text"
                    placeholder="Digite o nome da sub_categoria"
                    v-model="sub_categoryName"
                    id="categoria"
                    density="compact"
                    flat
                    clearable
                    variant="outlined">
                </v-text-field>

                <SelectRoot
                    class="bg-black"
                    v-model="selectedSubcategory">
                    <SelectTrigger
                        class="flex border items-center justify-between w-32 px-[15px] text-[13px] gap-[5px]"
                        aria-label="Customise options">
                        <SelectValue placeholder="Subcategoria" />
                        <ChevronDown class="h-3.5 w-3.5" />
                    </SelectTrigger>

                    <SelectPortal>
                        <SelectContent
                            class="bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-[100]"
                            :side-offset="5">
                            <SelectScrollUpButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
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

                            <SelectScrollDownButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                                <ChevronDown class="h-3.5 w-3.5" />
                            </SelectScrollDownButton>
                        </SelectContent>
                    </SelectPortal>
                </SelectRoot>

                <Button
                    @click="createSub_category"
                    class="w-max"
                    type="button"
                    variant="outline"
                    >Criar</Button
                >
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

    const categoryName = ref("");
    const subCategoryName = ref("");
    const sub_categoryName = ref("");

    const selectedCategory = ref("");
    const selectedSubcategory = ref("");

    const categories = computed(() => store.state.categories);

    async function createCategory() {
        if (!categoryName.value) {
            store.commit("updateSnackbar", { show: true, text: "Preencha o campo o nome da categoria", color: "red" });
            return;
        }
        await store.dispatch("createCategory", categoryName.value);
    }

    async function createSubCategory() {
        if (!subCategoryName.value) store.commit("updateSnackbar", { show: true, text: "Preencha o campo o nome da subcategoria", color: "red" });

        if (!categoryName.value) store.commit("updateSnackbar", { show: true, text: "Escolha uma Categoria", color: "red" });

        await store.dispatch("createSubCategory", { categoryID: selectedCategory.value, subCategoryName: subCategoryName.value });
    }

    async function createSub_category() {
        if (!sub_categoryName.value) store.commit("updateSnackbar", { show: true, text: "Preencha o campo o nome da sub_categoria", color: "red" });

        if (!subCategoryName.value) store.commit("updateSnackbar", { show: true, text: "Escolha uma Subcategoria", color: "red" });

        await store.dispatch("createSub_category", { subCategoryID: selectedSubcategory.value, sub_categoryName: sub_categoryName.value });
    }
</script>
