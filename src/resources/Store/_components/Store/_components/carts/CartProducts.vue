<template lang="">
    <div
        v-if="skeleton"
        class="mx-auto w-full">
        <v-skeleton-loader
            class="w-full"
            type="table,">
        </v-skeleton-loader>
    </div>
    <div
        v-else
        class="flex flex-col gap-4 p-3 lg:flex-row lg:items-start lg:pr-5">
        <div
            v-if="cart"
            class="flex w-full justify-center">
            <CartProductsComp :cart="cart" />
        </div>

        <div
            v-if="cart && cart.items && cart.items.length > 0"
            v-loading="loadingPriceUpdate"
            class="flex w-full flex-col gap-6 rounded-md bg-white text-center shadow-md md:max-w-[410px]">
            <div>
                <p class="my-1 text-lg font-semibold">Resumo do pedido</p>
                <el-descriptions
                    title=""
                    direction="horizontal"
                    :column="1"
                    border>
                    <el-descriptions-item label="Total de produtos:">{{ formatCurrency(priceTotal) }}</el-descriptions-item>
                    <el-descriptions-item label="Taxa de envio:">{{ formatCurrency(shippingPrice) }}</el-descriptions-item>
                    <el-descriptions-item label="Total">{{ formatCurrency(totalPedido) }}</el-descriptions-item>
                </el-descriptions>
                <el-button
                    class="my-1 w-full"
                    :disabled="buttonStatus"
                    size="small"
                    @click="makeOrder()">
                    Fazer pedido
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import CartProductsComp from "@/resources/Store/_components/CartProductsComp.vue";
    import { computed, ref, onBeforeMount, watch } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import { formatCurrency } from "@/util/functions";

    const store = useStore();
    const router = useRouter();
    const isAuthenticated = computed(() => store.getters.isAuthenticated("authToken"));

    const cart = computed(() => store.state.carts.cart);
    const priceTotal = computed(() => store.getters["carts/totalProducts"]);
    const loadingPriceUpdate = computed(() => store.getters.loadingPriceUpdate);

    const shippingPrice = ref(0);
    const totalPedido = computed(() => priceTotal.value + shippingPrice.value);
    const buttonStatus = ref(true);
    const skeleton = ref(true);

    onBeforeMount(async () => {
        await store.dispatch("carts/displayCartProducts", isAuthenticated.value);
        skeleton.value = false;
    });

    watch(cart, (newCartProducts) => {
        buttonStatus.value = !newCartProducts.items || newCartProducts.items.length === 0;
    });

    function makeOrder() {
        router.push({ name: "order-create", query: { productsFrom: "cartProducts" } });
    }
</script>
