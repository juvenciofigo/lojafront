<template lang="">
    <div class="flex flex-col flex-1 gap-2 overflow-auto">
        <div class="p-4">
            <Input
                class="max-w-sm"
                placeholder="Filter emails..." />
        </div>

        <el-table
            v-if="orderDocs && orderDocs.length > 0"
            :data="orderDocs"
            :fit="true"
            show-header
            size="small">
            <el-table-column
                fixed
                prop="referenceOrder"
                label="Referência" />
            <el-table-column
                prop="customer.lastName"
                label="Cliente" />
            <el-table-column
                prop="createdAt"
                label="Data"
                :formatter="formatDate" />
            <el-table-column
                prop="payment.amount"
                label="Total"
                :formatter="formatCurrency" />
            <el-table-column
                prop="payment.paymentMethod"
                label="Forma de pagamento" />
            <el-table-column
                prop="payment.status"
                label="Estado do pagamento" />
            <el-table-column
                prop="delivery.status"
                label="Estado da entrega" />
            <el-table-column
                fixed="right"
                label="Ações"
                min-width="120">
                <template #default="scope">
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click="handleView(scope.row)">
                        Ver
                    </el-button>
                    <el-button
                        link
                        type="danger"
                        size="small"
                        @click="confirmDelete(scope.row._id, scope.row.payment.status)">
                        Apagar
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div
            v-else
            class="text-center">
            <p>Sem pedidos</p>
        </div>

        <div class="flex items-center space-x-2 py-4">
            <v-pagination
                v-model="curentPage"
                @update:modelValue="pageEvent"
                :length="totalPages"
                :total-visible="4"
                density="compact"
                variant="flat">
            </v-pagination>
        </div>
        <el-dialog
            v-model="dialogVisible"
            :close="
                () => {
                    dialogVisible = false;
                }
            "
            :title="`Detalhes do Pedido ${selectedOrder.referenceOrder}`"
            :fullscreen="true">
            <v-card>
                <v-card-text class="bg-[#f3f3f9] p-1 overflow-x-hidden">
                    <OrdersDetails :order="selectedOrder">
                        <template #doPay>
                            <slot name="doPay"></slot>
                        </template>
                    </OrdersDetails>
                </v-card-text>
            </v-card>
        </el-dialog>

        <DialogConfirmation
            :dialog="showDialog"
            tileConfirmation="Deleção de Pedido"
            textConfirmation="Você tem certeza de que deseja deletar este pedido?"
            positiveConfirmation="Deletar"
            @update:dialog="showDialog = $event"
            @cancelar="handleCancel"
            @confirmar="handleConfirm" />
    </div>
</template>
<script setup>
    import { computed, watchEffect, ref, onBeforeUnmount, defineProps, defineEmits } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";
    import { format } from "date-fns";
    import { Input } from "@/components/ui/input";

    import OrdersDetails from "@/resources/_components/OrdersDetails.vue";
    import DialogConfirmation from "@/components/partials/DialogConfirmation.vue";

    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const props = defineProps({
        storeaction: String,
        route: String,
    });
    const orders = computed(() => store.state.orders);
    const orderDocs = ref(computed(() => orders.value.docs));
    const curentPage = ref(Number(route.query.offset) || 1);
    const totalPages = ref(computed(() => orders.value.totalPages));
    const offset = ref(computed(() => route.query.offset || 1));

    const dialogVisible = ref(false);
    const selectedOrder = ref({});

    const handleView = (row) => {
        selectedOrder.value = row;
        dialogVisible.value = true;
    };

    onBeforeUnmount(() => {
        store.commit("CLEAR_ORDERS");
    });
    function pageEvent(pageNumber) {
        router.push({ name: `${props.route}`, query: { offset: `${pageNumber}` } });
    }
    const emits = defineEmits(["deleteButton"]);

    const id = ref("");
    const status = ref("");
    const showDialog = ref(false);

    function confirmDelete(idd, statuss) {
        showDialog.value = true;
        id.value = idd;
        status.value = statuss;
    }

    const handleConfirm = () => {
        emits("deleteButton", { id: id.value, status: status.value });
        showDialog.value = false;
    };
    const handleCancel = () => {
        showDialog.value = false;
    };
    const fetchOrders = () => {
        store.dispatch(`${props.storeaction}`, { offset: offset.value, user: route.params.user });
    };

    watchEffect(() => {
        fetchOrders();
    });

    function formatDate(row) {
        return row.createdAt ? format(new Date(row.createdAt), "dd/MM/yyyy HH:mm") : "";
    }
    const formatCurrency = (row) => {
        const value = row.payment.amount;
        if (typeof value !== "number" || isNaN(value)) {
            return "MZN 0.00";
        }
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };
</script>
<style>
    .el-table .cell {
        font-weight: bolder !important;
        font-size: x-small;
        padding: 0;
        white-space: nowrap;
        overflow: scroll;
        text-overflow: clip;
    }
    @media screen and (min-width: 600px) {
        .el-table .cell {
            font-weight: 600;
            font-size: unset;
            text-align: center;
            padding: 0;
            white-space: wrap;
            overflow: hidden;
            text-overflow: clip;
        }
    }
</style>
