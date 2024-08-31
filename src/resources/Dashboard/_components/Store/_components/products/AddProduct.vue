<template lang="">
    <div class="bottom-0 top-[4px] p-4 right-0 flex-1 w-full flex flex-col overflow-auto bg-white gap-2 flex-nowrap">
        <div>
            <h1 class="text-lg font-semibold">Informações Básicas</h1>
            <p class="text-xs indent-2">Preencha as informações abaixo</p>
        </div>

        <form
            @submit.prevent="submit"
            enctype="multipart/form-data">
            <div class="flex flex-col md:flex-row gap-8">
                <div class="Left flex-[2] flex flex-col gap-8 bg-blue-500 p-2 md:p-4 rounded-md">
                    <div class="TIT_Desc">
                        <div class="Tit-Des flex flex-col gap-4">
                            <!-- Title Product -->
                            <div class="input-field">
                                <Label><span class="text-red-500">*</span> Título do produto:</Label>
                                <el-input
                                    v-model="productName.value.value"
                                    :disabled="textAreaDisabled"
                                    autocomplete="off"
                                    type="text"
                                    placeholder="Título do produto"
                                    aria-label="Título do produto" />
                                <span class="error-message">{{ productName.errorMessage.value }}</span>
                            </div>

                            <!-- Description -->
                            <div class="input-field descr">
                                <Label><span class="text-red-500">*</span> Descriçao:</Label>
                                <el-input
                                    v-model="productDescription.value.value"
                                    :disabled="textAreaDisabled"
                                    style="width: 100%"
                                    :rows="5"
                                    autocomplete="off"
                                    type="textarea"
                                    placeholder="Descrição do produto!" />
                                <span class="error-message">{{ productDescription.errorMessage.value }}</span>
                                <!-- <Editor
                                        api-key="ssfrraviw37cj9z3wax894wog697jdzmxq9dist4pmo51054"
                                        :init="{
                                            toolbar_mode: 'sliding',
                                            plugins: 'charmap emoticons lists searchreplace table visualblocks wordcount',
                                            language: 'pt_PT',
                                            toolbar:
                                                'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                        }"
                                        placeholder="Faça uma descrição do produto"
                                        v-model="productDescription"
                                        value="productDescription" /> -->
                            </div>
                        </div>
                    </div>

                    <!-- ///////// images/////////// -->
                    <div class="input-field mb-3">
                        <label> Imagens:</label>
                        <el-upload
                            drag
                            v-model:file-list="fileList"
                            :auto-upload="false"
                            multiple
                            :disabled="textAreaDisabled"
                            accept="image/*"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview">
                            <el-icon class="el-icon--upload"><Plus /></el-icon>
                        </el-upload>
                        <el-dialog v-model="dialogVisible">
                            <img
                                width="100%"
                                :src="dialogImageUrl"
                                alt="Preview Image" />
                        </el-dialog>
                    </div>

                    <div
                        class="block h-max"
                        v-if="productImage && productImage.length > 0">
                        <label> Imagens EXISTENTES:</label>

                        <div class="flex gap-">
                            <div
                                @click="removeImage(index)"
                                class="m-1 relative"
                                v-for="(image, index) in productImage"
                                :key="index"
                                :closable="true">
                                <img
                                    class="w-20 h-20 object-cover"
                                    :src="image"
                                    alt="" />
                            </div>
                        </div>
                    </div>
                    <!-- //////////// -->

                    <div class="espc">
                        <div class="flex flex-col sm:flex-row sm:gap-2">
                            <!-- Brand -->
                            <div class="input-field">
                                <Label>Marca:</Label>
                                <el-input
                                    v-model="productBrand.value.value"
                                    :disabled="textAreaDisabled"
                                    autocomplete="off"
                                    type="text"
                                    placeholder="Marca do produto"
                                    aria-label="Marca do produto" />
                                <span class="error-message">{{ productBrand.errorMessage.value }}</span>
                            </div>

                            <!-- Model -->
                            <div class="input-field">
                                <Label>Model:</Label>
                                <el-input
                                    v-model="productModel.value.value"
                                    :disabled="textAreaDisabled"
                                    autocomplete="off"
                                    type="text"
                                    placeholder="Modelo do produto"
                                    aria-label="Modelo do produto" />
                                <span class="error-message">{{ productModel.errorMessage.value }}</span>
                            </div>
                            <!-- Weight -->
                            <div class="input-field">
                                <Label><span class="text-red-500">* </span>Peso:</Label>
                                <div>
                                    <el-input-number
                                        v-model="productWeight.value.value"
                                        :disabled="textAreaDisabled"
                                        autocomplete="off"
                                        placeholder="Peso do produto"
                                        aria-label="Peso do produto" />
                                </div>
                                <span class="error-message">{{ productWeight.errorMessage.value }}</span>
                            </div>
                        </div>

                        <div class="flex flex-col sm:flex-row sm:gap-2">
                            <!-- Length -->
                            <div class="input-field">
                                <Label>Comprimento:</Label>
                                <div>
                                    <el-input-number
                                        v-model="productLength.value.value"
                                        :disabled="textAreaDisabled"
                                        autocomplete="off"
                                        placeholder="Cumprimento do produto"
                                        aria-label="Cumprimento do produto" />
                                </div>
                                <span class="error-message">{{ productLength.errorMessage.value }}</span>
                            </div>

                            <!-- Width -->
                            <div class="input-field">
                                <Label>Largura:</Label>
                                <div>
                                    <el-input-number
                                        v-model="productWidth.value.value"
                                        :disabled="textAreaDisabled"
                                        autocomplete="off"
                                        placeholder="Largura do produto"
                                        aria-label="Largura do produto" />
                                </div>
                                <span class="error-message">{{ productWidth.errorMessage.value }}</span>
                            </div>

                            <!-- Height -->
                            <div class="input-field">
                                <Label>Altura:</Label>
                                <div>
                                    <el-input-number
                                        v-model="productHeight.value.value"
                                        :disabled="textAreaDisabled"
                                        autocomplete="off"
                                        placeholder="Altura do produto"
                                        aria-label="Altura do produto" />
                                </div>
                                <span class="error-message">{{ productHeight.errorMessage.value }}</span>
                            </div>
                        </div>

                        <!-- Vendor -->
                        <div class="input-field">
                            <Label><span class="text-red-500">* </span>Fornecedor:</Label>
                            <el-input
                                v-model="productVendor.value.value"
                                :disabled="textAreaDisabled"
                                autocomplete="off"
                                type="text"
                                placeholder="Endereço do  fornecedo" />
                            <span class="error-message">{{ productVendor.errorMessage.value }}</span>
                        </div>
                    </div>
                </div>

                <div class="Right flex-1 bg-blue-500 p-2 md:p-4 rounded-md">
                    <div class="Pub-Cat">
                        <!-- Available -->
                        <div class="input-field">
                            <Label><span class="text-red-500">* </span>Publicar</Label>
                            <el-select
                                v-model="productAvailability.value.value"
                                :value="true"
                                :disabled="textAreaDisabled"
                                filterable
                                placeholder="Selecione">
                                <el-option
                                    v-for="(item, index) in availabilityStatus"
                                    :key="index"
                                    :label="item.statusName"
                                    :value="item.statusValue" />
                            </el-select>
                            <span class="error-message">{{ productAvailability.errorMessage.value }}</span>
                        </div>

                        <!-- Stock -->
                        <div class="input-field">
                            <Label><span class="text-red-500">* </span>Stock</Label>
                            <el-select
                                v-model="productStock.value.value"
                                :disabled="textAreaDisabled"
                                filterable
                                clearable
                                :collapse-tags="true"
                                :collapse-tags-tooltip="true"
                                placeholder="Selecione">
                                <el-option
                                    v-for="(item, index) in stockStatus"
                                    :key="index"
                                    :label="item.stockStatus"
                                    :value="item.stockValue" />
                            </el-select>
                            <span class="error-message">{{ productStock.errorMessage.value }}</span>
                        </div>

                        <!-- Categories -->
                        <div>
                            <Label>Categoria:</Label>

                            <!-- Create Categories -->
                            <Dialog>
                                <DialogTrigger as-child>
                                    <el-button> Criar categoria </el-button>
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
                                <!-- Category -->
                                <div class="input-field">
                                    <Label class="text-sm"><span class="text-red-500">* </span>Selecione a/as categoria/as</Label>
                                    <el-select
                                        v-model="productCategory.value.value"
                                        :disabled="textAreaDisabled"
                                        filterable
                                        clearable
                                        multiple
                                        collapse-tags
                                        collapse-tags-tooltip
                                        placeholder="Selecione a categoria">
                                        <el-option
                                            v-for="(item, index) in categories"
                                            :key="index"
                                            :label="item.categoryName"
                                            :value="item._id" />
                                    </el-select>
                                    <span class="error-message">{{ productCategory.errorMessage.value }}</span>
                                </div>

                                <!-- SubCategory -->
                                <div class="mb-4">
                                    <Label>Seleciona a SubCategoria</Label>
                                    <el-select
                                        multiple
                                        filterable
                                        collapse-tags
                                        collapse-tags-tooltip
                                        clearable
                                        v-model="productSubcategory.value.value"
                                        :disabled="textAreaDisabled"
                                        placeholder="Selecione a SubCategoria">
                                        <el-option-group
                                            v-for="(category, index1) in categories"
                                            :key="index1"
                                            :label="category.categoryName"
                                            class="text-red-500 el-select-dropdown__group__wrap">
                                            <el-option
                                                v-for="(subCategory, index2) in category.subCategories"
                                                :key="index2"
                                                class="text-yellow-200 el-select-dropdown__item"
                                                :label="subCategory.subCategoryName"
                                                :value="subCategory._id" />
                                        </el-option-group>
                                    </el-select>
                                </div>

                                <!-- Sub_Category -->
                                <div class="mb-4">
                                    <Label>Seleciona a Sub_categoria</Label>

                                    <el-select
                                        multiple
                                        filterable
                                        collapse-tags
                                        collapse-tags-tooltip
                                        v-model="productSub_category.value.value"
                                        :disabled="textAreaDisabled"
                                        placeholder="Selecione a Sub_categoria">
                                        <el-option-group
                                            v-for="(category, index1) in categories"
                                            :key="index1">
                                            <span class="text-red-400 text-lg">{{ category.categoryName }}</span>
                                            <el-option-group
                                                v-for="(subCategory, index2) in category.subCategories"
                                                :key="index2">
                                                <span class="text-red-700 pl-1 text-sm">{{ subCategory.subCategoryName }}</span>
                                                <el-option
                                                    v-for="(sub_category, index3) in subCategory.sub_categories"
                                                    :key="index3"
                                                    :label="sub_category.sub_categoryName"
                                                    :value="sub_category._id" />
                                            </el-option-group>
                                        </el-option-group>
                                    </el-select>
                                    <span class="error-message">{{ productSub_category.errorMessage.value }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Price -->
                    <div class="input-field">
                        <Label><span class="text-red-500">* </span>Preço do produto:</Label>
                        <div>
                            <el-input-number
                                v-model="productPrice.value.value"
                                :disabled="textAreaDisabled"
                                autocomplete="off"
                                placeholder="Qual é o preço?"
                                aria-label="Qual é o preço?" />
                        </div>
                        <span class="error-message">{{ productPrice.errorMessage.value }}</span>
                    </div>

                    <!-- Promotional Price -->
                    <Label>Preço promocional do produto:</Label>
                    <div class="input-field">
                        <div>
                            <el-input-number
                                v-model="productPromotion.value.value"
                                :disabled="textAreaDisabled"
                                autocomplete="off"
                                placeholder="Qual é o preço promocional?"
                                aria-label="Qual é o preço promocional?" />
                        </div>
                        <span class="error-message">{{ productPromotion.errorMessage.value }}</span>
                    </div>

                    <!-- SKU code -->
                    <div class="input-field">
                        <Label><span class="text-red-500">* </span>Código/SKU:</Label>
                        <el-input
                            v-model="sku.value.value"
                            :disabled="textAreaDisabled"
                            autocomplete="off"
                            type="text"
                            placeholder="Digite um códido SKU para o produto"
                            aria-label="Digite um códido SKU para o produto" />
                        <span class="error-message">{{ sku.errorMessage.value }}</span>
                    </div>
                </div>
            </div>

            <!-- Bottons -->
            <div class="mt-2">
                <el-button
                    :loading="loadSubmitButton"
                    @click="
                        () => {
                            loadSubmitButton = true;
                            textAreaDisabled = true;
                            submit();
                        }
                    "
                    >Criar</el-button
                >
                <el-button
                    :loading="loadSubmitButton"
                    @click="
                        () => {
                            handleReset();
                        }
                    "
                    >Limpar</el-button
                >
            </div>
        </form>
    </div>
</template>
<script setup>
    import { useStore } from "vuex";
    import { useRoute } from "vue-router";
    import { ref, onMounted, computed, toRaw } from "vue";
    // import Editor from "@tinymce/tinymce-vue";
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    import { Label } from "@/components/ui/label";
    import CreateCategoryVue from "../_partials/CreateCategory.vue";

    const availabilityStatus = [
        { statusName: "Visível", statusValue: true },
        { statusName: "Oculto", statusValue: false },
    ];
    const stockStatus = [
        { stockStatus: "Com estoque", stockValue: true },
        { stockStatus: "Sem estoque", stockValue: false },
    ];

    const store = useStore();
    const route = useRoute();

    const categories = computed(() => store.state.categories);
    const productSeleted = route.params.productID;

    const textAreaDisabled = ref(false);
    const loadSubmitButton = ref(false);

    // Função para pré-visualizar as imagens

    import { Plus } from "@element-plus/icons-vue";
    const fileList = ref([]);
    const productImage = ref([]);

    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);

    const handlePictureCardPreview = (uploadFile) => {
        dialogImageUrl.value = uploadFile.url;
        dialogVisible.value = true;
    };

    function removeImage(index) {
        if (index > -1 && index < productImage.value.length) {
            productImage.value.splice(index, 1);
        }
    }
    // ///////////////
    const { handleSubmit, handleReset } = useForm({
        validationSchema: toTypedSchema(
            z.object({
                productName: z.string({ message: "Campo obrigatório" }),
                productDescription: z.string({ message: "Campo obrigatório" }),
                productAvailability: z.boolean({ message: "Campo obrigatório" }),
                productPrice: z.number({ message: "Campo obrigatório" }),
                productStock: z.boolean({ message: "Campo obrigatório" }),
                productCategory: z.string().array().min(1, { message: "Campo obrigatório" }),
                productSubcategory: z.string().array().optional(),
                productSub_category: z.string().array().optional(),
                productPromotion: z.number().optional(),
                sku: z.string({ message: "Campo obrigatório" }),
                productVendor: z.string({ message: "Campo obrigatório" }),
                productBrand: z.string().optional(),
                productWeight: z.number({ message: "Campo obrigatório" }),
                productModel: z.string().optional(),
                productLength: z.number().optional(),
                productWidth: z.number().optional(),
                productHeight: z.number().optional(),
            })
        ),
    });

    const productName = useField("productName");
    const productDescription = useField("productDescription");
    const productAvailability = useField("productAvailability");
    const productPrice = useField("productPrice");
    const productStock = useField("productStock");
    const productCategory = useField("productCategory");
    const productSubcategory = useField("productSubcategory");
    const productSub_category = useField("productSub_category");
    const productPromotion = useField("productPromotion");
    const sku = useField("sku");
    const productVendor = useField("productVendor");
    const productBrand = useField("productBrand");
    const productWeight = useField("productWeight");
    const productModel = useField("productModel");
    const productLength = useField("productLength");
    const productWidth = useField("productWidth");
    const productHeight = useField("productHeight");

    const submit = handleSubmit(
        async (values) => {
            if (Array.isArray(productImage.value) && productImage.value.length > 0) {
                values.productImage = toRaw(productImage.value);
            }

            const formData = new FormData();

            if (fileList.value && fileList.value.length > 0) {
                fileList.value.forEach((file) => {
                    formData.append("files", file.raw);
                });
            }

            for (const key in values) {
                if (Object.prototype.hasOwnProperty.call(values, key)) {
                    if (Array.isArray(values[key])) {
                        values[key].forEach((item) => {
                            if (item !== undefined && item !== null) {
                                formData.append(`${key}[]`, item);
                            }
                        });
                    } else {
                        if (values[key] !== undefined && values[key] !== null) {
                            formData.append(key, values[key]);
                        }
                    }
                }
            }

            if (productSeleted) {
                await store.dispatch("updateProduct", { productSeleted, formData });
            } else {
                let result;
                result = await store.dispatch("addProduct", formData);
                if (result === true) {
                    handleReset();
                }
            }

            loadSubmitButton.value = false;
            textAreaDisabled.value = false;
        },
        () => {
            loadSubmitButton.value = false;
            textAreaDisabled.value = false;
        }
    );

    onMounted(async () => {
        loadSubmitButton.value = true;
        textAreaDisabled.value = true;
        store.dispatch("getAllCategoryAdmin");

        if (productSeleted) {
            await store.dispatch("detailsProductAdmin", productSeleted);
            const productData = store.state.product;

            productName.value.value = productData.productName;
            productDescription.value.value = productData.productDescription;
            productAvailability.value.value = productData.productAvailability;
            productPrice.value.value = productData.productPrice;
            productStock.value.value = productData.productStock;
            productImage.value = productData.productImage;
            productCategory.value.value = productData.productCategory;
            productSubcategory.value.value = productData.productSubcategory;
            productSub_category.value.value = productData.productSub_category;
            productPromotion.value.value = productData.productPromotion;
            sku.value.value = productData.sku;
            productVendor.value.value = productData.productVendor;
            productModel.value.value = productData.productModel;
            productBrand.value.value = productData.productBrand;
            productWeight.value.value = productData.productWeight;
            productLength.value.value = productData.productLength;
            productWidth.value.value = productData.productWidth;
            productHeight.value.value = productData.productHeight;
        }
        loadSubmitButton.value = false;
        textAreaDisabled.value = false;
    });
</script>
<style scoped>
    .input-field {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 100%;
        margin: 5px 0;
    }

    .input-field input {
        width: 100%;
        border: none;
        font-size: 13px;
        border-radius: 8px;
        width: 100%;
        outline: none;
    }
    .v-input__control {
        background-color: white;
        border-radius: 4px;
    }
    .error-message {
        margin: 5px 0 0 0;
        padding: 0 0 0 10px;
        width: 100%;
        height: 15px;
        font-size: x-small;
        line-height: 13px;
        color: red;
        display: flex;
        align-items: center;
    }
</style>
