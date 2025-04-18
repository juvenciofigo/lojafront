<template lang="">
    <ProductDetaislsSkeleton v-if="skeleton"></ProductDetaislsSkeleton>
    <ProductDetailsComp
        v-if="!skeleton && product"
        :price="finalPrice"
        :newImages="images"
        @rating-dialog="ratingDialog = true">
        <template #opcoes>
            <div class="flex flex-col gap-3">
                <div>
                    <label
                        class="font-semibold"
                        for="quant">
                        Quantidade:
                    </label>
                    <el-input-number
                        :controls="false"
                        :disabled="loading_button"
                        v-model="quantity"
                        :min="1"
                        size="small"
                        controls-position="right" />
                </div>

                <div v-if="deliveryEstimateOptions.length > 0">
                    <p class="text-xs mb-1">Tempo estimado de entrega:</p>
                    <el-select-v2
                        :disabled="deliveryEstimateOptions.length === 1 ? true : false"
                        v-model="selectedEstimate"
                        @change="selectEstimateDelivery"
                        :options="deliveryEstimateOptions"
                        placeholder="Selecione uma estimativa"
                        size="small"
                        style="width: 150px" />
                </div>
            </div>

            <!-- Seção de seleção de variações -->
            <div class="buttons-chips flex flex-col lg:flex-row flex-wrap gap-1">
                <!-- Cores -->
                <div
                    class="color chips_div"
                    v-if="colors.length > 0">
                    <p>
                        <span class="font-semibold">Cores: </span><span v-if="selectedColor">{{ selectedColor.variationValue }}</span>
                    </p>
                    <div>
                        <v-chip-group
                            selected-class="bg-primary"
                            @update:model-value="colorValue"
                            mandatory>
                            <v-chip
                                v-for="(item, index) in colors"
                                :key="index"
                                :value="item._id">
                                <template v-slot:default>
                                    <el-tooltip :content="item.variationValue">
                                        <div v-if="item?.variationImage && item?.variationImage?.length > 0">
                                            <img
                                                :src="item.variationImage[0]"
                                                alt="Imagem da variacao do produto"
                                                class="chip-image object-contain" />
                                        </div>
                                        <div v-else>
                                            {{ item.variationValue }}
                                        </div>
                                    </el-tooltip>
                                </template>
                            </v-chip>
                        </v-chip-group>
                    </div>
                </div>
                <!--Fim Cores -->

                <!-- Tamanhos -->
                <div
                    class="sizes chips_div"
                    v-if="sizes?.length > 0">
                    <p>
                        <span class="font-semibold">Tamanhos: </span><span v-if="selectedSize">{{ selectedSize.variationValue }}</span>
                    </p>
                    <div class=" ">
                        <v-chip-group
                            selected-class="bg-primary"
                            @update:model-value="sizesValue"
                            mandatory>
                            <v-chip
                                v-for="(item, index) in sizes"
                                :key="index"
                                :value="item._id">
                                <template v-slot:default>
                                    <el-tooltip :content="item?.variationValue"> </el-tooltip>
                                    <div v-if="item?.variationImage && item?.variationImage?.length > 0">
                                        <img
                                            :src="item.variationImage[0]"
                                            alt="Imagem da variacao do produto"
                                            class="chip-image object-contain" />
                                    </div>
                                    <div v-else>
                                        {{ item.variationValue }}
                                    </div>
                                    <el-tooltip :content="item.variationValue"> </el-tooltip>
                                </template>
                            </v-chip>
                        </v-chip-group>
                    </div>
                </div>
                <!--Fim Tamanhos -->

                <!-- Modelos -->
                <div
                    class="model chips_div"
                    v-if="models.length > 0">
                    <p>
                        <span class="font-semibold">Modelos: </span><span v-if="selectedModel">{{ selectedModel.variationValue }}</span>
                    </p>
                    <div>
                        <v-chip-group
                            selected-class="bg-primary"
                            @update:model-value="modelValue"
                            mandatory>
                            <v-chip
                                v-for="(item, index) in models"
                                :key="index"
                                :value="item._id">
                                <template v-slot:default>
                                    <el-tooltip :content="item.variationValue"> </el-tooltip>
                                    <div v-if="item.variationImage && item.variationImage.length > 0">
                                        <img
                                            :src="item.variationImage[0]"
                                            alt="Imagem da variacao do produto"
                                            class="chip-image object-contain" />
                                    </div>
                                    <div v-else>
                                        {{ item.variationValue }}
                                    </div>
                                    <el-tooltip :content="item.variationValue"> </el-tooltip>
                                </template>
                            </v-chip>
                        </v-chip-group>
                    </div>
                </div>
                <!-- Fim Modelos -->

                <!-- Material -->
                <div
                    class="materials chips_div"
                    v-if="materials.length > 0">
                    <p>
                        <span class="font-semibold">Materiais: </span><span v-if="selectedMaterial">{{ selectedMaterial.variationValue }}</span>
                    </p>
                    <div class=" ">
                        <v-chip-group
                            selected-class="bg-primary"
                            @update:model-value="materialValue"
                            mandatory>
                            <v-chip
                                v-for="(item, index) in materials"
                                :key="index"
                                :value="item._id">
                                <template v-slot:default>
                                    <el-tooltip :content="item.variationValue"> </el-tooltip>
                                    <div v-if="item.variationImage && item.variationImage.length > 0">
                                        <img
                                            :src="item.variationImage[0]"
                                            alt="Imagem da variacao do produto"
                                            class="chip-image object-contain" />
                                    </div>
                                    <div v-else>
                                        {{ item.variationValue }}
                                    </div>
                                    <el-tooltip :content="item.variationValue"> </el-tooltip>
                                </template>
                            </v-chip>
                        </v-chip-group>
                    </div>
                </div>
                <!--Fim Material -->
            </div>

            <!-- Botões de ação -->
            <div
                ref="buttons"
                class="buttons flex-row flex flex-nowrap">
                <el-button
                    size="small"
                    :loading="loading_button"
                    type="primary"
                    @click="addToCart">
                    Adicionar
                    <el-icon><ShoppingCart /></el-icon>
                </el-button>

                <el-button
                    size="small"
                    :loading="loading_button"
                    type="primary"
                    @click="buyNow">
                    Comprar Agora
                </el-button>

                <el-button
                    size="small"
                    :loading="loading_button"
                    type="primary"
                    @click="callWhatsapp">
                    Whatsapp
                </el-button>
            </div>
        </template>
    </ProductDetailsComp>

    <!-- criar avaliacao -->
    <v-dialog
        persistent
        v-model="ratingDialog"
        width="auto">
        <div class="p-4 flex flex-col gap-4 border rounded-md bg-white sm:w-[400px]">
            <div class="flex flex-row">
                <h1 class="text-xl font-semibold">Avaliação:</h1>
                <button
                    class="ms-auto"
                    @click="ratingDialog = false">
                    <X color="red" />
                </button>
            </div>
            <div class="">
                <div>
                    <div class="mb-7 mt-5 flex flex-col gap-4">
                        <label>
                            <h2 class="text-lg">Comentário:</h2>
                        </label>
                        <v-textarea
                            v-model="ratingText.value.value"
                            variant="outlined"
                            placeholder="Digite seu comentario"
                            density="compact"
                            bg-color="amber-lighten-4"
                            :error-messages="ratingText.errorMessage.value">
                        </v-textarea>

                        <div>
                            <h2 class="text-lg">Coloque uma potuaçao:</h2>
                            <br />
                            <div class="text-center">
                                <v-rating
                                    density="compact"
                                    v-model="ratingScore.value.value"
                                    :error-messages="ratingScore.errorMessage.value"
                                    hover>
                                </v-rating>
                                <pre>{{ ratingScore.value.value }}</pre>
                                <div class="text-red-500">{{ ratingScore.errorMessage.value }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex-row flex flex-wrap gap-2">
                        <el-button
                            :loading="ratingButtonLoading"
                            @click="submit()"
                            size="small"
                            type="submit"
                            color="#5865f2">
                            Submit
                        </el-button>

                        <el-button
                            :loading="ratingButtonLoading"
                            size="small"
                            color="#f00"
                            @click="handleReset()">
                            Limpar
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </v-dialog>
</template>
<script setup>
    import { ref, computed, onBeforeMount, toRaw, watch } from "vue";
    import { useStore } from "vuex";
    import { useRoute } from "vue-router";
    import ProductDetailsComp from "@/resources/_components/ProductDetailsComp.vue";
    import ProductDetaislsSkeleton from "@/components/skeletons/ProductDetaislsSkeleton.vue";
    import { X } from "lucide-vue-next";
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    import { ShoppingCart } from "@element-plus/icons-vue";

    const store = useStore();
    const route = useRoute();

    const isAuthenticated = computed(() => store.getters.isAuthenticated("authToken"));
    const product = computed(() => store.state.products.product);
    const loading_button = ref(false);
    const ratingButtonLoading = ref(false);
    const ratingDialog = ref(false);
    const skeleton = ref(true);
    const variation = ref({});
    const quantity = ref(1);
    const images = ref([]);

    const materials = computed(() => product.value?.productVariations?.filter((item) => item.variationType === "Material") || []);
    const models = computed(() => product.value?.productVariations?.filter((item) => item.variationType === "Modelo") || []);
    const colors = computed(() => product.value?.productVariations?.filter((item) => item.variationType === "Cor") || []);
    const sizes = computed(() => product.value?.productVariations?.filter((item) => item.variationType === "Tamanho") || []);

    let selectedEstimate = ref(null);
    const selectedMaterial = ref(null);
    const selectedModel = ref(null);
    const selectedColor = ref(null);
    const selectedSize = ref(null);

    const deliveryEstimateOptions = computed(
        () =>
            product.value?.deliveryEstimate?.map((item) => ({
                label: `${item.estimatedTime}${item.additionalCost > 0 ? ` (+${item.additionalCost} MZN)` : ""}`,
                value: item._id,
            })) || []
    );

    watch(deliveryEstimateOptions, (data) => {
        if (data.length === 1) {
            selectedEstimate.value = deliveryEstimateOptions.value[0].value;
            selectEstimateDelivery();
        }
    });

    const finalPrice = computed(() => {
        let basePrice = product.value.productPrice;

        if (selectedEstimate.value) {
            const selected = product.value.deliveryEstimate.find((item) => item._id === selectedEstimate.value);
            basePrice += selected.additionalCost;
        }

        if (selectedColor.value) {
            basePrice += selectedColor.value.variationPromotion || selectedColor.value.variationPrice || 0;
        }
        if (selectedSize.value) {
            basePrice += selectedSize.value.variationPromotion || selectedSize.value.variationPrice || 0;
        }
        if (selectedModel.value) {
            basePrice += selectedModel.value.variationPromotion || selectedModel.value.variationPrice || 0;
        }

        if (selectedMaterial.value) {
            basePrice += selectedMaterial.value.variationPromotion || selectedMaterial.value.variationPrice || 0;
        }
        return basePrice;
    });

    // ///////////////////

    function materialValue(value) {
        variation.value.material = value;
        selectedMaterial.value = materials.value.find((item) => item._id === value);
        images.value = selectedMaterial?.value?.variationImage;
    }
    function sizesValue(value) {
        variation.value.size = value;
        selectedSize.value = sizes.value.find((item) => item._id === value);
        images.value = selectedSize.value?.variationImage;
    }
    function colorValue(value) {
        variation.value.color = value;
        selectedColor.value = colors.value.find((item) => item._id === value);
        images.value = selectedColor.value?.variationImage;
    }
    function modelValue(value) {
        variation.value.model = value;
        selectedModel.value = models.value.find((item) => item._id === value);
        images.value = selectedModel.value?.variationImage;
    }
    function selectEstimateDelivery() {
        variation.value.deliveryEstimate = selectedEstimate.value;
    }

    const verifyVaraiations = async () => {
        let error = null;
        if (colors.value.length > 0 && !variation.value.color) {
            return "Selecione a cor";
        }
        if (sizes.value.length > 0 && !variation.value.size) {
            return "Selecione o tamanho";
        }
        if (models.value.length > 0 && !variation.value.model) {
            return "Selecione o modelo";
        }
        if (materials.value.length > 0 && !variation.value.material) {
            return "Selecione o material";
        }
        if (deliveryEstimateOptions.value.length > 0 && !variation.value.deliveryEstimate) {
            return "Selecione o tempo de entrega";
        }
        return error;
    };

    async function addToCart() {
        const item = {
            productId: route.params.id,
            variation: toRaw(variation.value),
            quantity: quantity.value || 1,
            deliveryEstimate: selectedEstimate.value,
        };

        const res = await verifyVaraiations();

        if (res) {
            store.commit("SET_NOTIFICATION", { title: "Aviso!", type: "warning", message: res });
            loading_button.value = false;
            return;
        }
        loading_button.value = true;
        store.commit("SET_loadingPriceUpdate");

        await store.dispatch("carts/addToCart", { isAuthenticated: isAuthenticated.value, item });

        await store.dispatch("carts/displayCartPrices", isAuthenticated.value);
        loading_button.value = false;
        store.commit("SET_loadingPriceUpdate");
    }

    async function callWhatsapp() {
        const product = window.location.href;
        const texto = `Olá, gostaria de mais informações sobre o produto: ${product}`;
        const textoCodificado = encodeURIComponent(texto);
        const url = `https://wa.me/258856957459?text=${textoCodificado}`;
        window.open(url, "_blank");
    }

    onBeforeMount(async () => {
        await store.dispatch("products/fetchProductById", route.params.id);
        skeleton.value = false;
    });

    // ////////////////buy now//////////////
    async function buyNow() {
        // const res = await verifyVaraiations();

        // if (res) {
        store.commit("SET_NOTIFICATION", { title: "Aviso!", type: "warning", message: "Adicione ao carrinho para comprar!" });
        //     return;
        // }
        // router.push({ name: "order-create", query: { productsFrom: "payNow", product: route.params.id, quantity: quantity.value || 1, variation: toRaw(variation.value) } });
    }

    // ///////////////rating /////////////
    const { handleSubmit, handleReset } = useForm({
        validationSchema: toTypedSchema(
            z.object({
                ratingText: z.string({ message: "Preencha esse campo" }),
                ratingScore: z.number({ message: "Avalie pelas estrelas" }).min(1, { message: "O mínimo deve ser 1" }).max(5, { message: "O máximo deve ser 5" }),
            })
        ),
    });

    let ratingText = useField("ratingText"),
        ratingScore = useField("ratingScore");

    const submit = handleSubmit(async (values) => {
        ratingButtonLoading.value = true;
        await store.dispatch("rating/sendRating", { ...values, productId: route.params.id });
        store.dispatch("products/fetchProductById", route.params.id);
        handleReset();
        ratingDialog.value = false;
        ratingButtonLoading.value = false;
    });
</script>
<style>
    .buttons :nth-child(4) {
        display: none;
    }
</style>
