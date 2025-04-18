<template>
    <div class="bg-white shadow-md rounded p-6 flex flex-col">
        <div class="rounded-md self-center p-2 border-2 border-slate-600 flex flex-col gap-2 items-center">
            <div class="w-24 h-24">
                <v-img
                    v-if="product.productImage && product.productImage.length > 0"
                    :src="product.productImage[0]"></v-img>
            </div>
            <div class="text-center">
                <p class="font-semibold text-slate-500">{{ product.productName }}</p>
                <p class="font-semibold text-slate-500 text-sm">{{ formatCurrency(product.productPrice) }}</p>
            </div>
        </div>
        <form enctype="multipart/form-data">
            <!-- ////////////Type//////////// -->
            <div class="input-field">
                <label><span class="text-red-500">*</span> Tipo da Variação:</label>
                <el-select
                    v-model="variationType.value.value"
                    :disabled="textAreaDisabled"
                    filterable
                    placeholder="Selecione">
                    <el-option
                        v-for="(item, index) in options"
                        :key="index"
                        :label="item"
                        :value="item" />
                </el-select>
                <span class="error-message">{{ variationType.errorMessage.value }}</span>
            </div>
            <!-- ///////////Value/////////// -->
            <div class="input-field">
                <label><span class="text-red-500">*</span> Valor da Variação:</label>
                <el-input
                    v-model="variationValue.value.value"
                    :disabled="textAreaDisabled"
                    autocomplete="off"
                    type="text"
                    placeholder="Valor da Variação"
                    aria-label="Valor da Variação" />
                <span class="error-message">{{ variationValue.errorMessage.value }}</span>
            </div>
            <!-- /////////////SKU//////////// -->
            <div class="input-field">
                <label><span class="text-red-500">*</span> SKU:</label>
                <el-input
                    v-model="sku.value.value"
                    :disabled="textAreaDisabled"
                    autocomplete="off"
                    type="text"
                    placeholder="SKU"
                    aria-label="SKU" />
                <span class="error-message">{{ sku.errorMessage.value }}</span>
            </div>
            <!-- ///////////Price//////////// -->
            <div class="input-field">
                <label> Preço da Variação:</label>
                <el-input-number
                    :controls="false"
                    v-model="variationPrice.value.value"
                    :disabled="textAreaDisabled"
                    autocomplete="off"
                    type="number"
                    placeholder="Preço da Variação"
                    aria-label="Preço da Variação" />
                <span class="error-message">{{ variationPrice.errorMessage.value }}</span>
            </div>
            <!-- ///////////Promotion Price/////////////// -->
            <div class="input-field">
                <label> Promoção da Variação:</label>
                <el-input-number
                    :controls="false"
                    v-model="variationPromotion.value.value"
                    :disabled="textAreaDisabled"
                    autocomplete="off"
                    placeholder="Preço da Promoção"
                    aria-label="Preço da Promoção" />
                <span class="error-message">{{ variationPromotion.errorMessage.value }}</span>
            </div>
            <!-- ///////// images/////////// -->

            <div class="input-field mb-3">
                <label> Imagens:</label>
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
                                    @click="handlePictureCardPreview(file)"
                                    :disabled="getFileIndex(file) === fileList.length - 1" />
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
                v-if="selectedVariation && variationImage && variationImage.length > 0">
                <label> Imagens EXISTENTES:</label>

                <div
                    class="flex gap-"
                    v-if="variationImage && variationImage.length > 0">
                    <div
                        @click="removeImage(index)"
                        class="m-1 relative"
                        v-for="(image, index) in variationImage"
                        :key="index"
                        :closable="true">
                        <img
                            class="w-20 h-20 object-cover"
                            :src="image"
                            alt="" />
                    </div>
                </div>
            </div>
            <!-- /////////////////////////// -->
            <div class="mb-4">
                <h2 class="block text-gray-700 text-sm font-bold mb-2">Detalhes de Entrega:</h2>
                <div class="mb-2">
                    <h3 class="block text-gray-700 text-sm font-bold mb-1">Dimensões (cm):</h3>
                    <div class="flex items-center">
                        <!-- /////////Height/////////////// -->
                        <div class="input-field">
                            <label> Altura:</label>
                            <el-input-number
                                :controls="false"
                                v-model="heightCm.value.value"
                                :disabled="textAreaDisabled"
                                autocomplete="off"
                                placeholder="Altura"
                                aria-label="Altura" />
                            <span class="error-message">{{ heightCm.errorMessage.value }}</span>
                        </div>
                        <!-- /////////Width/////////////// -->
                        <div class="input-field">
                            <label> Largura:</label>
                            <el-input-number
                                :controls="false"
                                v-model="widthCm.value.value"
                                :disabled="textAreaDisabled"
                                autocomplete="off"
                                placeholder="Largura"
                                aria-label="Largura" />
                            <span class="error-message">{{ widthCm.errorMessage.value }}</span>
                        </div>
                        <!-- /////////////////////// -->
                        <div class="input-field">
                            <label> Comprimento:</label>
                            <el-input-number
                                :controls="false"
                                v-model="depthCm.value.value"
                                :disabled="textAreaDisabled"
                                autocomplete="off"
                                placeholder="Comprimento"
                                aria-label="Comprimento" />
                            <span class="error-message">{{ depthCm.errorMessage.value }}</span>
                        </div>
                        <!-- ///////////////// -->
                    </div>
                </div>
                <div class="input-field">
                    <label> Peso (g):</label>
                    <el-input-number
                        :controls="false"
                        v-model="weight.value.value"
                        :disabled="textAreaDisabled"
                        autocomplete="off"
                        placeholder="Peso (g)"
                        aria-label="Peso (g)" />
                    <span class="error-message">{{ weight.errorMessage.value }}</span>
                </div>
                <!-- /////////////// -->
                <el-checkbox
                    v-model="variationStock"
                    label="Disponível"
                    checked
                    size="large" />
                <!-- ///////////////// -->
                <el-checkbox
                    v-model="shippingFree"
                    label="Frete Grátis"
                    checked
                    size="large" />
                <!-- ///////////////// -->
            </div>
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
                    ">
                    <span v-if="selectedVariation">Modificar</span>
                    <span v-else>Criar Variação</span>
                </el-button>
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
    import { ref, computed, onBeforeMount } from "vue";
    import { useRoute } from "vue-router";
    import { useStore } from "vuex";
    import { formatCurrency } from "@/util/functions";

    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";
    import { Back, Right, Delete, Plus, FullScreen } from "@element-plus/icons-vue";

    const route = useRoute();
    const store = useStore();
    const product = computed(() => store.state.products.product);
    const selectedVariation = route.params.variation;

    const loadSubmitButton = ref(true);
    const textAreaDisabled = ref(true);
    const options = [`Modelo`, `Cor`, `Tamanho`, `Material`];

    ////////image/////////
    const variationImage = ref([]);

    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);

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

    function removeImage(index) {
        if (index > -1 && index < variationImage.value.length) {
            variationImage.value.splice(index, 1);
        }
    }

    const { handleSubmit, handleReset } = useForm({
        validationSchema: toTypedSchema(
            z.object({
                variationType: z.string({ message: "Campo obrigatório" }),
                variationValue: z.string({ message: "Campo obrigatório" }),
                sku: z.string({ message: "Campo obrigatório" }),
                variationPrice: z.preprocess((val) => Number(val) || 0, z.number().optional()),
                variationPromotion: z.preprocess((val) => Number(val) || 0, z.number().optional()),
                heightCm: z.preprocess((val) => Number(val) || 0, z.number().optional()),
                widthCm: z.preprocess((val) => Number(val) || 0, z.number().optional()),
                depthCm: z.preprocess((val) => Number(val) || 0, z.number().optional()),
                weight: z.preprocess((val) => Number(val) || 0, z.number().optional()),
            })
        ),
    });

    const variationType = useField("variationType");
    const variationValue = useField("variationValue");
    const sku = useField("sku");
    const variationPrice = useField("variationPrice");
    const variationPromotion = useField("variationPromotion");
    const heightCm = useField("heightCm");
    const widthCm = useField("widthCm");
    const depthCm = useField("depthCm");
    const weight = useField("weight");
    const shippingFree = ref(true);
    const variationStock = ref(true);

    const submit = handleSubmit(
        async (values) => {
            let response = null;
            const formData = new FormData();

            if (fileList.value && fileList.value.length > 0) {
                fileList.value.forEach((file) => {
                    formData.append("files", file.raw);
                });
            }

            const variation = {
                variationImage: variationImage.value,
                variationType: values.variationType,
                variationValue: values.variationValue,
                sku: values.sku,
                variationPrice: values.variationPrice,
                variationPromotion: values.variationPromotion,
                heightCm: values.heightCm,
                widthCm: values.widthCm,
                depthCm: values.depthCm,
                weight: values.weight,
                variationStock: variationStock.value,
                shippingFree: shippingFree.value,
            };

            for (const key in variation) {
                if (Object.prototype.hasOwnProperty.call(variation, key)) {
                    if (Array.isArray(variation[key])) {
                        variation[key].forEach((item) => {
                            formData.append(`${key}[]`, item);
                        });
                    } else {
                        formData.append(key, variation[key]);
                    }
                }
            }

            if (selectedVariation) {
                response = await store.dispatch("products/updateVariation", { id: route.params.variation, formData });
            } else {
                response = await store.dispatch("products/addVariation", { product: route.params.id, formData });
            }

            if (response === true) {
                // handleReset();
                fileList.value = [];
                variationImage.value = [];
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
        await store.dispatch("products/fetchProductByIdAdmin", route.params.id);

        if (selectedVariation) {
            const res = await store.dispatch("products/detailsVariation", { variation: selectedVariation, product: route.params.id });

            variationType.value.value = res.variationType;
            variationValue.value.value = res.variationValue;
            sku.value.value = res.sku;
            variationImage.value = res.variationImage;
            variationPrice.value.value = res.variationPrice;
            variationPromotion.value.value = res.variationPromotion;
            heightCm.value.value = res.delivery.dimensions.heightCm;
            widthCm.value.value = res.delivery.dimensions.widthCm;
            depthCm.value.value = res.delivery.dimensions.depthCm;
            weight.value.value = res.delivery.weight;
            variationStock.value = res.variationStock;
            shippingFree.value = res.delivery.shippingFree;
        }

        loadSubmitButton.value = false;
        textAreaDisabled.value = false;
    });
</script>
