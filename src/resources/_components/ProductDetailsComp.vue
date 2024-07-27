<template>
    <div class="flex flex-col xl:flex-row p-1 gap-1 flex-1 h-max">
        <!-- Seção de imagens do produto -->
        <div class="images bg-white rounded-md w-full p-2 xl:w-[460px] flex flex-col gap-3">
            <div class="image self-center max-w-[450px] xl:w-full">
                <el-image
                    :src="imageLink"
                    hide-on-click-modal
                    :zoom-rate="1.2"
                    :max-scale="7"
                    :min-scale="0.2"
                    :preview-teleported="true"
                    :preview-src-list="product.productImage"
                    :initial-index="selectedImage"
                    fit="cover" />
            </div>

            <div
                class="changeImage flex flex-row mx-auto p-1 gap-2 overflow-auto w-full"
                v-if="product.productImage && product.productImage.length > 0">
                <button
                    v-for="(image, index) in product.productImage"
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
        <div class="flex flex-col flex-1 gap-2 xl:overflow-auto xl:max-h-[calc(100vh-82px)]">
            <div class="Descriptions flex-1 flex flex-col gap-4 bg-white rounded-md p-2 md:p-4">
                <div>
                    <h1 class="text-2xl">{{ product.productName }}</h1>

                    <v-rating
                        readonly
                        item-aria-label="custom icon label text {0} of {1}"
                        size="small"
                        :length="5"
                        half-increments
                        :model-value="product.productStatistc.ratingAverage"
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
                        :loading="loading_button"
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
                        :loading="loading_button"
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
                        :loading="loading_button"
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
                        :loading="loading_button"
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
            <div class="Avaliations bg-white rounded-md p-2 md:p-4 flex flex-col">
                <div
                    class="d-flex flex-column self-center md:self-start p-4 md:w-[400px] shadow-md rounded-md"
                    v-if="product.productRatings && product.productRatings.length > 0">
                    <div class="d-flex justify-center md:self text-h5 mt-3">Resumo de avaliações:</div>

                    <div class="d-flex align-center flex-column">
                        <div class="text-h6 flex-row flex">
                            <span>{{ product.productStatistc.ratingAverage.toFixed(1) }} de 5</span>
                        </div>

                        <v-rating
                            :model-value="product.productStatistc.ratingAverage"
                            color="yellow-darken-3"
                            half-increments></v-rating>
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
                        <v-btn
                            @click="emits(`rating-dialog`)"
                            size="x-small"
                            v-if="product.canRate === true">
                            Comentar
                        </v-btn>
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
                                                <v-btn
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
                                                </v-btn>
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
</template>
<script setup>
    // const url = "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg";
    import { format, differenceInHours } from "date-fns";
    import { useStore } from "vuex";
    import { ref, defineProps, computed, watch, defineEmits, watchEffect, onMounted } from "vue";

    // Define the props
    defineProps({
        firstButton: { type: Function, required: true },
        titleFirst: { type: String, required: true },
        styl_firstbutton: String,
        loading_button: Boolean,

        titleSecond: { type: String, required: true },
        secondButton: { type: Function, required: true },
        styl_secondbutton: String,

        titleThird: { type: String },
        thirdButton: { type: Function },
        styl_thirdbutton: String,

        titleFourth: { type: String },
        fourthButton: { type: Function },
        styl_fourthbutton: String,

        titleFifth: { type: String },
        fifthButton: { type: Function },
        styl_fifthbutton: String,
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

    const emits = defineEmits(["value-updated", "material-Value", "sizes-Value", "color-Value", "model-Value", "rating-dialog"]);

    const quantity = ref(1);
    const store = useStore();
    const product = computed(() => store.state.product);
    const imageLink = ref(null);
    const selectedImage = ref(null);

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

    function updateImageLink(index) {
        selectedImage.value = index;
        imageLink.value = product.value.productImage[index];
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
                updateImageLink(0);
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

    onMounted(() => {
        if (product.value.productImage && product.value.productImage.length > 0) {
            updateImageLink(0);
        }
    });
</script>
<style scoped>
    /* .demo-image__error .image-slot {
        font-size: 30px;
    }
    .demo-image__error .image-slot .el-icon {
        font-size: 30px;
    }
    .demo-image__error .el-image {
        width: 100%;
        height: 200px;
    } */
</style>
