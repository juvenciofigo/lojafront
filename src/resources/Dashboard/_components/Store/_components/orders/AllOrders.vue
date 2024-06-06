<template lang="">
    <div class="flex flex-col flex-1 gap-2">
        <div
            class="relative flex-1"
            v-if="orders && orders.length > 0">
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
                            v-for="(order, index) in orders"
                            :key="order._id">
                            <td class="text-center font-bold">{{ index + 1 }}</td>
                            <td class="text-center">
                                <span v-if="order.referenceOrder">{{ order.referenceOrder }}</span>
                                <span v-else>Sem Referência</span>
                            </td>
                            <td class="text-center whitespace-nowrap">{{ order.customerOrder.name }}</td>
                            <td class="text-center whitespace-nowrap">{{ formatDate(order.createdAt) }}</td>
                            <td class="text-center">{{ formatCurrency(order.paymentOrder.amount) }}</td>
                            <td class="text-center">{{ order.paymentOrder.paymentForm }}</td>
                            <td class="text-center">{{ order.paymentOrder.paymentStatus }}</td>
                            <td class="text-center">{{ order.deliveryOrder.deliveryStatus }}</td>
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
                                        <v-card :title="`Pedido ${order.referenceOrder}`">
                                            <v-card-actions>
                                                <v-btn
                                                    color="surface-variant"
                                                    text="Fechar"
                                                    variant="flat"
                                                    @click="isActive.value = false">
                                                </v-btn>
                                            </v-card-actions>
                                            <v-card-text class="bg-[#f3f3f9] 0 p-1 overflow-x-hidden">
                                                <OrdersDetails
                                                    
                                                    :order="order" />
                                            </v-card-text>
                                        </v-card>
                                    </template>
                                </v-dialog>

                                <button class="p-[3px] rounded-md"><Pen size="18" /></button>
                                <button class="p-[3px] rounded-md">
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
    </div>
</template>
<script setup>
    import { onBeforeMount, computed, watchEffect, ref, onBeforeUnmount } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";
    import { format } from "date-fns";
    import { Pen, Eye, Trash2 } from "lucide-vue-next";
    import { Input } from "@/components/ui/input";

    import OrdersDetails from "@/resources/Dashboard/_components/Store/_components/orders/OrdersDetails.vue";

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const orders = computed(() => store.state.orders.docs);
    const curentPage = ref(Number(route.query.offset) || 1);
    const totalPages = computed(() => {
        const orders = store.state.orders || {};
        return orders.totalPages || 0;
    });

    onBeforeMount(async () => {
        const offset = route.query.offset || 1;
        await store.dispatch("getAllOrders", offset);
    });

    onBeforeUnmount(() => {
        store.commit("CLEAR_ORDERS");
    });

    function pageEvent(e) {
        router.push({ name: "allOrders", query: { offset: `${e}` } });
    }

    const fetchOrders = () => {
        const offset = route.query.offset || 1;
        store.dispatch("getAllOrders", offset);
    };

    function formatDate(date) {
        return format(new Date(date), "dd/MM/yyyy HH:mm");
    }

    watchEffect(() => {
        fetchOrders();
    });

    const formatCurrency = (value) => {
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };
</script>
<style scoped></style>
