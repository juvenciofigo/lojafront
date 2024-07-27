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
        <form @submit.prevent="submitVariation">
            <div class="mb-4">
                <!-- <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="variationType"
                    >Tipo da Variação:</label
                >
                <input
                    v-model="variation.variationType"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Tipo da Variação" /> -->
                <div class="flex flex-col gap-2">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-2"
                        for="variationType">
                        Tipo da Variação:
                    </label>
                    <v-select
                        placeholder="Selecione o modelo"
                        :bg-color="`#FFFFFF`"
                        :hide-details="true"
                        clearable
                        flat
                        density="compact"
                        variant="solo-filled"
                        v-model="variation.variationType"
                        :items="[`Modelo`, `Cor`, `Tamanho`, `Material`]"
                        item-title="statusName"
                        item-value="statusValue"></v-select>
                </div>
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="variationValue"
                    >Valor da Variação:</label
                >
                <input
                    v-model="variation.variationValue"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Valor da Variação" />
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="sku"
                    >SKU:</label
                >
                <input
                    v-model="variation.sku"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="SKU" />
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="variationPrice"
                    >Preço da Variação:</label
                >
                <input
                    v-model.number="variation.variationPrice"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="Preço da Variação" />
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="variationPromotion"
                    >Promoção da Variação:</label
                >
                <input
                    v-model.number="variation.variationPromotion"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="Promoção da Variação" />
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="variationImage"
                    >URLs das Imagens:</label
                >
                <input
                    v-model="variation.variationImage"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="URLs das Imagens (separadas por vírgula)" />
            </div>

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Detalhes de Entrega:</label>
                <div class="mb-2">
                    <label class="block text-gray-700 text-sm font-bold mb-1">Dimensões (cm):</label>
                    <div class="flex items-center">
                        <input
                            v-model.number="variation.delivery.dimensions.heightCm"
                            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                            type="number"
                            placeholder="Altura" />
                        <input
                            v-model.number="variation.delivery.dimensions.widthCm"
                            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                            type="number"
                            placeholder="Largura" />
                        <input
                            v-model.number="variation.delivery.dimensions.depthCm"
                            class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                            type="number"
                            placeholder="Profundidade" />
                    </div>
                </div>
                <div class="mb-2">
                    <label
                        class="block text-gray-700 text-sm font-bold mb-1"
                        for="weight"
                        >Peso (kg):</label
                    >
                    <input
                        v-model.number="variation.delivery.weight"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Peso" />
                </div>
                <div class="mb-4 inline-block mr-4">
                    <label class="flex items-center">
                        <input
                            v-model.number="variation.variationStock"
                            class="mr-2 leading-tight"
                            type="checkbox" />
                        <span class="text-sm"> Disponível </span>
                    </label>
                </div>
                <div class="mb-4 inline-block">
                    <label class="flex items-center">
                        <input
                            v-model="variation.delivery.shippingFree"
                            class="mr-2 leading-tight"
                            type="checkbox" />
                        <span class="text-sm"> Frete Grátis </span>
                    </label>
                </div>
            </div>

            <div class="flex items-center justify-between">
                <v-btn
                    :loading="loading"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    <div>
                        <span v-if="selectedVariation">Modificar</span>
                        <span v-else>Criar Variação</span>
                    </div>
                </v-btn>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { ref, computed, onBeforeMount, toRaw } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { useStore } from "vuex";

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const product = computed(() => store.state.product);
    const loading = ref(false);

    const formatCurrency = (value) => {
        return Number(value).toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };

    const selectedVariation = route.params.variation;

    const variation = ref({
        variationProduct: route.params.id,
        variationType: null,
        variationValue: null,
        sku: null,
        variationStock: true,
        variationPrice: 0,
        variationPromotion: null,
        variationImage: [],
        delivery: {
            dimensions: {
                heightCm: null,
                widthCm: null,
                depthCm: null,
            },
            weight: null,
            shippingFree: true,
        },
    });

    async function submitVariation() {
        if (!variation.value.variationType) {
            store.commit("updateSnackbar", { show: true, text: "Preencha correctamente o campo Tipo da variação!", color: "red" });
            return;
        }
        if (!variation.value.variationValue) {
            store.commit("updateSnackbar", { show: true, text: "Preencha correctamente o campo Valor da Variação!", color: "red" });
            return;
        }
        if (!variation.value.sku) {
            store.commit("updateSnackbar", { show: true, text: "Preencha correctamente o campo SKU", color: "red" });
            return;
        }

        let response = null;

        if (selectedVariation) {
            response = await store.dispatch("updateVariation", { id: route.params.variation, variation: toRaw(variation.value) });
            router.go(0);
            return;
        } else {
            response = await store.dispatch("addVariation", { product: route.params.id });
        }
        if (response === true) {
            clearForm();
        }
        loading.value = false;
        return;
    }

    function clearForm() {
        variation.value = {
            variationType: "",
            variationValue: "",
            sku: "",
            variationPrice: 0,
            variationPromotion: 0,
            variationStock: true,
            variationImage: [],
            delivery: {
                dimensions: {
                    heightCm: null,
                    widthCm: null,
                    depthCm: null,
                },
                weight: null,
                shippingFree: false,
            },
        };
    }

    onBeforeMount(async () => {
        await store.dispatch("detailsProductAdmin", route.params.id);
        if (selectedVariation) {
            const res = await store.dispatch("detailsVariarion", { variation: selectedVariation, product: route.params.id });
            variation.value = {
                variationProduct: route.params.id,
                variationType: res.variationType,
                variationValue: res.variationValue,
                sku: res.sku,
                variationStock: res.variationStock,
                variationPrice: res.variationPrice,
                variationPromotion: res.variationPromotion,
                variationImage: res.variationImage,
                delivery: {
                    dimensions: {
                        heightCm: res.delivery.dimensions.heightCm,
                        widthCm: res.delivery.dimensions.widthCm,
                        depthCm: res.delivery.dimensions.depthCm,
                    },
                    weight: res.delivery.weight,
                    shippingFree: res.delivery.shippingFree,
                },
            };
        }
    });
</script>
