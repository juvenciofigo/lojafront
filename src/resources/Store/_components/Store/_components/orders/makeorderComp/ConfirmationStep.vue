<template>
    <div class="flex flex-col">
        <CartProductsComp
            class="self-center"
            :cart="cart"
            :tableRowHeight="'h-20'"
            :actionButton="'hidden'" />
        <br />
        <div class="flex flex-row justify-end">
            <Table v-loading="loadingPriceUpdate">
                <TableBody>
                    <TableRow>
                        <TableCell class="flex h-10 flex-row items-center justify-between">
                            <div>Total de produtos:</div>
                            <div>{{ formatCurrency(priceTotal) }}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell class="flex h-10 flex-row items-center justify-between">
                            <div>Taxa de envio</div>
                            <div>{{ formatCurrency(shippingPrice) }}</div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell class="flex h-10 flex-row items-center justify-between">
                            <div>Total</div>
                            <div>{{ formatCurrency(totalPedido) }}</div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        <br />
    </div>
</template>
<script setup>
    import { useStore } from "vuex";
    import { computed, ref, defineEmits, onBeforeMount, watch } from "vue";
    import CartProductsComp from "@/resources/Store/_components/CartProductsComp.vue";
    import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
    import { formatCurrency } from "@/util/functions";

    const store = useStore();
    const shippingPrice = ref(0);
    const cart = computed(() => store.state.carts.cart);
    const priceTotal = computed(() => store.getters["carts/totalProducts"]);
    const totalPedido = computed(() => priceTotal.value + shippingPrice.value);
    const confirmationData = ref(null);
    const loadingPriceUpdate = computed(() => store.getters.loadingPriceUpdate);

    const emit = defineEmits(["submit"]);

    function sendData() {
        confirmationData.value = {
            totalProductsPrice: priceTotal.value,
            shippingPrice: shippingPrice.value,
            total: totalPedido.value,
        };
        emit("submit", confirmationData.value);
    }

    watch(
        cart,
        (after) => {
            if (!after.items || after.items.length === 0) {
                window.location.reload();
                return;
            }
            sendData();
        },
        { immediate: true }
    );

    watch(priceTotal, () => {
        sendData();
    });

    onBeforeMount(() => {
        sendData();
    });
</script>
