<template lang="">
    <div class="flex flex-col lg:items-start lg:flex-row lg:pr-5 flex-1 gap-4 flex-wrap p-3">
        <div
            class="flex-1 w-full flex justify-center"
            style="width: calc(100% - 1px)">
            <CartProductsComp
                v-if="cart"
                :cart="cart"
                :TableRowHeight="'h-40'" />
        </div>

        <div
            v-loading="loadingPriceUpdate"
            class="shadow-md p-4 rounded-md mt-4 text-center w-full max-w-[410px] lg:w-[410px] flex flex-col gap-6 bg-white">
            <div
                v-if="skeleton"
                class="w-full mx-auto">
                <v-skeleton-loader
                    class="w-full"
                    type="table,">
                </v-skeleton-loader>
            </div>

            <el-descriptions
                title="Resumo do pedido"
                direction="horizontal"
                :column="1"
                :size="size"
                border>
                <el-descriptions-item label="Total de produtos:">{{ formatCurrency(priceTotal) }}</el-descriptions-item>
                <el-descriptions-item label="Taxa de envio:">{{ formatCurrency(shippingPrice) }}</el-descriptions-item>
                <el-descriptions-item label="Total">{{ formatCurrency(totalPedido) }}</el-descriptions-item>
            </el-descriptions>

            <el-button
                :disabled="buttonStatus"
                size="small"
                @click="makeOrder()">
                Fazer pedido
            </el-button>
        </div>
    </div>
</template>

<script setup>
    import CartProductsComp from "@/resources/Store/_components/CartProductsComp.vue";
    import { computed, ref, onBeforeMount, watch } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    const store = useStore();
    const router = useRouter();
    const cart = computed(() => store.state.cart);
    const isAuthenticated = computed(() => store.getters.isAuthenticated("authToken"));

    const priceTotal = computed(() => store.getters.cart.totalProducts);
    const shippingPrice = ref(10);
    const totalPedido = computed(() => priceTotal.value + shippingPrice.value);
    const buttonStatus = ref(true);
    const skeleton = ref(true);
    const loadingPriceUpdate = ref(computed(() => store.getters.loadingPriceUpdate));

    onBeforeMount(async () => {
        await store.dispatch("displayCartProducts", isAuthenticated.value);
        skeleton.value = false;
    });

    const formatCurrency = (value) => {
        if (typeof value !== "number" || isNaN(value)) {
            return "MZN 0.00";
        }
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };

    watch(cart, (newCartProducts) => {
        buttonStatus.value = !newCartProducts.items || newCartProducts.items.length === 0;
    });

    function makeOrder() {
        router.push({ name: "makeOrder", query: { productsFrom: "cartProducts" } });
    }
</script>
