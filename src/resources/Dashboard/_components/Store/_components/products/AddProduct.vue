<template lang="">
    <div class="absolute bottom-0 top-[4px] p-4 right-0 flex-1 w-full flex flex-col overflow-auto bg-white gap-2 flex-nowrap">
        <div>
            <h1 class="text-lg font-semibold">Informações Básicas</h1>
            <p class="text-xs indent-2">Preencha as informações abaixo</p>
        </div>

        <div>
            <form @submit.prevent="addProduct">
                <div class="flex flex-row gap-8">
                    <div class="Right flex-[2] flex flex-col gap-8">
                        <div class="TIT_Desc">
                            <div class="Tit-Des flex flex-col gap-4">
                                <div class="flex flex-col gap-2">
                                    <Label><span class="text-red-500">*</span> Título:</Label>
                                    <v-text-field
                                        type="text"
                                        placeholder="Digite o título do produto"
                                        v-model="productName"
                                        density="compact"
                                        flat
                                        clearable
                                        hint="Digite o título do produto"
                                        variant="outlined"></v-text-field>
                                </div>
                                <div class="descr">
                                    <Label><span class="text-red-500">*</span> Descriçao:</Label>
                                    <Editor
                                        api-key="ssfrraviw37cj9z3wax894wog697jdzmxq9dist4pmo51054"
                                        :init="{
                                            toolbar_mode: 'sliding',
                                            plugins: 'charmap emoticons lists searchreplace table visualblocks wordcount',
                                            language: 'pt_PT',
                                            toolbar:
                                                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                        }"
                                        placeholder="Faça uma descrição do produto"
                                        v-model="productDescription" />
                                </div>
                            </div>
                        </div>
                        <div class="images flex flex-col gap-4">
                            <Label><span class="text-red-500">* </span>Adicione imagens do produto:</Label>
                            <!-- <v-file-input
                                @change="previewImages"
                                :clearable="false"
                                prepend-icon=""
                                density="compact"
                                multiple
                                :v-model="productImage"
                                label="Clique ou arraste as imagens para aqui"
                                variant="solo-filled"></v-file-input> -->

                            <div
                                v-if="productImage && productImage.length > 0"
                                class="flex flex-col gap-3">
                                <h3>Pré-visualização de Imagens</h3>

                                <div class="flex flex-row flex-wrap gap-2">
                                    <template
                                        v-for="(preview, index) in productImage"
                                        :key="index">
                                        <div class="flex flex-col gap-2 items-center">
                                            <img
                                                :src="preview.url"
                                                :alt="'Pré-visualização da Imagem ' + index"
                                                class="object-cover h-[45px] w-[45px] border-[2px]" />
                                            <button
                                                type="button"
                                                class="p-[2px] bg-red-500 rounded-md"
                                                @click="removeImage(index)">
                                                Remover
                                            </button>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>

                        <div class="espc">
                            <div class="flex flex-row gap-3">
                                <div class="flex flex-1 flex-col gap-2">
                                    <Label>Marca:</Label>
                                    <v-text-field
                                        type="text"
                                        hint="Qual é a marca do produto?"
                                        v-model="productBrand"
                                        placeholder="Qual é a marca do produto?"
                                        density="compact"
                                        flat
                                        clearable
                                        variant="outlined"></v-text-field>
                                </div>

                                <div class="flex flex-1 flex-col gap-2">
                                    <Label>Modelos:</Label>
                                    <v-text-field
                                        type="text"
                                        placeholder="Escreva o modelo do produto (opcional)"
                                        v-model="productModel"
                                        density="compact"
                                        flat
                                        clearable
                                        hint="Escreva o modelo do produto"
                                        variant="outlined"></v-text-field>
                                </div>
                            </div>
                            <div class="flex flex-col gap-2">
                                <Label>Tamanhos:</Label>
                                <v-text-field
                                    type="text"
                                    hint="Tamanhos"
                                    placeholder="Escrevas os tamanhos (opcional)"
                                    density="compact"
                                    v-model="productSize"
                                    flat
                                    clearable
                                    variant="outlined"></v-text-field>
                            </div>
                            <div class="flex flex-col gap-2">
                                <Label><span class="text-red-500">* </span>Fornecedor:</Label>
                                <v-text-field
                                    type="text "
                                    hint="Escreva o endereço do  fornecedor"
                                    placeholder="Endereço do  fornecedo"
                                    density="compact"
                                    v-model="productVendor"
                                    flat
                                    clearable
                                    variant="outlined"></v-text-field>
                            </div>
                        </div>
                    </div>
                    <div class="Left flex-1">
                        <div class="Pub-Cat">
                            <div class="flex flex-col gap-2">
                                <Label><span class="text-red-500">* </span>Publicar</Label>
                                <v-select
                                    clearable
                                    flat
                                    density="compact"
                                    variant="solo-filled"
                                    v-model="productAvailability"
                                    :items="availabilityStatus"
                                    item-title="statusName"
                                    item-value="statusValue"></v-select>
                            </div>
                            <div class="flex flex-col gap-2">
                                <Label><span class="text-red-500">* </span>Stock</Label>
                                <v-select
                                    clearable
                                    flat
                                    density="compact"
                                    variant="solo-filled"
                                    v-model="productStock"
                                    :items="stockStatus"
                                    item-title="stockStatus"
                                    item-value="stockValue"></v-select>
                            </div>
                            <div class="flex flex-col gap-2">
                                <Label>Categoria:</Label>

                                <Dialog>
                                    <DialogTrigger as-child>
                                        <Button
                                            variant="outline"
                                            class="w-max self-end">
                                            Criar categoria
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
                                        <DialogHeader class="p-6 pb-0">
                                            <DialogTitle>Criar categoria </DialogTitle>
                                            <DialogDescription> Aqui pode criar categoria, subCategoria da categoria e subCategoria da subCategoria! </DialogDescription>
                                        </DialogHeader>
                                        <div class="grid gap-4 py-4 overflow-y-auto px-6">
                                            <CreateCategoryVue />
                                        </div>
                                        <DialogFooter class="p-6 pt-0"> </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <div>
                                    <div>
                                        <p class="text-sm"><span class="text-red-500">* </span>Selecione a/as categoria/as</p>
                                        <v-select
                                            multiple
                                            clearabl
                                            flat
                                            density="compact"
                                            v-model="productCategory"
                                            variant="solo-filled"
                                            :items="categories"
                                            hint="Selecione a/as categoria/as"
                                            item-title="categoryName"
                                            item-value="_id"></v-select>
                                    </div>

                                    <div class="mb-4">
                                        <Label>Seleciona a SubCategoria</Label>
                                        <X
                                            v-if="productSubcategory.length > 0"
                                            @click="productSubcategory = ''"
                                            class="h-3.5 w-3.5 cursor-pointer" />

                                        <SelectRoot
                                            class="bg-black"
                                            v-model="productSubcategory">
                                            <SelectTrigger
                                                class="flex border bg-zinc-100 px-2 py-1 items-center justify-between w-full gap-[5px]"
                                                aria-label="Customise options">
                                                <SelectValue placeholder="" />
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
                                    </div>

                                    <div class="mb-4">
                                        <Label>Seleciona a Sub_categoria</Label>
                                        <X
                                            v-if="productSub_category.length > 0"
                                            @click="productSub_category = ''"
                                            class="h-3.5 w-3.5 cursor-pointer" />
                                        <SelectRoot
                                            class="bg-black"
                                            v-model="productSub_category">
                                            <SelectTrigger
                                                class="flex border bg-zinc-100 px-2 py-1 items-center justify-between w-full gap-[5px]"
                                                aria-label="Customise options">
                                                <SelectValue placeholder="" />
                                                <ChevronDown class="h-3.5 w-3.5" />
                                            </SelectTrigger>

                                            <SelectPortal>
                                                <SelectContent
                                                    class="bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-[100]"
                                                    :side-offset="5">
                                                    <SelectScrollUpButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                                                        <ChevronUp class="h-3.5 w-3.5" />
                                                    </SelectScrollUpButton>

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
                                                                    <div class="p-2 mb-1 border">
                                                                        <SelectLabel class="text-slate-500"> <span class="font-semibold">Cat:</span> {{ category.categoryName }}</SelectLabel>
                                                                        <hr />
                                                                        <template
                                                                            v-for="(subCategory, index) in category.subCategories"
                                                                            :key="index">
                                                                            <div class="p-2">
                                                                                <SelectLabel class="text-slate-500"> Sub {{ subCategory.subCategoryName }}</SelectLabel>
                                                                                <hr />
                                                                                <SelectGroup>
                                                                                    <SelectItem
                                                                                        v-for="(sub_category, subIndex) in subCategory.sub_categories"
                                                                                        :key="subIndex"
                                                                                        :value="sub_category._id"
                                                                                        class="p-2">
                                                                                        <SelectItemText class="cursor-pointer h-max"> {{ sub_category.sub_categoryName }}</SelectItemText>
                                                                                    </SelectItem>
                                                                                </SelectGroup>
                                                                            </div>
                                                                        </template>
                                                                    </div>
                                                                </template>
                                                            </SelectViewport>

                                                            <SelectScrollDownButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                                                                <ChevronDown class="h-3.5 w-3.5" />
                                                            </SelectScrollDownButton>
                                                        </SelectContent>
                                                    </SelectPortal>
                                                    <SelectScrollDownButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                                                        <ChevronDown class="h-3.5 w-3.5" />
                                                    </SelectScrollDownButton>
                                                </SelectContent>
                                            </SelectPortal>
                                        </SelectRoot>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2">
                            <Label><span class="text-red-500">* </span>Preço do produto:</Label>
                            <v-text-field
                                type="number"
                                placeholder="Qual é o preço"
                                hint="Qual é o preço?"
                                v-model="productPrice"
                                density="compact"
                                flat
                                clearable
                                variant="outlined"></v-text-field>
                        </div>
                        <div class="flex flex-col gap-2">
                            <Label>Preço promocional do produto:</Label>
                            <v-text-field
                                type="number"
                                placeholder="Qual é o preço promocional?"
                                hint="Qual é o preço promocional?"
                                v-model="productPromotion"
                                density="compact"
                                flat
                                clearable
                                variant="outlined"></v-text-field>
                        </div>
                        <div class="flex flex-col gap-2">
                            <Label><span class="text-red-500">* </span>Código/SKU:</Label>
                            <v-text-field
                                type="text"
                                hint="Codigo sku."
                                placeholder="Digite um códido para o produto"
                                v-model="sku"
                                density="compact"
                                flat
                                clearable
                                variant="outlined"></v-text-field>
                        </div>
                    </div>
                </div>
                <Button
                    type="submit"
                    class="mt-7"
                    >Submit</Button
                >
            </form>
        </div>
    </div>
</template>
<script setup>
    import { useStore } from "vuex";
    import { ref, onMounted, computed } from "vue";
    import Editor from "@tinymce/tinymce-vue";

    import { Label } from "@/components/ui/label";
    import CreateCategoryVue from "../_partials/CreateCategory.vue";
    import { Button } from "@/components/ui/button";
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

    import { ChevronDown, ChevronUp, X } from "lucide-vue-next";
    import {
        SelectContent,
        SelectGroup,
        SelectItem,
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

    const availabilityStatus = [
        { statusName: "Visível", statusValue: true },
        { statusName: "Oculto", statusValue: false },
    ];
    const stockStatus = [
        { stockStatus: "Com estoque", stockValue: true },
        { stockStatus: "Sem estoque", stockValue: false },
    ];

    // Declaração dos dados reativos
    const store = useStore();
    // Novo produto
    const productName = ref(undefined);
    const productDescription = ref(undefined);
    const productAvailability = ref(true);
    const productPrice = ref(0);
    const productStock = ref(true);
    const productImage = ref([]);
    const productCategory = ref([]);
    const productSubcategory = ref("");
    const productSub_category = ref("");
    const productPromotion = ref(0);
    const sku = ref(null);
    const productVendor = ref(undefined);
    const productModel = ref(undefined);
    const productSize = ref(undefined);
    const productBrand = ref(undefined);

    // Computação da lista de categorias
    const categories = computed(() => store.state.categories);

    // Função para pré-visualizar as imagens
    // function previewImages(event) {
    //     const files = event.target.files;
    //     for (let i = 0; i < files.length; i++) {
    //         const reader = new FileReader();

    //         reader.onload = (e) => {
    //             productImage.value.push({
    //                 url: e.target.result,
    //                 file: files[i],
    //             });
    //         };
    //         reader.readAsDataURL(files[i]);
    //     }
    // }

    // Função para remover uma imagem da pré-visualização
    function removeImage(index) {
        productImage.value.splice(index, 1);
    }
    async function addProduct() {
        if (
            !productName.value ||
            !productDescription.value ||
            !productAvailability.value ||
            !productPrice.value ||
            !productStock.value ||
            productCategory.value <= 0 ||
            !sku.value ||
            !productVendor.value
        ) {
            store.commit("updateSnackbar", { show: true, text: "Preencha todos os campos", color: "red" });
            return;
        }
        try {
            await store.dispatch("addProduct", {
                productName: productName.value,
                productDescription: productDescription.value,
                productAvailability: productAvailability.value,
                productPrice: productPrice.value,
                productStock: productStock.value,
                productImage: productImage.value,
                productCategory: productCategory.value,
                productSubcategory: productSubcategory.value,
                productSub_category: productSub_category.value,
                productPromotion: productPromotion.value,
                sku: sku.value,
                productVendor: productVendor.value,
                productSize: productSize.value,
                productModel: productModel.value,
                productBrand: productBrand.value,
            });
        } catch (error) {
            console.error(error);
        }
    }

    // Carregar categorias ao montar o componente
    onMounted(() => {
        store.dispatch("getAllCategoryAdmin");
    });
</script>
