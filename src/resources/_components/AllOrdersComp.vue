<template lang="">
    <div class="flex flex-col flex-1 gap-2">
        <div
            class="relative flex-1"
            v-if="orderDocs && orderDocs.length > 0">
            <div class="p-4">
                <Input
                    class="max-w-sm"
                    placeholder="Filter emails..." />
            </div>
            <div class="absolute bottom-0 items-center top-[60px] left-0 flex-1 w-full max-w-[1400px] flex flex-col overflow-auto">
                <v-table
                    density="compact"
                    fixed-header>
                    <thead>
                        <tr>
                            <th class="text-center font-extrabold">#</th>
                            <th class="text-center">Referência</th>
                            <th class="text-center">Cliente</th>
                            <th class="text-center">Data</th>
                            <th class="text-center">Total</th>
                            <th class="text-center whitespace-nowrap">Forma de pagamento</th>
                            <th class="text-center whitespace-nowrap">Estado do pagamento</th>
                            <th class="text-center whitespace-nowrap">Estado da entrega</th>
                            <th class="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(order, index) in orderDocs"
                            :key="order._id">
                            <td class="text-center font-bold">{{ index + 1 }}</td>
                            <td class="text-center whitespace-nowrap">
                                <span v-if="order.referenceOrder">{{ order.referenceOrder }}</span>
                                <span v-else>Sem Referência</span>
                            </td>
                            <td class="text-center whitespace-nowrap">
                                <span>{{ order.customer.firstName }}</span> <span>{{ order.customer.lastName }}</span>
                            </td>
                            <td class="text-center whitespace-nowrap">{{ formatDate(order.createdAt) }}</td>
                            <td class="text-center">{{ formatCurrency(order.payment.amount) }}</td>
                            <td class="text-center">
                                <span v-if="order.payment.paymentMethod">{{ order.payment.paymentMethod }}</span>
                                <span v-else>{{ order.payment.status }}</span>
                            </td>
                            <td class="text-center">{{ order.payment.status }}</td>
                            <td class="text-center">{{ order.delivery.status }}</td>
                            <td class="flex flex-row gap-2">
                                <v-dialog
                                    class="w-full"
                                    transition="dialog-bottom-transition">
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <button
                                            v-bind="activatorProps"
                                            class="p-[3px] rounded-md">
                                            <Eye size="18" />
                                        </button>
                                    </template>

                                    <template v-slot:default="{ isActive }">
                                        <v-card>
                                            <v-card-actions class="flex flex-row justify-between text-end p-0">
                                                <p class="ml-3 text-2xl font-bold">Pedido {{ order.referenceOrder }}</p>
                                                <button
                                                    class="text-red-500 bg-red-100 active:text-red-100 active:bg-red-500 duration-500 rounded-md mr-3"
                                                    @click="isActive.value = false">
                                                    <X />
                                                </button>
                                            </v-card-actions>
                                            <v-card-text class="bg-[#f3f3f9] 0 p-1 overflow-x-hidden">
                                                <OrdersDetails :order="order">
                                                    <template #doPay>
                                                        <slot name="doPay"></slot>
                                                    </template>
                                                </OrdersDetails>
                                            </v-card-text>
                                        </v-card>
                                    </template>
                                </v-dialog>

                                <button class="p-[3px] rounded-md">
                                    <Pen size="18" />
                                </button>
                                <button
                                    class="p-[3px] rounded-md"
                                    @click="confirmDelete(order._id, order.payment.status)">
                                    <Trash2
                                        color="red"
                                        size="18" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
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
            </div>
        </div>
        <div
            v-else
            class="text-center">
            <p>Sem pedidos</p>
        </div>

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
    import { Pen, Eye, Trash2, X } from "lucide-vue-next";
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

    function formatDate(date) {
        return format(new Date(date), "dd/MM/yyyy HH:mm");
    }

    watchEffect(() => {
        fetchOrders();
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
</script>
<style scoped></style>
