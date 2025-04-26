<template lang="">
    <div
        v-loading="loading || pageloadLoading"
        class="flex flex-col flex-1 gap-2 overflow-auto allOlders">
        <div v-if="orders && orders?.docs?.length > 0 && loading === false">
            <el-table
                border
                align="center"
                :row-class-name="tableRowClassName"
                :data="orders.docs"
                fit
                show-header
                size="small">
                <el-table-column
                    align="center"
                    prop="referenceOrder"
                    label="Referência" />
                <el-table-column
                    align="center"
                    prop="customer.lastName"
                    label="Cliente" />
                <el-table-column
                    align="center"
                    prop="createdAt"
                    label="Data"
                    :formatter="(row) => formatDate(row.createdAt)" />
                <el-table-column
                    align="center"
                    prop="payment.amount"
                    label="Total"
                    :formatter="(row) => formatCurrency(row.payment.amount)" />
                <el-table-column
                    align="center"
                    prop="payment.paymentMethod"
                    label="Forma de pagamento"
                    :formatter="(row) => (row.payment.paymentMethod ? row.payment?.paymentMethod : row.payment?.status)" />
                <el-table-column
                    align="center"
                    prop="payment.status"
                    label="Estado do pagamento" />
                <el-table-column
                    align="center"
                    prop="delivery.status"
                    label="Estado da entrega" />
                <el-table-column
                    align="center"
                    fixed="right"
                    width="110"
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
            <div class="flex items-center space-x-2 py-4">
                <el-pagination
                    v-model:current-page="orders.page"
                    :total="orders.totalDocs"
                    :page-size="orders.limit"
                    :pager-count="5"
                    layout="total,prev, pager, next"
                    prev-text="Voltar"
                    next-text="Próxima"
                    background
                    :disabled="loading"
                    hide-on-single-page
                    small
                    @current-change="pageEvent" />
            </div>
        </div>
        <div
            v-else
            class="text-center">
            <p>Sem pedidos</p>
        </div>

        <el-dialog
            :fullscreen="windowWidth <= 768"
            top="1"
            close-on-press-escape
            lock-scroll
            show-close
            align-center
            destroy-on-close
            v-model="dialogVisible"
            :title="`Detalhes do Pedido ${selectedOrder.referenceOrder}`">
            <template #default>
                <OrdersDetails
                    class="bg-background_2"
                    :order="selectedOrder">
                </OrdersDetails>
            </template>
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
    import { computed, watch, ref, onBeforeUnmount, defineProps, defineEmits, onMounted, onUnmounted, onBeforeMount } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";
    import { formatCurrency, formatDate } from "@/util/functions";

    import OrdersDetails from "@/resources/_components/OrdersDetails.vue";
    import DialogConfirmation from "@/components/partials/DialogConfirmation.vue";

    const emits = defineEmits(["deleteButton"]);
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const props = defineProps({
        storeaction: String,
        route: String,
        pageloadLoading: Boolean,
    });

    const orders = computed(() => store.state.orders.orders);
    const offset = ref(route.query.offset || 1);
    const loading = ref(true);

    const tableRowClassName = ({ row }) => {
        if (row.payment.status === "Pago") {
            return "success-row";
        } else {
            return "warning-row";
        }
    };
    const dialogVisible = ref(false);
    const selectedOrder = ref({});

    const handleView = (row) => {
        selectedOrder.value = row;
        dialogVisible.value = true;
    };

    function pageEvent(pageNumber) {
        router.push({ name: `${props.route}`, query: { offset: `${pageNumber}` } });
    }

    const id = ref("");
    const status = ref("");
    const showDialog = ref(false);

    function confirmDelete(idd, statuss) {
        showDialog.value = true;
        id.value = idd;
        status.value = statuss;
    }

    const fetchOrders = async () => {
        loading.value = true;
        await store.dispatch(`orders/${props.storeaction}`, { offset: offset.value, user: route.params.user });
        loading.value = false;
    };

    watch(
        () => route.query.offset,
        (newOffset) => {
            offset.value = Number(newOffset) || 1;
            fetchOrders();
        }
    );

    onBeforeMount(() => {
        fetchOrders();
    });

    onBeforeUnmount(() => {
        store.commit("orders/CLEAR_ORDERS");
    });

    ///////////////////// delete //////////
    const handleConfirm = () => {
        emits("deleteButton", { orderId: id.value, user: route.params.user, status: status.value });
        showDialog.value = false;
    };
    const handleCancel = () => {
        showDialog.value = false;
    };

    ////////////////resize///////////////////
    const windowWidth = ref(window.innerWidth);

    const updateWidth = () => {
        windowWidth.value = window.innerWidth;
    };

    onMounted(() => {
        window.addEventListener("resize", updateWidth);
    });

    onUnmounted(() => {
        window.removeEventListener("resize", updateWidth);
    });

    watch(windowWidth, (newWidth) => {
        console.log("Largura da janela:", newWidth);
    });
</script>
<style>
    .allOlders .el-table .warning-row {
        --el-table-tr-bg-color: rgba(255, 0, 0, 0.096);
    }
    .allOlders .el-table .success-row {
        --el-table-tr-bg-color: rgba(0, 255, 21, 0.096);
    }
    .allOlders .el-dialog {
        width: max-content;
        background: #00000000 !important;
        padding: 0;
        margin-top: 4px;
    }
    .allOlders .el-dialog__header {
        display: flex !important;
        align-items: center !important;
        background: white !important;
        padding: 4px !important;
    }
    .allOlders .el-dialog__headerbtn {
        top: unset !important;
        margin: 10px !important;
    }

    .el-table {
        --el-table-border-color: var(--el-border-color-lighter);
        --el-table-border: 1px solid var(--el-table-border-color);
        --el-table-text-color: var(--text_2) !important;
        --el-table-row-hover-bg-color: var(--accent_2);
        --el-table-header-bg-color: var(--foreground_2);
        background-color: var(--foreground_2);
        --el-table-tr-bg-color: var(--foreground_2);
    }
</style>
