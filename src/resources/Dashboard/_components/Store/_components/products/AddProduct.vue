<template lang="">
    <div class="addProduct flex-1 w-full flex flex-col gap-2 flex-nowrap">
        <div class="bg-foreground_2 px-2 h-[40px]">
            <h1 class="text-base font-semibold">Informações Básicas</h1>
            <p class="indent-2">Preencha as informações abaixo</p>
        </div>

        <form
            v-loading="textAreaDisabled"
            @submit.prevent="submit"
            enctype="multipart/form-data">
            <div class="flex flex-col flex-wrap md:flex-row gap-2 overflow-hidden">
                <div class="Left flex-[2] flex flex-col flex-wrap gap-8 bg-foreground_2 p-2 md:p-4">
                    <div class="TIT_Desc">
                        <div class="Tit-Des flex flex-col gap-4">
                            <!-- Title Product -->
                            <div class="input-field">
                                <Label><span class="text-red-500">*</span> Título do produto:</Label>
                                <el-input
                                    :autofocus="true"
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
                                <div class="bg-details text-text_2">
                                    <!-- :disable="true" -->
                                    <QuillEditor
                                        v-model:content="productDescription.value.value"
                                        contentType="html"
                                        :options="editorOptions" />
                                </div>

                                <span class="error-message">{{ productDescription.errorMessage.value }}</span>
                            </div>
                            
                            <!-- Especificacao -->
                            <div class="input-field descr">
                                <Label><span class="text-red-500">*</span> Especificações:</Label>
                                <div class="bg-details text-text_2">
                                    <!-- :disable="true" -->
                                    <QuillEditor
                                        v-model:content="productSpecifications.value.value"
                                        contentType="html"
                                        :options="editorOptions" />
                                </div>

                                <span class="error-message">{{ productSpecifications.errorMessage.value }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- ///////// images/////////// -->
                    <div class="input-field mb-3 p-2">
                        <Label> Imagens:</Label>

                        <div class="bg-details">
                            <el-upload
                                drag
                                v-model:file-list="fileList"
                                :before-upload="handleBeforeUpload"
                                :auto-upload="false"
                                multiple
                                :disabled="textAreaDisabled"
                                accept="image/*"
                                list-type="picture-card">
                                <template #file="{ file }">
                                    <div class="flex items-center relative">
                                        <el-image
                                            style="width: 100%; height: 100%"
                                            :src="file.url"
                                            fit="fill" />
                                        <div class="absolute bottom-1 flex gap-[2px]">
                                            <el-button
                                                circle
                                                :icon="Back"
                                                size="small"
                                                @click="moveUp(getFileIndex(file))"
                                                :disabled="getFileIndex(file) === 0" />
                                            <el-button
                                                plain
                                                circle
                                                :icon="FullScreen"
                                                size="small"
                                                @click="handlePictureCardPreview(file)" />
                                            <el-button
                                                circle
                                                :icon="Delete"
                                                size="small"
                                                @click="removeFile(getFileIndex(file))" />
                                            <el-button
                                                circle
                                                :icon="Right"
                                                size="small"
                                                @click="moveDown(getFileIndex(file))"
                                                :disabled="getFileIndex(file) === fileList.length - 1" />
                                        </div>
                                    </div>
                                </template>
                                <el-icon class="el-icon--upload"><Plus /></el-icon>
                            </el-upload>
                            <el-dialog v-model="dialogVisible">
                                <el-image
                                    style="width: 100%"
                                    :src="dialogImageUrl"
                                    fit="fill" />
                            </el-dialog>
                        </div>

                        <div
                            class="block h-max mt-5"
                            v-if="productImage && productImage.length > 0">
                            <label> Imagens EXISTENTES:</label>
                            <div class="flex gap-1">
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
                    </div>
                    <!-- //////////// -->

                    <div class="espc">
                        <div class="flex flex-col sm:flex-row sm:gap-2">
                            <!-- Brand -->
                            <div class="input-field">
                                <Label>Marca:</Label>
                                <el-select
                                    v-model="productBrand.value.value"
                                    filterable
                                    clearable
                                    default-first-option
                                    placeholder="Selecione ou crie marcas">
                                    <el-option
                                        v-for="brand in brandOptions"
                                        :key="brand._id"
                                        :label="brand.name"
                                        :value="brand._id" />
                                </el-select>
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
                                        :controls="false"
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
                                        :controls="false"
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
                                        :controls="false"
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
                                        :controls="false"
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

                <div class="Right flex-1 bg-foreground_2 p-2 md:p-4">
                    <div class="Pub-Cat">
                        <div class="flex flex-row">
                            <!-- Available -->
                            <div class="input-field">
                                <Label><span class="text-red-500">* </span>Publicar</Label>
                                <el-checkbox
                                    v-model="productAvailability.value.value"
                                    label="Visível"
                                    checked />
                                <span class="error-message">{{ productAvailability.errorMessage.value }}</span>
                            </div>
                            <!-- Stock -->
                            <div class="input-field">
                                <Label><span class="text-red-500">* </span>Stock</Label>
                                <el-checkbox
                                    v-model="productStock.value.value"
                                    label="Com estoque"
                                    checked />
                                <span class="error-message">{{ productStock.errorMessage.value }}</span>
                            </div>
                        </div>

                        <!-- Delivery Estimate Time -->
                        <div class="input-field">
                            <Label>Estimativa de entrega</Label>
                            <el-form :model="form">
                                <div
                                    v-for="(item, index) in form.deliveryEstimate"
                                    :key="index"
                                    class="flex items-center gap-2 mb-2">
                                    <el-select
                                        size="small"
                                        v-model="item.estimatedTime"
                                        placeholder="Tempo de entrega"
                                        style="width: 150px">
                                        <el-option
                                            label="Imediata"
                                            value="Imediata" />
                                        <el-option
                                            label="7 dias"
                                            value="7 dias" />
                                        <el-option
                                            label="30 dias"
                                            value="30 dias" />
                                    </el-select>

                                    <el-input-number
                                        :controls="false"
                                        size="small"
                                        v-model="item.additionalCost"
                                        :min="0"
                                        :step="10"
                                        placeholder="Custo adicional"
                                        style="width: 100px" />

                                    <el-button
                                        size="small"
                                        type="danger"
                                        :icon="Delete"
                                        circle
                                        @click="removeEstimate(index)" />
                                </div>

                                <el-button
                                    size="small"
                                    type="primary"
                                    @click="addEstimate">
                                    <el-icon><Plus /></el-icon> Adicionar Estimativa
                                </el-button>
                            </el-form>
                            <span class="error-message">{{ productAvailability.errorMessage.value }}</span>
                        </div>
                        <!-- Fim Delivery Estimate Time -->

                        <!-- Categories -->
                        <div class="">
                            <Label>Categoria:</Label>

                            <!-- Create Categories -->
                            <el-button
                                @click="createCategoreDiag = true"
                                size="small">
                                Criar categoria
                            </el-button>
                            <el-dialog v-model="createCategoreDiag">
                                <CreateCategoryVue />
                            </el-dialog>

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
                                :controls="false"
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
                                :controls="false"
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
                    size="small"
                    :loading="loadSubmitButton"
                    @click="
                        () => {
                            loadSubmitButton = true;
                            textAreaDisabled = true;
                            submit();
                        }
                    "
                    >{{ productSeleted ? "Atualizar" : "Criar" }}</el-button
                >
                <el-button
                    size="small"
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
    import { ref, onBeforeMount, computed, toRaw } from "vue";
    import CreateCategoryVue from "../_partials/CreateCategory.vue";

    import { QuillEditor } from "@vueup/vue-quill";
    import "@vueup/vue-quill/dist/vue-quill.snow.css"; // Estilo do editor

    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    import { Back, Right, Delete, Plus, FullScreen } from "@element-plus/icons-vue";
    import { Label } from "@/components/ui/label";

    const store = useStore();
    const route = useRoute();

    const categories = computed(() => store.state.categories.categories);
    const productSeleted = route.params.id;

    const textAreaDisabled = ref(false);
    const loadSubmitButton = ref(false);
    const createCategoreDiag = ref(false);

    const brandOptions = computed(() => store.state.products.brands);

    const editorOptions = {
        placeholder: "Descrição do produto...",
        modules: {
            toolbar: [
                ["bold", "italic", "underline"], // Formatação básica
                [{ header: [1, 2, 3, false] }], // Títulos
                ["blockquote", "code-block"], // Blocos
                [{ list: "ordered" }, { list: "bullet" }, { list: "check" }], // Listas
                ["link", "image"], // Mídia
            ],
        },
        theme: "snow",
    };

    // Estimative Delivery

    const form = ref({
        deliveryEstimate: [],
    });

    const addEstimate = () => {
        form.value.deliveryEstimate.push({ estimatedTime: "", additionalCost: 0 });
    };

    const removeEstimate = (index) => {
        form.value.deliveryEstimate.splice(index, 1);
    };

    // ///////////

    // Função para pré-visualizar as imagens

    const productImage = ref([]);

    const fileList = ref([]);
    function moveUp(index) {
        if (index > 0) {
            const temp = fileList.value[index];
            fileList.value[index] = fileList.value[index - 1];
            fileList.value[index - 1] = temp;
        }
    }

    function moveDown(index) {
        if (index < fileList.value.length - 1) {
            const temp = fileList.value[index];
            fileList.value[index] = fileList.value[index + 1];
            fileList.value[index + 1] = temp;
        }
    }

    function handleBeforeUpload(file) {
        fileList.value.push(file);
        return false;
    }

    const handlePictureCardPreview = (uploadFile) => {
        dialogImageUrl.value = uploadFile.url;
        dialogVisible.value = true;
    };

    function removeFile(index) {
        fileList.value.splice(index, 1);
    }

    function getFileIndex(file) {
        return fileList.value.findIndex((f) => f.uid === file.uid);
    }
    // //////////////

    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);

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
                productSpecifications: z.string().optional(),
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

    const productName = useField("productName"),
        productAvailability = useField("productAvailability"),
        productStock = useField("productStock"),
        productDescription = useField("productDescription"),
        productSpecifications = useField("productSpecifications"),
        productPrice = useField("productPrice"),
        productCategory = useField("productCategory"),
        productSubcategory = useField("productSubcategory"),
        productSub_category = useField("productSub_category"),
        productPromotion = useField("productPromotion"),
        sku = useField("sku"),
        productVendor = useField("productVendor"),
        productBrand = useField("productBrand"),
        productWeight = useField("productWeight"),
        productModel = useField("productModel"),
        productLength = useField("productLength"),
        productWidth = useField("productWidth"),
        productHeight = useField("productHeight");

    const submit = handleSubmit(
        async (values) => {
            // Garante que deliveryEstimate seja um array puro (sem reatividade)
            values = { ...values, deliveryEstimate: toRaw(form.value.deliveryEstimate) };

            // Garante também que as imagens sejam valores puros
            if (Array.isArray(productImage.value) && productImage.value.length > 0) {
                values.productImage = toRaw(productImage.value);
            }

            const formData = new FormData();

            // Anexa as imagens (arquivos) ao FormData
            if (fileList.value && fileList.value.length > 0) {
                fileList.value.forEach((file) => {
                    formData.append("files", file.raw);
                });
            }

            // Adiciona os outros dados ao FormData
            for (const key in values) {
                if (Object.prototype.hasOwnProperty.call(values, key)) {
                    if (key === "deliveryEstimate" && Array.isArray(values[key])) {
                        values[key].forEach((item, index) => {
                            for (const prop in item) {
                                if (item[prop] !== undefined && item[prop] !== null) {
                                    formData.append(`deliveryEstimate[${index}][${prop}]`, item[prop]);
                                }
                            }
                        });
                    } else if (Array.isArray(values[key])) {
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

            const result = ref(null);

            if (productSeleted) {
                await store.dispatch("products/updateProduct", { productSeleted, formData });
            } else {
                result.value = await store.dispatch("products/addProduct", formData);
            }

            loadSubmitButton.value = false;
            textAreaDisabled.value = false;
        },
        () => {
            loadSubmitButton.value = false;
            textAreaDisabled.value = false;
        }
    );

    onBeforeMount(async () => {
        loadSubmitButton.value = true;
        textAreaDisabled.value = true;
        await store.dispatch("categories/fetchCategoriesAdmin");
        await store.dispatch("products/fetchBrands");

        if (productSeleted) {
            await store.dispatch("products/fetchProductByIdAdmin", productSeleted);
            const product = computed(() => store.state.products.product).value;

            form.value.deliveryEstimate = product?.deliveryEstimate;
            productName.value.value = product?.productName;
            productDescription.value.value = product?.productDescription;
            productSpecifications.value.value = product?.productSpecifications;
            productAvailability.value.value = product?.productAvailability;
            productPrice.value.value = product?.productPrice;
            productStock.value.value = product?.productStock;
            productImage.value = product?.productImage;
            productCategory.value.value = product?.productCategory;
            productSubcategory.value.value = product?.productSubcategory;
            productSub_category.value.value = product?.productSub_category;
            productPromotion.value.value = product?.productPromotion;
            sku.value.value = product?.sku;
            productVendor.value.value = product?.productVendor;
            productModel.value.value = product?.productModel;
            productBrand.value.value = product?.productBrand?._id;
            productWeight.value.value = product?.productWeight;
            productLength.value.value = product?.productLength;
            productWidth.value.value = product?.productWidth;
            productHeight.value.value = product?.productHeight;
        }
        loadSubmitButton.value = false;
        textAreaDisabled.value = false;
    });
</script>
<style>
    .ql-container.ql-snow {
        border: 1px solid var(--details_2) !important;
    }
    .ql-toolbar.ql-snow {
        border: 1px solid var(--details_2) !important;
        padding: 4px !important;
    }
    .ql-snow .ql-stroke {
        stroke: var(--text_2) !important;
    }
    .ql-snow .ql-picker {
        color: var(--text_2) !important;
    }

    .addProduct .el-dialog {
        --el-dialog-bg-color: var(--foreground_2) !important;
    }
</style>
