<template lang="">
    <ProductDetailsComp
        :firstButton="addToCart"
        :titleFirst="`Adicionar ao carinho`"
        :styl_firstbutton="`bg-blue-400 hover:bg-blue-200 text-sm p-1 rounded-md duration-300`"
        :secondButton="buyNow"
        :titleSecond="`Comprar Agora`"
        :styl_secondbutton="`bg-green-400 hover:bg-green-200 p-1 rounded-md duration-300`"
        @value-updated="handleValueUpdate"
        @material-Value="materialValue"
        @sizes-Value="sizesValue"
        @color-Value="colorValue"
        @model-Value="modelValue" />
</template>
<script setup>
    import { onMounted, ref, computed, toRaw } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";
    import ProductDetailsComp from "@/resources/_components/ProductDetailsComp.vue";

    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const variation = ref({});
    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));
    const quantity = ref(1);
    const product = computed(() => store.state.product);

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

    const verifyVaraiations = async () => {
        let error = null;
        const colors = await computed(() => product.value.productVariations.filter((item) => item.variationType === "Cor"));
        const sizes = await computed(() => product.value.productVariations.filter((item) => item.variationType === "Tamanho"));
        const models = await computed(() => product.value.productVariations.filter((item) => item.variationType === "Modelo"));
        const materials = await computed(() => product.value.productVariations.filter((item) => item.variationType === "Material"));

        if (colors.value.length && !variation.value.color) {
            return { error: "Selecione a cor" };
        }
        if (sizes.value.length && !variation.value.size) {
            return { error: "Selecione o tamanho" };
        }
        if (models.value.length && !variation.value.model) {
            return { error: "Selecione o modelo" };
        }
        if (materials.value.length && !variation.value.material) {
            return { error: "Selecione o material" };
        }
        return error;
    };

    async function addToCart() {
        const res = await verifyVaraiations();

        if (res) {
            store.commit("updateSnackbar", { show: true, text: res.error, color: "red" });
            return;
        }
        await store.dispatch("addToCart", { isAuthenticated: isAuthenticated.value, item: { productId: route.params.id, variation: toRaw(variation.value), quantity: quantity.value || 1 } });
        await store.dispatch("displayTempCartPrices", isAuthenticated.value);
    }

    async function buyNow() {
        const res = await verifyVaraiations();

        if (res) {
            store.commit("updateSnackbar", { show: true, text: res.error, color: "red" });
            return;
        }
        router.push({ name: "makeOrder", query: { productsFrom: "payNow", product: route.params.id, quantity: quantity.value || 1, variation: toRaw(variation.value) } });
    }

    onMounted(() => {
        store.dispatch("detailsProduct", route.params.id);
    });
</script>
