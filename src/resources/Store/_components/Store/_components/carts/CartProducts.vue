<template lang="">
    <div class="flex flex-col lg:items-start lg:flex-row lg:pr-5 flex-1 gap-4 flex-wrap">
        <div class="flex-1">
            <CartProductsComp
                :cartProducts="cartProducts"
                :TableRowHeight="'h-40'" />
        </div>
        <div class="shadow-md py-4 border-t-4 rounded-md mt-4 text-center w-full max-w-[410px] lg:w-[410px] flex flex-col gap-6">
            <h1>Resumo do pedido</h1>

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
            <Button
                @click="makeOrder()"
                class="w-max lg:w-full self-end">
                Fazer pedido
            </Button>
        </div>
    </div>
</template>
<script setup>
    import CartProductsComp from "@/resources/Store/_components/CartProductsComp.vue";
    import { computed, ref } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

    const store = useStore();
    const router = useRouter();

    const cartProducts = ref(computed(() => store.getters.cartProducts));

    function makeOrder() {
        router.push({ name: "makeOrder" });
    }

    // Calculando o preço total de produtos
    const priceTotal = computed(() => {
        return calculatePriceTotal(store.getters.cartProducts);
    });
    // Calculando o total do pedido
    const totalPedido = computed(() => {
        return priceTotal.value + taxaEnvio.value;
    });

    // Definindo uma taxa de envio fixa
    const taxaEnvio = ref(10);

    // Função para calcular o preço total de produtos
    const calculatePriceTotal = (cartProducts) => {
        return cartProducts.reduce((total, product) => total + product.subtotal, 0);
    };

    // Função para formatar valores monetários
    const formatCurrency = (value) => {
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };
</script>
