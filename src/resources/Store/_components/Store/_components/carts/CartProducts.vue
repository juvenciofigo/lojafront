<template lang="">
    <div
        v-if="skeleton"
        class="w-full mx-auto">
        <v-skeleton-loader
            class="w-full"
            type="table,">
        </v-skeleton-loader>
    </div>
    <div
        v-else
        class="flex flex-col lg:items-start lg:flex-row lg:pr-5 gap-4 p-3">
        <div
            v-if="cart"
            class="w-full flex justify-center">
            <CartProductsComp :cart="cart" />
        </div>

        <div
            v-if="cart && cart.items && cart.items.length > 0"
            v-loading="loadingPriceUpdate"
            class="shadow-md text-center w-full md:max-w-[350px] flex flex-col gap-1 bg-foreground_2 text-text_2">
            <p class="font-semibold text-lg ">Resumo do pedido</p>
            <el-descriptions
                border
                size="small"
                direction="horizontal"
                :column="1">
                <el-descriptions-item
                    align="center"
                    label-class-name="tabela"
                    class-name="tabela"
                    label="Total de produtos:"
                    >{{ formatCurrency(priceTotal) }}</el-descriptions-item
                >
                <el-descriptions-item
                    align="center"
                    label-class-name="tabela"
                    class-name="tabela"
                    label="Taxa de envio:"
                    >{{ formatCurrency(shippingPrice) }}</el-descriptions-item
                >
                <el-descriptions-item
                    align="center"
                    label-class-name="tabela"
                    class-name="tabela"
                    label="Total"
                    >{{ formatCurrency(totalPedido) }}</el-descriptions-item
                >
            </el-descriptions>
            <el-link
                class="w-full my-1"
                :disabled="buttonStatus"
                size="small"
                @click="makeOrder()">
                Fazer pedido
            </el-link>
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
<style>
    /* .el-descriptions__body,
    .el-descriptions__cell {
        background: var(--foreground_2) !important;
        color: var(--text_2) !important;
    } */
</style>
