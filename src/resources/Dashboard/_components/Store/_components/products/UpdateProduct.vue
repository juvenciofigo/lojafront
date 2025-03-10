<template lang="">
    <div class="absolute bottom-0 top-[4px] p-4 right-0 flex-1 w-full flex flex-col overflow-auto bg-white gap-2 flex-nowrap">
        <div>
            <h1 class="text-lg font-semibold">Informações Básicas</h1>
            <p class="indent-2">Preencha as informações abaixo</p>
        </div>
        <div>
            <form
                id="formm"
                @submit.prevent="updateProduct($event)"
                enctype="multipart/form-data">
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
                            <v-file-input
                                @change="previewImages"
                                :clearable="false"
                                prepend-icon=""
                                density="compact"
                                multiple
                                ref="files"
                                :v-model="productImage"
                                name="productImage"
                                label="Clique ou arraste as imagens para aqui"
                                variant="solo-filled">
                            </v-file-input>

                            <div
                                v-if="productImage && productImage.length > 0"
                                class="flex flex-col gap-3">
                                <h3>Pré-visualização de Imagens</h3>

                                <div class="flex flex-row flex-wrap gap-2">
                                    <template
                                        v-for="(preview, index) in productImage"
                                        :key="index">
                                        <div class="flex flex-col gap-2 items-center">
                                            <!-- <img :src="preview" :alt="'Pré-visualização da Imagem ' + index" class="object-cover h-[60px] w-[60px] border-[2px]" /> -->

                                            <img
                                                :src="preview"
                                                :alt="'Pré-visualização da Imagem ' + index"
                                                class="object-cover h-[45px] w-[45px] border-[2px]" />
                                            <el-button
                                                class="p-[2px] bg-red-500 rounded-md"
                                                @click="removeImage(index)">
                                                Remover
                                            </el-button>
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
                                    <div class="flex justify-end">
                                        <DialogTrigger as-child>
                                            <Button
                                                class="w-max"
                                                variant="outline"
                                                >Nova categoria</Button
                                            >
                                        </DialogTrigger>
                                    </div>

                                    <DialogContent class="max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Nova categoria</DialogTitle>
                                        </DialogHeader>
                                        <div class="grid gap-4 py-4">
                                            <div class="flex flex-col gap-2">
                                                <Label for="categoria">Categoria:</Label>
                                                <v-text-field
                                                    type="text"
                                                    placeholder="Digite o nome da categoria"
                                                    v-model="newCategoryName"
                                                    id="categoria"
                                                    density="compact"
                                                    flat
                                                    clearable
                                                    variant="outlined"></v-text-field>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogTrigger as-child>
                                                <el-button
                                                    @click="createCategory"
                                                    class="w-max"
                                                    variant="outline"
                                                    >Criar</el-button
                                                >
                                            </DialogTrigger>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <p class="text-sm"><span class="text-red-500">* </span>Selecione a/as categoria/as</p>
                                <v-select
                                    multiple
                                    clearabl
                                    flat
                                    density="compact"
                                    v-model="productCategory"
                                    :v-model-value="productCategory"
                                    variant="solo-filled"
                                    :items="categories"
                                    hint="Selecione a/as categoria/as"
                                    item-title="categoryName"
                                    item-value="_id"></v-select>
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
    import { useRoute } from "vue-router";
    import { Button } from "@/components/ui/button";

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
    const route = useRoute();
    const newCategoryName = ref(undefined);
    // Novo produto
    const productName = ref("");
    const productDescription = ref("");
    const productAvailability = ref(true);
    const productPrice = ref(0);
    const productStock = ref(true);
    const productImage = ref([]);
    const productCategory = ref([]);
    const productPromotion = ref(0);
    const sku = ref(null);
    const productVendor = ref("");
    const productModel = ref("");
    const productSize = ref("");
    const productBrand = ref("");

    const imagens = ref([]);

    // Computação da lista de categorias
    const categories = computed(() => store.state.categories);

    // Função para pré-visualizar as imagens
    function previewImages(event) {
        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();

            reader.onload = (e) => {
                productImage.value.push(e.target.result);
            };
            reader.readAsDataURL(files[i]);
        }

        if (!files) return; // Verifica se um arquivo foi selecionado
        for (let i = 0; i < files.length; i++) {
            imagens.value.push(files[i]);
        }
    }

    // Função para remover uma imagem da pré-visualização
    function removeImage(index) {
        productImage.value.splice(index, 1);
    }

    // Função para criar uma nova categoria
    async function createCategory() {
        if (!newCategoryName.value) {
            store.commit("updateSnackbar", { text: "Preencha o campo o nome da categoria", snackbarType: "warning" });
            return;
        }
        await store.dispatch("createCategory", newCategoryName.value);
        store.dispatch("getAllCategory");
    }

    async function updateProduct() {
        if (
            !productName.value ||
            !productDescription.value ||
            !productAvailability.value ||
            !productPrice.value ||
            !productStock.value ||
            !productCategory.value ||
            productCategory.value.length === 0 ||
            !sku.value ||
            !productVendor.value
        ) {
            store.commit("updateSnackbar", { text: "Preencha todos os campos", snackbarType: "warning" });
            return;
        }
        try {
            const formData = new FormData();
            for (let i = 0; i < imagens.value.length; i++) {
                formData.append("files", imagens.value[i]);
            }
            // await store.dispatch("updateImage", { productId: route.params.id, formData }); //// problermas

            await store.dispatch("updateProduct", {
                productId: route.params.id,
                updatedProductData: {
                    productName: productName.value,
                    productDescription: productDescription.value,
                    productAvailability: productAvailability.value,
                    productPrice: productPrice.value,
                    productStock: productStock.value,
                    productCategory: productCategory.value,
                    productPromotion: productPromotion.value,
                    sku: sku.value,
                    productVendor: productVendor.value,
                    productSize: productSize.value,
                    productModel: productModel.value,
                    productBrand: productBrand.value,
                },
            });
        } catch (error) {
            console.error(error);
        }
    }

    // Obter os detalhes do produto do store ao montar o componente
    onMounted(async () => {
        await store.dispatch("detailsProductAdmin", route.params.id);
        const productData = store.state.product;
        if (productData) {
            productName.value = productData.productName;
            productDescription.value = productData.productDescription;
            productAvailability.value = productData.productAvailability;
            productPrice.value = productData.productPrice;
            productStock.value = productData.productStock;
            productImage.value = productData.productImage;
            productCategory.value = productData.productCategory;
            productPromotion.value = productData.productPromotion;
            sku.value = productData.sku;
            productVendor.value = productData.productVendor;
            productModel.value = productData.productModel;
            productSize.value = productData.productSize;
            productBrand.value = productData.productBrand;
        }
    });
    // Carregar categorias ao montar o componente
    onMounted(() => {
        store.dispatch("getAllCategory");
    });
</script>
