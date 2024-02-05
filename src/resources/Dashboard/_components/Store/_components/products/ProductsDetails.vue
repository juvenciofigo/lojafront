<template>
    <div class="flex relative flex-row flex-1 gap-1 m-2 rounded-md bg-white">
        <div class="absolute bottom-0 top-[4px] right-0 flex-1 w-full flex flex-col overflow-auto bg-white gap-2 flex-nowrap">
            <div class="flex flex-col">
                <div class="flex flex-row items-center p-2 gap-3">
                    <div>
                        <div class="flex flex-row items-center p-2 gap-3">
                            <div class="flex flex-col p-1 h-max justify-center bg-slate-100 gap-2 rounded-md">
                                <template v-for="(image, index) in product.productImage" :key="index">
                                    <button @click="updateImageLink(index)" class="rounded-sm bg-white w-[40px] h-[40px]">
                                        <img :src="image" alt="Imagem do Produto" class="rounded-sm" />
                                    </button>
                                </template>
                            </div>
                            <div class="max-w-[312px] self-center">
                                <img v-if="product.productImage && product.productImage.length > 0" :src="imageLink" class="object-cover" alt="Imagem do Produto" />
                            </div>
                        </div>

                        <div class="flex flex-row justify-center gap-4">
                            <button>(apagar)</button>
                            <button>(actualiza)</button>
                        </div>
                    </div>

                    <div class="drop-shadow-md flex-1 self-start flex flex-col p-3 gap-4">
                        <div>
                            <h1>{{ product.productName }}</h1>
                        </div>
                        <div>
                            <v-rating readonly item-aria-label="custom icon label text {0} of {1}" size="small" :length="5" :model-value="classificacaoGeral" active-color="primary" />
                        </div>
                        <div class="text-lg">
                            <p v-if="product.productPromotion">
                                <Span class="font-medium text-sm">Preço: </Span>
                                {{ product.productPromotion }}
                                <span class="text-xs">MZN</span>
                            </p>
                            <p v-else>
                                <Span class="font-medium text-base">Preço: </Span>
                                {{ product.productPrice }}
                                <span class="text-xs">MZN</span>
                            </p>
                        </div>
                        <div>
                            <p class="mb-1 font-semibold text-lg underline decoration-slate-300 line underline-offset-3">Descrição:</p>

                            <p class="font-normal">{{ product.productDescription }}</p>
                        </div>
                    </div>
                </div>
                <div class="p-4 ml-2">
                    <h2 class="mb-4 font-semibold text-lg underline decoration-slate-300 line underline-offset-3">Especificaçõoes:</h2>
                    <div>
                        <v-table density="compact" v-if="product.productSpecifications && product.productSpecifications.length > 0">
                            <tbody>
                                <tr v-for="(spec, index) in product.productSpecifications" :key="index">
                                    <td>{{ spec.SpecificationName }}</td>
                                    <td>{{ spec.SpecificationText }}</td>
                                </tr>
                            </tbody>
                        </v-table>
                        <p v-else>Sem Especificacoes!!!</p>
                    </div>
                </div>
            </div>
            <div class="p-3">
                <h2 class="mb-4 font-semibold text-lg underline decoration-slate-300 line underline-offset-3">Avaliações:</h2>
                <div class="flex flex-col gap-4">
                    <template v-if="product.productRatings && product.productRatings.length > 0">
                        <template v-for="rating in product.productRatings" :key="rating.id">
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
    import { useRoute } from "vue-router";
    import { ref, computed, onMounted, watch } from "vue";

    const store = useStore();
    const route = useRoute();
    const product = computed(() => store.state.product);
    const imageLink = ref(null);

    function back() {
        window.history.back();
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

    function apagar() {
        store.dispatch("deleteProduct", route.params.id);
    }

    onMounted(() => {
        store.dispatch("detailsProduct", route.params.id);
    });

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
