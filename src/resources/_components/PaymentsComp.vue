<template lang="">
    <div
        v-loading="loading"
        class="flex flex-1 flex-col gap-2">
        <div
            class="relative flex-1"
            v-if="orderDocs && orderDocs.length > 0">
            <div class="p-4">
                <Input
                    class="max-w-sm"
                    placeholder="Filter emails..." />
            </div>
            <div class="absolute top-[60px] bottom-0 left-0 flex w-full max-w-[1400px] flex-1 flex-col items-center overflow-auto">
                <v-table
                    density="comfortable "
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
                            class="cursor-pointer duration-500 hover:bg-slate-200"
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
                                            class="rounded-md p-[3px]">
                                            <Eye size="20" />
                                        </button>
                                    </template>

                                    <template v-slot:default="{ isActive }">
                                        <v-card>
                                            <v-card-actions class="flex flex-row justify-between p-0 text-end">
                                                <p class="ml-3 text-2xl font-bold">Pedido {{ order.referenceOrder }}</p>
                                                <button
                                                    class="mr-3 rounded-md bg-red-100 text-red-500 duration-500 active:bg-red-500 active:text-red-100"
                                                    @click="isActive.value = false">
                                                    <X />
                                                </button>
                                            </v-card-actions>
                                            <v-card-text class="0 overflow-x-hidden bg-[#f3f3f9] p-1"> </v-card-text>
                                        </v-card>
                                    </template>
                                </v-dialog>

                                <button
                                    class="rounded-md p-[3px]"
                                    @click="confirmDelete(order._id, order.payment.status)">
                                    <Trash2
                                        color="red"
                                        size="20" />
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
            <p>Sem Pagamentos</p>
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
    import { computed, watch, ref, onBeforeUnmount, defineProps, defineEmits, onBeforeMount } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";
    import { Eye, Trash2, X } from "lucide-vue-next";
    import { Input } from "@/components/ui/input";
    import { formatCurrency, formatDate } from "@/util/functions";

    import DialogConfirmation from "@/components/partials/DialogConfirmation.vue";

    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const props = defineProps({
        storeaction: String,
        route: String,
    });
    const orders = computed(() => store.state.orders.orders);
    const orderDocs = computed(() => orders.value.docs);
    const curentPage = ref(Number(route.query.offset) || 1);
    const totalPages = computed(() => orders.value.totalPages);
    const offset = computed(() => route.query.offset || 1);

    const emits = defineEmits(["deleteButton"]);

    onBeforeUnmount(() => {
        store.commit("orders/CLEAR_ORDERS");
    });

    function pageEvent(pageNumber) {
        router.push({ name: `${props.route}`, query: { offset: `${pageNumber}` } });
    }

    const id = ref("");
    const status = ref("");
    const showDialog = ref(false);
    const loading = ref(true);

    const fetchOrders = async () => {
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

    // /////////////////////delete///////////
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
</script>
