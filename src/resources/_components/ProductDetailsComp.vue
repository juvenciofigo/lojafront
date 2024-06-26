<template>
    <div class="flex flex-col xl:flex-row p-1 gap-1 flex-1 h-max">
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

        <div class="flex flex-col flex-1 gap-2 xl:overflow-auto xl:max-h-[calc(100vh-82px)]">
            <div class="Descriptions flex-1 flex flex-col gap-1 bg-white rounded-md p-2 md:p-4">
                <div>
                    <h1 class="text-2xl">{{ product.productName }}</h1>
                </div>
                <div>
                    <v-rating
                        readonly
                        item-aria-label="custom icon label text {0} of {1}"
                        size="small"
                        :length="5"
                        :model-value="classificacaoGeral"
                        active-color="primary" />
                </div>
                <div class="text-lg">
                    <p v-if="product.productPromotion">
                        <span class="font-medium text-sm">Preço: </span>
                        <span>{{ formatCurrency(product.productPromotion) }}</span>
                    </p>
                    <p v-else>
                        <span class="font-medium text-base">Preço: </span>
                        <span>{{ formatCurrency(product.productPrice) }}</span>
                    </p>
                </div>

                <div class="button flex flex-col gap-3">
                    <div class="color">
                        Cores:
                        <div>
                            <v-item-group
                                mandatory
                                class="flex flex-row gap-2"
                                @update:model-value="colorValue">
                                <v-item
                                    v-for="(item, index) in colors.value"
                                    :key="index"
                                    v-slot="{ isSelected, toggle }">
                                    <button
                                        :class="isSelected ? 'bg-primary' : undefined"
                                        class="rounded-lg px-2 py-1 shadow-md duration-300"
                                        rounded
                                        @click="toggle">
                                        {{ item.variationValue }}
                                    </button>
                                </v-item>
                            </v-item-group>
                        </div>
                    </div>
                    <div class="sizes">
                        Tamanhos:
                        <div
                            class=" "
                            v-if="colors">
                            <v-item-group
                                mandatory
                                @update:model-value="sizesValue"
                                class="flex flex-row gap-2">
                                <v-item
                                    v-for="(item, index) in sizes.value"
                                    :key="index"
                                    v-slot="{ isSelected, toggle }">
                                    <button
                                        :class="isSelected ? 'bg-primary' : undefined"
                                        class="rounded-lg px-2 py-1 shadow-md duration-300"
                                        rounded
                                        @click="toggle">
                                        {{ item.variationValue }}
                                    </button>
                                </v-item>
                            </v-item-group>
                        </div>
                    </div>
                    <div class="model">
                        Modelos:
                        <div
                            class=" "
                            v-if="colors">
                            <v-item-group
                                @update:model-value="modelValue"
                                mandatory
                                class="flex flex-row gap-2">
                                <v-item
                                    v-for="(item, index) in models.value"
                                    :key="index"
                                    v-slot="{ isSelected, toggle }">
                                    <button
                                        :class="isSelected ? 'bg-primary' : undefined"
                                        class="rounded-lg px-2 py-1 shadow-md duration-300"
                                        rounded
                                        @click="toggle">
                                        {{ item.variationValue }}
                                    </button>
                                </v-item>
                            </v-item-group>
                        </div>
                    </div>
                    <div class="materials">
                        Materiais:
                        <div
                            class=" "
                            v-if="colors">
                            <v-item-group
                                mandatory
                                class="flex flex-row gap-2"
                                @update:model-value="materialValue">
                                <v-item
                                    v-for="(item, index) in materials.value"
                                    :key="index"
                                    v-slot="{ isSelected, toggle }"
                                    :value="item._id">
                                    <button
                                        :class="isSelected ? 'bg-primary' : undefined"
                                        class="rounded-lg px-2 py-1 shadow-md duration-300"
                                        rounded
                                        @click="toggle">
                                        {{ item.variationValue }}
                                    </button>
                                </v-item>
                            </v-item-group>
                        </div>
                    </div>

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

                    <div class="flex-row gap-2 flex">
                        <v-btn
                            class="p-1 text-sm duration-300"
                            size="small"
                            variant="elevated"
                            :loading="loading_firstbutton"
                            :class="styl_firstbutton"
                            @click="firstButton">
                            {{ titleFirst }}
                        </v-btn>
                        <v-btn
                            class="p-1 text-sm duration-300"
                            size="small"
                            variant="elevated"
                            :loading="loading_secondbutton"
                            :class="styl_secondbutton"
                            @click="secondButton">
                            {{ titleSecond }}
                        </v-btn>
                        <v-btn
                            size="small"
                            class="p-1 text-sm duration-300"
                            variant="elevated"
                            :loading="loading_thirdbutton"
                            :class="styl_thirdbutton"
                            @click="thirdButton">
                            {{ titleThird }}
                        </v-btn>
                        <v-btn
                            size="small"
                            class="p-1 text-sm duration-300"
                            variant="elevated"
                            :loading="loading_fourthbutton"
                            :class="styl_fourthbutton"
                            @click="fourthButton">
                            {{ titleFourth }}
                        </v-btn>
                    </div>
                </div>
                <div>
                    <p class="mb-1 font-semibold text-lg underline decoration-slate-300 line underline-offset-3">Descrição:</p>
                    <p
                        v-html="product.productDescription"
                        class="font-normal text"></p>
                </div>
            </div>

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
    import { ref, defineProps, computed, watch, defineEmits, watchEffect } from "vue";

    defineProps({
        firstButton: { type: Function, required: true },
        titleFirst: { type: String, required: true },
        titleSecond: { type: String, required: true },
        secondButton: { type: Function, required: true },
        titleThird: { type: String },
        thirdButton: { type: Function },
        titleFourth: { type: String },
        fourthButton: { type: Function },
        styl_firstbutton: String,
        styl_thirdbutton: String,
        styl_fourthbutton: String,
        styl_secondbutton: String,
        loading_firstbutton: Boolean,
        loading_secondbutton: Boolean,
        loading_thirdbutton: Boolean,
        loading_fourthbutton: Boolean,
    });
    const colors = ref([]);
    const sizes = ref([]);
    const models = ref([]);
    const materials = ref([]);

    const emits = defineEmits(["value-updated material-Value sizes-Value color-Value model-Value"]);
    const quantity = ref(1);

    const store = useStore();
    const product = computed(() => store.state.product);
    const imageLink = ref(null);

    function update() {
        colors.value = computed(() => product.value.productVariations.filter((item) => item.variationType === "Cor"));
        sizes.value = computed(() => product.value.productVariations.filter((item) => item.variationType === "Tamanho"));
        models.value = computed(() => product.value.productVariations.filter((item) => item.variationType === "Modelo"));
        materials.value = computed(() => product.value.productVariations.filter((item) => item.variationType === "Material"));
    }

    watchEffect(() => {
        if (product.value.productVariations) {
            update();
        }
    });

    function quantityValue(e) {
        emits("value-updated", e.target.value);
    }
    function materialValue(e) {
        emits("material-Value", materials.value.value[e]._id);
    }
    function sizesValue(e) {
        emits("sizes-Value", sizes.value.value[e]._id);
    }
    function colorValue(e) {
        emits("color-Value", colors.value.value[e]._id);
    }
    function modelValue(e) {
        emits("model-Value", models.value.value[e]._id);
    }

    function updateImageLink(index) {
        imageLink.value = product.value.productImage[index];
    }

    function formatDate(date) {
        return format(new Date(date), "dd/MM/yyyy");
    }

    function convertScoreToStars(score) {
        const stars = "★".repeat(score) + "☆".repeat(5 - score);
        return stars;
    }

    const timeShow = (date) => {
        const diferencaHoras = differenceInHours(new Date(), new Date(date));
        if (diferencaHoras < 2) return `${diferencaHoras} hora atrás`;
        if (diferencaHoras < 24) return `${diferencaHoras} horas atrás`;
        return formatDate(date);
    };

    watch(
        () => product.value.productImage,
        (newValue) => {
            imageLink.value = newValue[0];
        }
    );

    const formatCurrency = (value) => {
        if (typeof value !== "number" || isNaN(value)) {
            return "MZN 0.00";
        }
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };

    function calcularMediaRating(scores) {
        if (!scores || scores.length === 0) {
            return 0;
        }
        const somaScores = scores.reduce((total, rating) => total + rating.ratingScore, 0);
        const media = somaScores / scores.length;
        return media;
    }

    const classificacaoGeral = computed(() => {
        const mediaRating = calcularMediaRating(product.value.productRatings);
        return mediaRating;
    });
</script>
