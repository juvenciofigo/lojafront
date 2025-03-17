<template lang="">
    <div
        v-loading="loading"
        class="flex flex-col flex-1 gap-2 overflow-auto allOlders">
        <div>
            <div v-if="orderDocs && orderDocs.length > 0 && loading === false">
                <div class="p-4">
                    <Input
                        class="max-w-sm"
                        placeholder="Filter emails..." />
                </div>
                <el-table
                    border
                    align="center"
                    :row-class-name="tableRowClassName"
                    :data="orderDocs"
                    fit
                    show-header
                    size="small">
                    <el-table-column
                        align="center"
                        fixed
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
                        :formatter="format" />
                    <el-table-column
                        align="center"
                        prop="payment.amount"
                        label="Total"
                        :formatter="formatCurrency" />
                    <el-table-column
                        align="center"
                        prop="payment.paymentMethod"
                        label="Forma de pagamento" />
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
                    <v-pagination
                        v-model="currentPage"
                        @update:modelValue="pageEvent"
                        :length="totalPages"
                        :total-visible="4"
                        density="compact"
                        variant="flat">
                    </v-pagination>
                </div>
            </div>
            <div
                v-else
                class="text-center">
                <p>Sem pedidos</p>
            </div>
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
                    class="bg-[#f3f3f9]"
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
    import { Input } from "@/components/ui/input";
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
    });

    const orders = computed(() => store.state.orders);
    const orderDocs = computed(() => orders.value.docs);
    const totalPages = computed(() => orders.value.totalPages);
    const currentPage = ref(Number(route.query.offset) || 1);
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
        await store.dispatch(`${props.storeaction}`, { offset: offset.value, user: route.params.user });
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
        store.commit("CLEAR_ORDERS");
    });

    ///////////////////// delete //////////
    const handleConfirm = () => {
        emits("deleteButton", { id: id.value, status: status.value });
        showDialog.value = false;
    };
    const handleCancel = () => {
        showDialog.value = false;
    };

    function format(row) {
        return row.createdAt ? formatDate(new Date(row.createdAt), "dd/MM/yyyy HH:mm") : "";
    }

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
</style>
