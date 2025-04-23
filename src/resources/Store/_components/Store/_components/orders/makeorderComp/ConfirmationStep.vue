<template>
    <div class="flex flex-col">
        <CartProductsComp
            class="self-center"
            :cart="cart"
            :tableRowHeight="'h-20'"
            :actionButton="'hidden'" />
        <br />
        <div
            class="w-full"
            v-loading="loadingPriceUpdate">
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
        </div>
        <br />
    </div>
</template>
<script setup>
    import { useStore } from "vuex";
    import { computed, ref, defineEmits, onBeforeMount, watch } from "vue";
    import CartProductsComp from "@/resources/Store/_components/CartProductsComp.vue";
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
<style>
    .el-descriptions {
        --el-descriptions-table-border: ;
    }
</style>
