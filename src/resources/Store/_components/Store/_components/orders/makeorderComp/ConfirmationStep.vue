<template>
    <v-stepper-window-item :value="3">
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
                            <div>{{ formatCurrency(taxaEnvio) }}</div>
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
        <div class="flex flex-row justify-end">
            <Button
                class="self-end w-max"
                @click="$emit('sendOrder')">
                Finalizar Pedido
            </Button>
        </div>
    </v-stepper-window-item>
</template>
<script setup>
    import { useStore } from "vuex";

    import { computed, ref } from "vue";
    import CartProductsComp from "@/resources/Store/_components/CartProductsComp.vue";

    import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

    const store = useStore();
    const cartProducts = computed(() => store.getters.cartProducts);

    // Função para formatar valores monetários
    const formatCurrency = (value) => {
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };

    // Calculando o preço total de produtos
    const priceTotal = computed(() => {
        return calculatePriceTotal(cartProducts.value);
    });

    // Definindo uma taxa de envio fixa
    const taxaEnvio = ref(10);

    // Calculando o total do pedido
    const totalPedido = computed(() => {
        return priceTotal.value + taxaEnvio.value;
    });

    // Função para calcular o preço total de produtos
    const calculatePriceTotal = (cartProducts) => {
        return cartProducts.reduce((total, product) => total + product.subtotal, 0);
    };
</script>
<style lang=""></style>
