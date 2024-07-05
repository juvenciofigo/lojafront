<template>
    <div class="flex flex-col xl:flex-row p-1 gap-1 flex-1 h-max">
        <!-- Seção de imagens do produto -->
        <div class="images bg-white rounded-md w-full p-2 xl:w-[360px] flex flex-col gap-3 items-center">
            <div class="image self-center max-w-[450px] xl:w-full">
                <div class="bg-slate-100 rounded-md">
                    <img
                        v-if="product.productImage && product.productImage.length > 0"
                        :src="imageLink"
                        class="object-cover"
                        alt="Imagem do Produto" />
                </div>
            </div>
            <div
                class="changeImage flex flex-row p-1 justify-center gap-2"
                v-if="product.productImage && product.productImage.length > 1">
                <template
                    v-for="(image, index) in product.productImage"
                    :key="index">
                    <button
                        @click="updateImageLink(index)"
                        class="rounded-md bg-slate-200 w-[70px] h-[70px]">
                        <img
                            :src="image"
                            alt="Imagem do Produto"
                            class="rounded-sm" />
                    </button>
                </template>
            </div>
        </div>

        <!-- Seção de detalhes do produto -->
        <div class="flex flex-col flex-1 gap-2 xl:overflow-auto xl:max-h-[calc(100vh-82px)]">
            <div class="Descriptions flex-1 flex flex-col gap-4 bg-white rounded-md p-2 md:p-4">
                <div>
                    <h1 class="text-2xl">{{ product.productName }}</h1>

                    <v-rating
                        readonly
                        item-aria-label="custom icon label text {0} of {1}"
                        size="small"
                        :length="5"
                        :model-value="classificacaoGeral"
                        active-color="primary" />

                    <div class="text-lg">
                        <p v-if="product.productPromotion">
                            <span class="font-medium text-sm">Preço: </span>
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
                <div class="button flex flex-col xl:flex-row flex-wrap gap-3">
                    <div
                        class="color border shadow-md border-slate-50 p-2 rounded-md"
                        v-if="colors.length > 0">
                        Cores:
                        <div>
                            <v-chip-group
                                selected-class="bg-primary"
                                @update:model-value="colorValue"
                                mandatory>
                                <v-chip
                                    v-for="(item, index) in colors"
                                    :key="index"
                                    :value="item._id"
                                    :text="item.variationValue"></v-chip>
                            </v-chip-group>
                        </div>
                    </div>

                    <div
                        class="sizes border shadow-md border-slate-50 p-2 rounded-md"
                        v-if="sizes.length > 0">
                        Tamanhos:
                        <div class=" ">
                            <v-chip-group
                                selected-class="bg-primary"
                                @update:model-value="sizesValue"
                                mandatory>
                                <v-chip
                                    v-for="(item, index) in sizes"
                                    :key="index"
                                    :value="item._id"
                                    :text="item.variationValue"></v-chip>
                            </v-chip-group>
                        </div>
                    </div>

                    <div
                        class="model border shadow-md border-slate-50 p-2 rounded-md"
                        v-if="models.length > 0">
                        Modelos:
                        <div>
                            <v-chip-group
                                selected-class="bg-primary"
                                @update:model-value="modelValue"
                                mandatory>
                                <v-chip
                                    v-for="(item, index) in models"
                                    :key="index"
                                    :value="item._id"
                                    :text="item.variationValue"></v-chip>
                            </v-chip-group>
                        </div>
                    </div>

                    <div
                        class="materials border shadow-md border-slate-50 p-2 rounded-md"
                        v-if="materials.length > 0">
                        Materiais:
                        <div class=" ">
                            <v-chip-group
                                selected-class="bg-primary"
                                @update:model-value="materialValue"
                                mandatory>
                                <v-chip
                                    v-for="(item, index) in materials"
                                    :key="index"
                                    :value="item._id"
                                    :text="item.variationValue"></v-chip>
                            </v-chip-group>
                        </div>
                    </div>
                </div>

                <!-- Botões de ação -->
                <div class="flex-row gap-2 flex flex-wrap">
                    <v-btn
                        class="p-2 text-sm duration-300 flex flex-row"
                        size="small"
                        variant="text"
                        :loading="loading_firstbutton"
                        :class="styl_firstbutton"
                        @click="firstButton">
                        <div class="flex-row flex gap-2 items-center">
                            <span>{{ titleFirst }}</span>
                            <span>
                                <slot name="first-icon" />
                            </span>
                        </div>
                    </v-btn>
                    <v-btn
                        class="p-1 text-sm duration-300"
                        size="small"
                        variant="text"
                        :loading="loading_secondbutton"
                        :class="styl_secondbutton"
                        @click="secondButton">
                        <div class="flex-row flex gap-2 items-center">
                            <span>
                                <slot name="second-icon" />
                            </span>
                            <span>{{ titleSecond }}</span>
                        </div>
                    </v-btn>
                    <v-btn
                        size="small"
                        class="p-1 text-sm duration-300"
                        variant="text"
                        :loading="loading_thirdbutton"
                        :class="styl_thirdbutton"
                        @click="thirdButton">
                        <div class="flex-row flex gap-2 items-center">
                            <span>
                                <slot name="third-icon" />
                            </span>
                            <span>{{ titleThird }}</span>
                        </div>
                    </v-btn>
                    <v-btn
                        size="small"
                        class="p-1 text-sm duration-300"
                        variant="text"
                        :loading="loading_fourthbutton"
                        :class="styl_fourthbutton"
                        @click="fourthButton">
                        <div class="flex-row flex gap-2 items-center">
                            <span>
                                <slot name="fourth-icon" />
                            </span>
                            <span>{{ titleFourth }}</span>
                        </div>
                    </v-btn>
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
            <div class="Avaliations bg-white rounded-md p-2 md:p-4">
                <h2 class="mb-4 font-semibold text-lg underline decoration-slate-300 line underline-offset-3">Avaliações:</h2>
                <div class="flex flex-col gap-4">
                    <template v-if="product.productRatings && product.productRatings.length > 0">
                        <template
                            v-for="rating in product.productRatings"
                            :key="rating.id">
                            <div class="border-b-2 bg-slate-100 ml-2 p-2">
                                <div class="ml-2 mb-3">
                                    <p class="font-medium">{{ rating.ratingName }} :</p>
                                    <p class="pl-3">{{ rating.ratingText }}</p>
                                </div>
                                <div class="flex flex-row justify-between px-5">
                                    <div>
                                        <p>{{ convertScoreToStars(rating.ratingScore) }}</p>
                                    </div>
                                    <div class="text-sm">
                                        <p>{{ formatDate(rating.createdAt) }}</p>
                                        <p>{{ timeShow(rating.createdAt) }}</p>
                                    </div>
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
</template>
<script setup>
    import { format, differenceInHours } from "date-fns";
    import { useStore } from "vuex";
    import { ref, defineProps, computed, watch, defineEmits, watchEffect, onMounted } from "vue";

    // Define the props
    defineProps({
        firstButton: { type: Function, required: true },
        titleFirst: { type: String, required: true },
        styl_firstbutton: String,
        loading_firstbutton: Boolean,

        titleSecond: { type: String, required: true },
        secondButton: { type: Function, required: true },
        styl_secondbutton: String,
        loading_secondbutton: Boolean,

        titleThird: { type: String },
        thirdButton: { type: Function },
        styl_thirdbutton: String,
        loading_thirdbutton: Boolean,

        titleFourth: { type: String },
        fourthButton: { type: Function },
        styl_fourthbutton: String,
        loading_fourthbutton: Boolean,
    });

    // Initialize refs and store
    const materials = ref([]);
    const models = ref([]);
    const colors = ref([]);
    const sizes = ref([]);

    const selectedMaterial = ref(null);
    const selectedModel = ref(null);
    const selectedColor = ref(null);
    const selectedSize = ref(null);

    const emits = defineEmits(["value-updated", "material-Value", "sizes-Value", "color-Value", "model-Value"]);

    const quantity = ref(1);
    const store = useStore();
    const product = computed(() => store.state.product);
    const imageLink = ref(null);

    // Update the variations based on the product data
    function updateVariations() {
        materials.value = product.value.productVariations.filter((item) => item.variationType === "Material");
        models.value = product.value.productVariations.filter((item) => item.variationType === "Modelo");
        colors.value = product.value.productVariations.filter((item) => item.variationType === "Cor");
        sizes.value = product.value.productVariations.filter((item) => item.variationType === "Tamanho");
    }

    // Watch for changes in product variations and update accordingly
    watchEffect(() => {
        if (product.value.productVariations) {
            updateVariations();
        }
    });

    // Emit value updates for quantity
    function quantityValue(e) {
        emits("value-updated", e.target.value);
    }

    // Emit value updates for selected variations
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
    }

    function modelValue(id) {
        emits("model-Value", id);
        selectedModel.value = models.value.find((item) => item._id === id);
    }

    // Update the image link based on the selected image index
    function updateImageLink(index) {
        imageLink.value = product.value.productImage[index];
    }

    // Format the date to a readable string
    function formatDate(date) {
        return format(new Date(date), "dd/MM/yyyy");
    }

    // Convert rating score to stars
    function convertScoreToStars(score) {
        const stars = "★".repeat(score) + "☆".repeat(5 - score);
        return stars;
    }

    // Show the time difference in hours
    function timeShow(date) {
        const diferencaHoras = differenceInHours(new Date(), new Date(date));
        if (diferencaHoras < 2) return `${diferencaHoras} hora atrás`;
        if (diferencaHoras < 24) return `${diferencaHoras} horas atrás`;
        return formatDate(date);
    }

    // Watch for changes in the product images and update the image link
    watch(
        () => product.value.productImage,
        (newValue) => {
            if (newValue.length > 0) {
                updateImageLink(0);
            }
        }
    );

    // Format currency to the specified locale
    function formatCurrency(value) {
        if (typeof value !== "number" || isNaN(value)) {
            return "MZN 0.00";
        }
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    }

    // Calculate the average rating
    function calcularMediaRating(scores) {
        if (!scores || scores.length === 0) {
            return 0;
        }
        const somaScores = scores.reduce((total, rating) => total + rating.ratingScore, 0);
        const media = somaScores / scores.length;
        return media;
    }

    // Compute the general classification rating
    const classificacaoGeral = computed(() => {
        const mediaRating = calcularMediaRating(product.value.productRatings);
        return mediaRating;
    });

    // Compute the final price based on selected variations
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

    // Initialize the component
    onMounted(() => {
        if (product.value.productImage.length > 0) updateImageLink(0);
    });
</script>
