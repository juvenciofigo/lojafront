<template>
    <div class="flex flex-col gap-4">
        <div class="flex flex-row justify-between gap-3">
            <div class="flex flex-col sm:flex-row flex-1 bg-white p-2 lg:p-4 gap-4 lg:max-h-[380px]">
                <!-- Seção de imagens do produto -->
                <div class="images rounded-md lg:p-2 flex flex-col-reverse lg:flex-row lg:w-max gap-3">
                    <div
                        class="changeImage mx-auto sm:mx-0 flex flex-nowrap md:flex-col md:p-1 gap-2 overflow-auto max-w-[360px] lg:w-min"
                        v-if="images && images.length > 1">
                        <button
                            v-for="(image, index) in images"
                            :key="index"
                            @click="updateImageLink(index)"
                            class="select rounded-md w-10 h-10 lg:w-[60px] lg:h-[60px] flex-shrink-0 outline outline-1 m-[2px]">
                            <img
                                :src="image"
                                alt="Imagem do Produto"
                                class="image rounded-sm w-full h-full object-contain" />
                        </button>
                    </div>

                    <div class="image lg:self-start border self-center">
                        <div class="border max-w-[370px] max-h-[400px] lg:w-[310px] lg:h-[310px] overflow-hidden">
                            <el-image
                                class="w-full h-full"
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
                    </div>
                </div>
                <!--Fim Seção de imagens do produto -->

                <!-- Descrição do produto -->
                <div class="flex-1">
                    <h1 class="text-xl">{{ product.productName }}</h1>
                    <el-rate
                        disabled
                        allow-half
                        v-model="product.ratingAverage"
                        :colors="colorsRate" />

                    <div class="compra-mobile lg:hidden flex flex-col gap-4 bg-white rounded-md">
                        <div class="text-2xl">
                            <span class="font-medium text-xs">Preço: </span>
                            <span
                                class="font-semibold"
                                v-if="product.productPromotion">
                                {{ formatCurrency(price) }}
                            </span>
                            <span
                                class="font-semibold"
                                v-else>
                                {{ formatCurrency(price) }}
                            </span>
                        </div>

                        <slot name="product-statistic" />
                        <slot name="opcoes" />
                        <div class="buttons-chips flex flex-col lg:flex-row flex-wrap gap-3 font-semibold">
                        </div>
                    </div>
                    <br />
                    <div>
                        <h2 class="text-lg mb-1">Descrição:</h2>
                        <p
                            v-html="product.productDescription"
                            class="font-normal indent-2"></p>
                    </div>
                </div>
                <!--Fim Descrição do produto -->
            </div>

            <div class="compra-desktop hidden lg:flex flex-col gap-4 bg-white rounded-md p-2 h-max w-[320px]">
                <div class="text-2xl">
                    <span class="font-normal text-xs">Preço: </span>
                    <span
                        class="font-semibold"
                        v-if="product.productPromotion">
                        {{ formatCurrency(price) }}
                    </span>
                    <span
                        class="font-semibold"
                        v-else>
                        {{ formatCurrency(price) }}
                    </span>
                </div>

                <slot name="product-statistic" />

                <slot name="opcoes" />

                <!-- Fim da seção de seleção de variações -->
            </div>
        </div>

        <!-- ///////////////////////////////// -->

        <!-- Seção de detalhes do produto -->
        <div class="flex flex-col flex-1 gap-2 lg:overflow-auto lg:max-h-[calc(100vh-82px)]">
            <!-- Especificações do produto -->
            <div class="Especificatios bg-white rounded-md p-2 md:p-4">
                <h2 class="mb-4 font-semibold text-lg">Especificações:</h2>
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
                            <span>{{ product.ratingAverage.toFixed(1) }} de 5</span>
                        </div>

                        <el-rate
                            show-score
                            allow-half
                            v-model="product.ratingAverage" />

                        <div class="px-3">{{ product.productRatings.length }}</div>
                    </div>

                    <v-list
                        class="d-flex flex-column"
                        density="compact">
                        <v-list-item
                            v-for="(rating, i) in product.ratingStats"
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
                    <h2 class="my-4 font-semibold text-lg flex flex-row flex-wrap justify-between">
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
                                        class="flex flex-col text-center">
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
    // import { useHead } from "@vueuse/head";

    import { differenceInHours } from "date-fns";
    import { useStore } from "vuex";
    import { computed, ref, onBeforeMount, defineProps, defineEmits,watch } from "vue";
    import { formatCurrency, formatDate } from "@/util/functions";

   const props= defineProps({
        price: Number,
        newImages:Array

        //     firstButton: { type: Function, required: true },
        //     titleFirst: { type: String, required: true },
        //     styl_firstbutton: String,
        //     loading_button: Boolean,
        //     first_icon: { type: String },

        //     titleSecond: { type: String, required: true },
        //     secondButton: { type: Function, required: true },
        //     styl_secondbutton: String,
        //     second_icon: { type: String },

        //     titleThird: { type: String },
        //     thirdButton: { type: Function },
        //     styl_thirdbutton: String,
        //     third_icon: { type: String },

        //     titleFourth: { type: String },
        //     fourthButton: { type: Function },
        //     styl_fourthbutton: String,
        //     fourth_icon: { type: String },

        //     titleFifth: { type: String },
        //     fifthButton: { type: Function },
        //     styl_fifthbutton: String,
    });

    // const materials = ref([]);
    // const models = ref([]);
    // const colors = ref([]);
    // const sizes = ref([]);

    // const selectedMaterial = ref(null);
    // const selectedModel = ref(null);
    // const selectedColor = ref(null);
    // const selectedSize = ref(null);
    // ////////////////////////

    // const ref1 = ref(null);
    // const ref2 = ref(null);
    // const ref3 = ref(null);

    const colorsRate = ref(["#99A9BF", "#F7BA2A", "#FF9900"]);

    const open = ref(false);
    //////////////////////////
    defineEmits(["rating-dialog"]);

    const store = useStore();
    const product = computed(() => store.state.products.product);
    const imageLink = ref(null);
    const selectedImage = ref(null);
    const images = computed(()=> props?.newImages?.length>0 ? props.newImages : product.value.productImage);

    function updateImageLink(index = 0) {
        selectedImage.value = index;
        imageLink.value = images.value[index];
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
        () => images.value,
        (newValue) => {
            if (newValue.length > 0) {
                updateImageLink();
            }
        }
    );

    // const buttons = ref(null);

    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach((entry) => {
    //         if (entry.isIntersecting) {
    //             if (product.value.productImage && product.value.productImage.length > 0) {
    //                 if (!localStorage.getItem("tourShown")) {
    //                     open.value = true;
    //                     localStorage.setItem("tourShown", "true");
    //                     document.body.style.overflow = "hidden";
    //                 }
    //             }
    //         }
    //     });
    // });

    onBeforeMount(() => {
        if (product.value.productImage && product.value.productImage.length > 0) {
            images.value = product.value.productImage;
            updateImageLink();
        }
        //     if (buttons.value) {
        //         observer.observe(buttons.value);
        //     }
    });

    // const updateHead = () => {
    //     useHead({
    //         title: `${product.value?.productName || "Produto"} - ${store.state?.storeName}`,
    //         meta: [
    //             {
    //                 name: "description",
    //                 content: `Compre o ${product.value?.productName || "Produto"}. Confira agora!`,
    //             },
    //         ],
    //     });
    // };

    // watch(() => [product.value.productName, store.state.storeName], updateHead, { immediate: true });
</script>

<style scoped>
    .chip-image {
        width: 50px;
        height: 50px;
    }

    .v-slide-group__content {
        flex-wrap: wrap;
    }

    .changeImage {
        flex-direction: row;
    }
    @media (min-width: 1021px) {
        .changeImage {
            flex-direction: column;
            width: min-content;
            padding: 0 4px;
        }
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
