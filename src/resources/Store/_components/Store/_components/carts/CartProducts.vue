<template lang="">
    <div class="flex flex-col lg:items-start lg:flex-row lg:pr-5 flex-1 gap-4 flex-wrap">
        <div class="flex-1">
            <CartProductsComp
                :cart="cart"
                :TableRowHeight="'h-40'" />
        </div>
        <div class="shadow-md p-4 rounded-md mt-4 text-center w-full max-w-[410px] lg:w-[410px] flex flex-col gap-6 bg-white">
            <h1>Resumo do pedido</h1>
            <div
                v-if="skeleton"
                class="w-full mx-auto">
                <v-skeleton-loader
                    class="w-full"
                    type="table,">
                </v-skeleton-loader>
            </div>

            <Table v-else>
                <TableBody>
                    <TableRow>
                        <TableCell class="h-10 items-center flex flex-row justify-between">
                            <div>Total de produtos:</div>
                            <div>{{ formatCurrency(priceTotal) }}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell class="items-center h-10 flex flex-row justify-between">
                            <div>Taxa de envio</div>
                            <div>{{ formatCurrency(shippingPrice) }}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell class="items-center h-10 flex flex-row justify-between">
                            <div>Total</div>
                            <div>{{ formatCurrency(totalPedido) }}</div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <v-btn
                :disabled="buttonStatus"
                @click="makeOrder()"
                class="w-max lg:w-full self-end">
                Fazer pedido
            </v-btn>
        </div>
    </div>
</template>

<script setup>
    import CartProductsComp from "@/resources/Store/_components/CartProductsComp.vue";
    import { computed, ref, onBeforeMount, watch } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

    const store = useStore();
    const router = useRouter();
    const cart = computed(() => store.state.cart);
    const isAuthenticated = computed(() => store.getters.isAuthenticated("authToken"));

    const priceTotal = computed(() => store.getters.cart.totalProducts);
    const shippingPrice = ref(10);
    const totalPedido = computed(() => priceTotal.value + shippingPrice.value);
    const buttonStatus = ref(true);
    const skeleton = ref(true);

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
