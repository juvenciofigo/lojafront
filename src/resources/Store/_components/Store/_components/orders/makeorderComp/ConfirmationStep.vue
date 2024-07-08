<template>
    <v-stepper-window-item :value="2">
        <CartProductsComp
            :cart="cart"
            :tableRowHeight="'h-20'"
            :actionButton="'hidden'" />
        <br />
        <div class="flex flex-row justify-end">
            <Table>
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
        </div>
        <br />
    </v-stepper-window-item>
</template>
<script setup>
    import { useStore } from "vuex";
    import { computed, ref, defineEmits, onBeforeMount, watch } from "vue";
    import CartProductsComp from "@/resources/Store/_components/CartProductsComp.vue";
    import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

    const store = useStore();
    const shippingPrice = ref(10);
    const cart = computed(() => store.getters.cart);
    const priceTotal = computed(() => store.getters.cart.totalProducts);
    const totalPedido = computed(() => priceTotal.value + shippingPrice.value);
    const confirmationData = ref(null);

    const formatCurrency = (value) => {
        if (typeof value !== "number" || isNaN(value)) {
            return "MZN 0.00";
        }
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };

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
        () => {
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
