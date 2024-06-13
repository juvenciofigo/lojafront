<template>
    <v-stepper-window-item :value="2">
        <CartProductsComp
            :cartProducts="cartProducts"
            :image="'hidden'"
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
    import { computed, ref, watch, defineEmits, onBeforeMount } from "vue";
    import CartProductsComp from "@/resources/Store/_components/CartProductsComp.vue";
    import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

    const store = useStore();
    const cartProducts = computed(() => store.state.cartProducts);

    // Função para formatar valores monetários
    const formatCurrency = (value) => {
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };

    // Calculando o preço total de produtos
    const priceTotal = computed(() => calculatePriceTotal(cartProducts.value));

    // Definindo uma taxa de envio fixa
    const shippingPrice = ref(10);

    // Calculando o total do pedido
    const totalPedido = computed(() => priceTotal.value + shippingPrice.value);

    // Função para calcular o preço total de produtos
    const calculatePriceTotal = (cartProducts) => cartProducts.reduce((total, product) => total + product.subtotal, 0);

    const emit = defineEmits(["inFocus", "submit"]);

    const confirmationData = ref(null);

    function sendData() {
        emit("submit", confirmationData.value);
    }

    watch(cartProducts, () => {
        confirmationData.value = {
            totalProductsPrice: priceTotal.value,
            shippingPrice: shippingPrice.value,
            total: totalPedido.value,
        };
    });

    watch(priceTotal, () => {
        sendData();
    });

    onBeforeMount(() => {
        sendData();
    });
    
</script>
<style lang=""></style>
