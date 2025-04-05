<template lang="">
    <ProductDetaislsSkeleton v-if="skeleton"></ProductDetaislsSkeleton>
    <!-- prettier-ignore -->
    <ProductDetailsComp
        v-if="!skeleton && product"
        :firstButton="addToCart"
        :secondButton="buyNow"
        :thirdButton="callWhatsapp"
        :first-icon="`Delete`"

        :titleFirst="`Adicionar`"
        :titleSecond="`Comprar Agora`"
        :titleThird="`Whatsapp`"

        :styl_thirdbutton="`primary`"
        :styl_firstbutton="`primary`"
        :styl_secondbutton="`success`"
        :styl_fourthbutton="`hidden`"
        :styl_fifthbutton="`hidden`"

        :loading_button="loading_button"

        @value-updated="handleValueUpdate"
        @material-Value="materialValue"
        @sizes-Value="sizesValue"
        @color-Value="colorValue"
        @rating-dialog="ratingDialog = true"
        @model-Value="modelValue">

       >

    </ProductDetailsComp>

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
    import { ref, computed, toRaw, onBeforeMount } from "vue";
    import { useStore } from "vuex";
    // import { useRoute, useRouter } from "vue-router";
    import { useRoute } from "vue-router";
    import ProductDetailsComp from "@/resources/_components/ProductDetailsComp.vue";
    import ProductDetaislsSkeleton from "@/components/skeletons/ProductDetaislsSkeleton.vue";
    import { X } from "lucide-vue-next";
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    const store = useStore();
    const route = useRoute();
    // const router = useRouter();
    const isAuthenticated = computed(() => store.getters.isAuthenticated("authToken"));
    const product = computed(() => store.state.products.product);
    const loading_button = ref(false);
    const ratingButtonLoading = ref(false);
    const ratingDialog = ref(false);
    const skeleton = ref(true);
    const variation = ref({});
    const quantity = ref(1);

    function handleValueUpdate(value) {
        quantity.value = value;
    }
    function materialValue(value) {
        variation.value.material = value;
    }
    function sizesValue(value) {
        variation.value.size = value;
    }
    function colorValue(value) {
        variation.value.color = value;
    }
    function modelValue(value) {
        variation.value.model = value;
    }
    import { ElNotification } from "element-plus";

    const notification = (message) => {
        ElNotification({
            title: "Erro!",
            message: message,
            type: "error",
            position: "top-left",
        });
    };
    const verifyVaraiations = async () => {
        let error = null;
        const colors = await computed(() => product.value.productVariations.filter((item) => item.variationType === "Cor"));
        const sizes = await computed(() => product.value.productVariations.filter((item) => item.variationType === "Tamanho"));
        const models = await computed(() => product.value.productVariations.filter((item) => item.variationType === "Modelo"));
        const materials = await computed(() => product.value.productVariations.filter((item) => item.variationType === "Material"));

        if (colors.value.length && !variation.value.color) {
            return "Selecione a cor";
        }
        if (sizes.value.length && !variation.value.size) {
            return "Selecione o tamanho";
        }
        if (models.value.length && !variation.value.model) {
            return "Selecione o modelo";
        }
        if (materials.value.length && !variation.value.material) {
            return "Selecione o material";
        }
        return error;
    };

    async function addToCart() {
        const res = await verifyVaraiations();

        if (res) {
            notification(res);
            loading_button.value = false;
            return;
        }
        loading_button.value = true;
        store.commit("SET_loadingPriceUpdate");

        await store.dispatch("carts/addToCart", { isAuthenticated: isAuthenticated.value, item: { productId: route.params.id, variation: toRaw(variation.value), quantity: quantity.value || 1 } });

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
