<template>
    <div class="flex flex-col p-1 md:p-2 gap-1">
        <div class="Images/Descriptions flex flex-col md:flex-row gap-1">
            <div class="Images bg-white rounded-md p-2 md:p-4">
                <div class="images flex flex-row items-center p-2 gap-3">
                    <div class="flex flex-col p-1 h-max justify-center bg-slate-100 gap-2 rounded-md">
                        <template
                            v-for="(image, index) in product.productImage"
                            :key="index">
                            <button
                                @click="updateImageLink(index)"
                                class="rounded-sm bg-white w-[40px] h-[40px]">
                                <img
                                    :src="image"
                                    alt="Imagem do Produto"
                                    class="rounded-sm" />
                            </button>
                        </template>
                    </div>
                    <div class="max-w-[312px] self-center">
                        <img
                            v-if="product.productImage && product.productImage.length > 0"
                            :src="imageLink"
                            class="object-cover"
                            alt="Imagem do Produto" />
                    </div>
                </div>

                <div class="button flex flex-wrap flex-row justify-center gap-4">
                    <Button
                        variant="destructive"
                        @click="firstButton"
                        >{{ titleFirst }}</Button
                    >
                    <Button @click="secondButton">{{ titleSecond }}</Button>
                    <button
                        :class="styl"
                        @click="thirdButton">
                        {{ titleThird }}
                    </button>
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
                </div>
            </div>
            <!-- end Images -->

            <div class="Descriptions flex-1 flex flex-col gap-4 bg-white rounded-md p-2 md:p-4">
                <div>
                    <h1>{{ product.productName }}</h1>
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
                        {{ product.productPromotion }}
                        <span class="text-xs">MZN</span>
                    </p>
                    <p v-else>
                        <span class="font-medium text-base">Preço: </span>
                        {{ product.productPrice }}
                        <span class="text-xs">MZN</span>
                    </p>
                </div>
                <div>
                    <p class="mb-1 font-semibold text-lg underline decoration-slate-300 line underline-offset-3">Descrição:</p>

                    <p
                        v-html="product.productDescription"
                        class="font-normal text"></p>
                </div>
            </div>
            <!-- end Descriptions -->
        </div>
        <!-- end Images/Descriptions  -->
        <div class="Especificatios/Avaliations flex flex-col gap-1">
            <div class="Especificatios bg-white rounded-md p-2 md:p-4">
                <h2 class="mb-4 font-semibold text-lg underline decoration-slate-300 line underline-offset-3">Especificaçõoes:</h2>
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
                    <p v-else>Sem Especificacoes!!!</p>
                </div>
            </div>

            <!-- end Especifications -->

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
            <!-- end Avaliations -->
        </div>
        <!-- end Especificatios/Avaliations -->
    </div>
</template>

<script setup>
    import { format, differenceInHours } from "date-fns";
    import { useStore } from "vuex";
    import { ref, defineProps, computed, watch, defineEmits } from "vue";
    import { Button } from "@/components/ui/button";

    defineProps({
        firstButton: { type: Function, required: true },
        titleFirst: { type: String, required: true },
        titleSecond: { type: String, required: true },
        secondButton: { type: Function, required: true },
        titleThird: { type: String },
        thirdButton: { type: Function },
        styl: String,
    });
    const emits = defineEmits(["value-updated"]);
    const quantity = ref(1);

    const store = useStore();

    const product = computed(() => store.state.product);
    const imageLink = ref(null);

    function quantityValue(e) {
        emits("value-updated", e.target.value);
    }

    function updateImageLink(index) {
        imageLink.value = product.value.productImage[index];
    }
    function formatDate(date) {
        return format(new Date(date), "dd/MM/yyyy");
    }

    function convertScoreToStars(score) {
        switch (score) {
            case 1:
                return "★";
            case 2:
                return "★★";
            case 3:
                return "★★★";
            case 4:
                return "★★★★";
            case 5:
                return "★★★★★";
            default:
                return 0;
        }
    }

    const timeShow = (date) => {
        const diferencaHoras = differenceInHours(new Date(), new Date(date));
        if (diferencaHoras < 2) `${diferencaHoras} hora atrás`;
        if (diferencaHoras < 24) `${diferencaHoras} horas atrás`;
        return null;
    };

    watch(
        () => product.value.productImage,
        (newValue) => {
            imageLink.value = newValue[0];
        }
    );

    // media de avaliacoes

    function calcularMediaRating(scores) {
        if (!scores || scores.length === 0) {
            return 0;
        }

        const somaScores = scores.reduce((total, rating) => total + rating.ratingScore, 0);

        const media = somaScores / scores.length;

        return media;
    }

    function determinarClassificacaoGeral(product) {
        const mediaRating = calcularMediaRating(product.productRatings);

        if (mediaRating) {
            return mediaRating;
        }
    }

    const classificacaoGeral = computed(() => determinarClassificacaoGeral(product.value));
</script>
