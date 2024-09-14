<template>
    <div class="flex flex-col lg:flex-row p-1 gap-1 flex-1 h-max">
        <!-- Seção de imagens do produto -->
        <div class="images bg-white rounded-md w-full p-2 lg:w-[460px] flex flex-col gap-3">
            <div class="image self-center max-w-[450px] lg:w-full">
                <el-image
                    :src="imageLink"
                    hide-on-click-modal
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-teleported="true"
                    :preview-src-list="images"
                    :initial-index="selectedImage"
                    fit="cover" />
            </div>

            <div
                class="changeImage flex flex-row mx-auto p-1 gap-2 overflow-auto w-full"
                v-if="images && images.length > 1">
                <button
                    v-for="(image, index) in images"
                    :key="index"
                    @click="updateImageLink(index)"
                    class="select rounded-md w-[100px] h-[70px] flex-shrink-0">
                    <img
                        :src="image"
                        alt="Imagem do Produto"
                        class="image rounded-sm w-full h-full object-cover" />
                </button>
            </div>
        </div>

        <!-- Seção de detalhes do produto -->
        <div class="flex flex-col flex-1 gap-2 lg:overflow-auto lg:max-h-[calc(100vh-82px)]">
            <div class="Descriptions flex-1 flex flex-col gap-4 bg-white rounded-md p-2 md:p-4">
                <div>
                    <h1 class="text-lg lg:text-xl">{{ product.productName }}</h1>

                    <el-rate
                        disabled
                        allow-half
                        v-model="product.productStatistc.ratingAverage"
                        :colors="colorsRate" />

                    <div class="text-lg font-semibold">
                        <p v-if="product.productPromotion">
                            <span>{{ formatCurrency(finalPrice) }}</span>
                        </p>
                        <p v-else>
                            <span class="font-medium text-base">Preço: </span>
                            <span>{{ formatCurrency(finalPrice) }}</span>
                        </p>
                    </div>
                </div>
                <slot name="product-statistic" />

                <!-- Input para quantidade -->
                <div class="flex flex-row gap-3">
                    <label for="quant">Quantidade:</label>
                    <input
                        type="number"
                        name="quant"
                        class="border px-2 w-20 rounded-md"
                        min="1"
                        @change="quantityValue"
                        v-model="quantity" />
                </div>

                <!-- Seção de seleção de variações -->
                <div class="buttons-chips flex flex-col lg:flex-row flex-wrap gap-3">
                    <div
                        class="color chips_div"
                        v-if="colors.length > 0">
                        <p>
                            Cores: <span v-if="selectedColor">{{ selectedColor.variationValue }}</span>
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
                                            <div v-if="item.variationImage && item.variationImage.length > 0">
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

                    <div
                        class="sizes chips_div"
                        v-if="sizes.length > 0">
                        <p>
                            Tamanhos: <span v-if="selectedSize">{{ selectedSize.variationValue }}</span>
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

                    <div
                        class="model chips_div"
                        v-if="models.length > 0">
                        <p>
                            Modelos: <span v-if="selectedModel">{{ selectedModel.variationValue }}</span>
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

                    <div
                        class="materials chips_div"
                        v-if="materials.length > 0">
                        <p>
                            Materiais: <span v-if="selectedMaterial">{{ selectedMaterial.variationValue }}</span>
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
                </div>

                <!-- Botões de ação -->
                <div
                    ref="buttons"
                    class="buttons flex-row gap-1 flex flex-wrap">
                    <el-button
                        ref="ref1"
                        size="small"
                        :icon="first_icon"
                        :loading="loading_button"
                        :type="styl_firstbutton"
                        @click="firstButton">
                        {{ titleFirst }}
                    </el-button>

                    <el-button
                        ref="ref2"
                        size="small"
                        :loading="loading_button"
                        :type="styl_secondbutton"
                        @click="secondButton">
                        {{ titleSecond }}
                    </el-button>

                    <el-button
                        ref="ref3"
                        size="small"
                        :loading="loading_button"
                        :type="styl_thirdbutton"
                        @click="thirdButton">
                        {{ titleThird }}
                    </el-button>

                    <el-button
                        size="small"
                        :loading="loading_button"
                        :type="styl_fourthbutton"
                        @click="fourthButton">
                        {{ titleFourth }}
                    </el-button>
                </div>
                <!-- Fim da seção de seleção de variações -->

                <!-- Descrição do produto -->
                <div>
                    <h2 class="mb-1 font-semibold text-lg underline decoration-slate-300 line underline-offset-3">Descrição:</h2>
                    <p
                        v-html="product.productDescription"
                        class="font-normal text"></p>
                </div>
            </div>

            <!-- Especificações do produto -->
            <div class="Especificatios bg-white rounded-md p-2 md:p-4">
                <h2 class="mb-4 font-semibold text-lg underline decoration-slate-300 line underline-offset-3">Especificações:</h2>
                <div>
                    <v-table
                        density="compact"
                        v-if="product.productSpecifications && product.productSpecifications.length > 0">
                        <tbody>
                            <tr
                                v-for="(spec, index) in product.productSpecifications"
                                :key="index">
                                <td>{{ spec.SpecificationName }}</td>
                                <td>{{ spec.SpecificationText }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                    <p v-else>Sem Especificações!!!</p>
                </div>
            </div>

            <!-- Avaliações do produto -->
            <div class="Avaliations bg-white rounded-md p-2 md:p-4 flex flex-col">
                <div
                    class="d-flex flex-column self-center md:self-start p-4 md:w-[400px] shadow-md rounded-md"
                    v-if="product.productRatings && product.productRatings.length > 0">
                    <div class="d-flex justify-center md:self text-h5 mt-3">Resumo de avaliações:</div>

                    <div class="d-flex align-center flex-column">
                        <div class="text-h6 flex-row flex">
                            <span>{{ product.productStatistc.ratingAverage.toFixed(1) }} de 5</span>
                        </div>

                        <el-rate
                            show-score
                            allow-half
                            v-model="product.productStatistc.ratingAverage" />

                        <div class="px-3">{{ product.productRatings.length }}</div>
                    </div>

                    <v-list
                        class="d-flex flex-column"
                        density="compact">
                        <v-list-item
                            v-for="(rating, i) in product.productStatistc.ratingStats"
                            :key="i">
                            <v-progress-linear
                                :model-value="rating.percentage"
                                class="mx-n5"
                                color="yellow-darken-3"
                                height="10"
                                rounded></v-progress-linear>

                            <template v-slot:prepend>
                                <span>{{ rating.score }}</span>
                                <v-icon
                                    class="mx-3"
                                    icon="mdi-star"></v-icon>
                            </template>

                            <template v-slot:append>
                                <div class="rating-values">
                                    <span class="d-flex justify-end"> {{ rating.count }} </span>
                                </div>
                            </template>
                        </v-list-item>
                    </v-list>
                </div>
                <div>
                    <h2 class="mb-4 font-semibold text-lg flex flex-row flex-wrap justify-between">
                        <span>Avaliações:</span>
                        <el-button
                            @click="emits(`rating-dialog`)"
                            size="x-small"
                            v-if="product.canRate === true">
                            Comentar
                        </el-button>
                    </h2>

                    <div class="flex flex-col gap-4">
                        <template v-if="product.productRatings && product.productRatings.length > 0">
                            <template
                                v-for="rating in product.productRatings"
                                :key="rating.id">
                                <div
                                    :class="rating.deleted === true ? 'bg-red-400' : 'bg-slate-100'"
                                    class="border-b-2 ml-2 p-2 rounded-md flex flex-col">
                                    <div class="flex flex-row">
                                        <div class="ml-2 mb-3 flex-1">
                                            <p class="font-medium">{{ `${rating.customer.firstName.split(" ").at(0)} ${rating.customer.lastName.split(" ").at(-1)}` }} :</p>
                                            <p class="pl-3">{{ rating.ratingText }}</p>
                                            <div>
                                                <p>{{ convertScoreToStars(rating.ratingScore) }}</p>
                                            </div>
                                        </div>
                                        <div class="flex flex-col text-sm">
                                            <div class="flex flex-row justify-end">
                                                <el-button
                                                    size="small"
                                                    class="text-sm duration-300"
                                                    variant="tonal"
                                                    :loading="loading_button"
                                                    :class="styl_fifthbutton"
                                                    @click="fifthButton(rating._id)">
                                                    <span>
                                                        <slot name="fifth-icon" />
                                                    </span>
                                                    <span>{{ titleFifth }}</span>
                                                </el-button>
                                            </div>
                                            <div class="text-end">
                                                <pre>{{ timeShow(rating.createdAt) }}</pre>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        v-if="rating.deleted === true"
                                        class="flex flex-col text-center text-xs">
                                        <p>Deleted by</p>
                                        <p>
                                            {{ rating.deletedby.firstName }}
                                            {{ rating.deletedby.lastName }}
                                        </p>
                                        <p>{{ rating.deletedby.role.length > 1 ? `Admin` : `Client` }}</p>
                                    </div>
                                </div>
                            </template>
                        </template>

                        <template v-else>
                            <p>Sem avaliações</p>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <el-tour
        v-model="open"
        :scroll-into-view-options="false">
        <el-tour-step
            :target="ref1?.$el"
            title="Adicionar ao carrinho"
            description="Actualmente em fase experimental!">
        </el-tour-step>

        <el-tour-step
            :target="ref2?.$el"
            title="Comprar agora"
            description="Actualmente em fase experimental!" />

        <el-tour-step
            :target="ref3?.$el"
            title="Whatsapp"
            description="Clique aqui para falar com o revendedor sobre o produto!" />
    </el-tour>
</template>
<script setup>
    import { useHead } from "@vueuse/head";

    import { format, differenceInHours } from "date-fns";
    import { useStore } from "vuex";
    import { ref, defineProps, computed, watch, defineEmits, watchEffect, onMounted } from "vue";

    defineProps({
        firstButton: { type: Function, required: true },
        titleFirst: { type: String, required: true },
        styl_firstbutton: String,
        loading_button: Boolean,
        first_icon: { type: String },

        titleSecond: { type: String, required: true },
        secondButton: { type: Function, required: true },
        styl_secondbutton: String,
        second_icon: { type: String },

        titleThird: { type: String },
        thirdButton: { type: Function },
        styl_thirdbutton: String,
        third_icon: { type: String },

        titleFourth: { type: String },
        fourthButton: { type: Function },
        styl_fourthbutton: String,
        fourth_icon: { type: String },

        titleFifth: { type: String },
        fifthButton: { type: Function },
        styl_fifthbutton: String,
    });

    const materials = ref([]);
    const models = ref([]);
    const colors = ref([]);
    const sizes = ref([]);

    const selectedMaterial = ref(null);
    const selectedModel = ref(null);
    const selectedColor = ref(null);
    const selectedSize = ref(null);
    // ////////////////////////

    const ref1 = ref(null);
    const ref2 = ref(null);
    const ref3 = ref(null);

    const colorsRate = ref(["#99A9BF", "#F7BA2A", "#FF9900"]);

    const open = ref(false);
    //////////////////////////
    const emits = defineEmits(["value-updated", "material-Value", "sizes-Value", "color-Value", "model-Value", "rating-dialog"]);

    const quantity = ref(1);
    const store = useStore();
    const product = computed(() => store.state.product);
    const imageLink = ref(null);
    const selectedImage = ref(null);
    const images = ref([]);

    function updateVariations() {
        materials.value = product.value.productVariations.filter((item) => item.variationType === "Material" && item.disabled !== true);
        sizes.value = product.value.productVariations.filter((item) => item.variationType === "Tamanho");
        models.value = product.value.productVariations.filter((item) => item.variationType === "Modelo");
        colors.value = product.value.productVariations.filter((item) => item.variationType === "Cor");
    }

    watchEffect(() => {
        if (product.value.productVariations) {
            updateVariations();
        }
    });

    function quantityValue(e) {
        emits("value-updated", e.target.value);
    }

    function materialValue(id) {
        emits("material-Value", id);
        selectedMaterial.value = materials.value.find((item) => item._id === id);
    }

    function sizesValue(id) {
        emits("sizes-Value", id);
        selectedSize.value = sizes.value.find((item) => item._id === id);
    }

    function colorValue(id) {
        emits("color-Value", id);
        selectedColor.value = colors.value.find((item) => item._id === id);
        images.value = selectedColor.value.variationImage;
        updateImageLink();
    }

    function modelValue(id) {
        emits("model-Value", id);
        selectedModel.value = models.value.find((item) => item._id === id);
    }

    function updateImageLink(index = 0) {
        selectedImage.value = index;
        imageLink.value = images.value[index];
    }

    function formatDate(date) {
        return format(new Date(date), "dd/MM/yyyy");
    }

    function convertScoreToStars(score) {
        const stars = "★".repeat(score) + "☆".repeat(5 - score);
        return stars;
    }

    function timeShow(date) {
        const diferencaHoras = differenceInHours(new Date(), new Date(date));
        if (diferencaHoras < 2) return `${diferencaHoras} hora atrás`;
        if (diferencaHoras < 24) return `${diferencaHoras} horas atrás`;
        return formatDate(date);
    }

    watch(
        () => product.value.productImage,
        (newValue) => {
            if (newValue.length > 0) {
                updateImageLink();
            }
        }
    );

    function formatCurrency(value) {
        if (typeof value !== "number" || isNaN(value)) {
            return "MZN 0.00";
        }
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    }

    const finalPrice = computed(() => {
        let basePrice = product.value.productPrice;
        if (selectedColor.value) {
            basePrice += selectedColor.value.variationPrice || 0;
        }
        if (selectedSize.value) {
            basePrice += selectedSize.value.variationPrice || 0;
        }
        if (selectedModel.value) {
            basePrice += selectedModel.value.variationPromotion || selectedModel.value.variationPrice || 0;
        }
        if (selectedMaterial.value) {
            basePrice += selectedMaterial.value.variationPrice || 0;
        }
        return basePrice;
    });

    const buttons = ref(null);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (product.value.productImage && product.value.productImage.length > 0) {
                    if (!localStorage.getItem("tourShown")) {
                        open.value = true;
                        localStorage.setItem("tourShown", "true");
                        console.log();
                        document.body.style.overflow = "hidden";
                    }
                }
            }
        });
    });

    onMounted(() => {
        if (product.value.productImage && product.value.productImage.length > 0) {
            images.value = product.value.productImage;
            updateImageLink();
        }
        if (buttons.value) {
            observer.observe(buttons.value);
        }
    });

    const updateHead = () => {
        useHead({
            title: `${product.value?.productName || "Produto"} - ${store.state?.storeName}`,
            meta: [
                {
                    name: "description",
                    content: `Compre o ${product.value?.productName || "Produto"}. Confira agora!`,
                },
            ],
        });
    };

    watch(() => [product.value.productName, store.state.storeName], updateHead, { immediate: true });
</script>

<style scoped>
    .chip-image {
        width: 50px;
        height: 50px;
    }

    .v-slide-group__content {
        flex-wrap: wrap;
    }
</style>
<style>
    .el-rate.is-disabled .el-rate__item {
        color: #898a8d7d;
    }
    .buttons-chips .v-slide-group__content {
        flex-wrap: wrap;
        flex: 0 auto;
    }
</style>
