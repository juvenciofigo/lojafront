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
            class="w-full flex justify-center"
            style="width: calc(100% - 1px)">
            <CartProductsComp
                :cart="cart"
                :TableRowHeight="'h-40'" />
        </div>

        <div
            v-if="cart && cart.items && cart.items.length > 0"
            v-loading="loadingPriceUpdate"
            class="shadow-md rounded-md text-center w-full md:max-w-[410px] flex flex-col gap-6 bg-white">
            <div>
                <p class="my-1 font-semibold text-lg">Resumo do pedido</p>
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
                    class="w-full m-1"
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
    const cart = computed(() => store.state.cart);
    const isAuthenticated = computed(() => store.getters.isAuthenticated("authToken"));

    const priceTotal = computed(() => store.getters.cart.totalProducts);
    const shippingPrice = ref(10);
    const totalPedido = computed(() => priceTotal.value + shippingPrice.value);
    const buttonStatus = ref(true);
    const skeleton = ref(true);
    const loadingPriceUpdate = computed(() => store.getters.loadingPriceUpdate);

    onBeforeMount(async () => {
        await store.dispatch("displayCartProducts", isAuthenticated.value);
        skeleton.value = false;
    });

    watch(cart, (newCartProducts) => {
        buttonStatus.value = !newCartProducts.items || newCartProducts.items.length === 0;
    });

    function makeOrder() {
        router.push({ name: "makeOrder", query: { productsFrom: "cartProducts" } });
    }
</script>
