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
            <div class="absolute bottom-0 top-[60px] right-0 flex-1 w-full flex flex-col overflow-auto">
                <Table class="border-2 p-4">
                    <TableCaption>Lista de pedidos</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="text-center">Cliente</TableHead>
                            <TableHead class="text-center">Data</TableHead>
                            <TableHead class="text-center">Total</TableHead>
                            <TableHead class="text-center">Estado do pagamento</TableHead>
                            <TableHead class="text-center">Forma de pagamento</TableHead>
                            <TableHead class="text-center">Prestações</TableHead>
                            <TableHead class="text-center">Detalhes</TableHead>
                            <TableHead class="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow
                            v-for="order in orders"
                            :key="order._id">
                            <TableCell class="text-center">{{ order.customerOrder.name }}</TableCell>
                            <TableCell class="text-center">{{ formatDate(order.createdAt) }}</TableCell>
                            <TableCell class="text-center">{{ order.paymentOrder.Amount }}</TableCell>
                            <TableCell class="text-center">{{ order.paymentOrder.PaymentStatus }}</TableCell>
                            <TableCell class="text-center">{{ order.paymentOrder.PaymentForm }}</TableCell>
                            <TableCell class="text-center">{{ order.paymentOrder.PaymentInstallments }}</TableCell>
                            <TableCell class="text-center">
                                <v-dialog width="500">
                                    <template v-slot:activator="{ props }">
                                        <Button v-bind="props">Detalhes</Button>
                                    </template>

                                    <template v-slot:default="{ isActive }">
                                        <v-card-actions>
                                            <v-spacer>Detalhes do pedido</v-spacer>

                                            <button class="bg-slate-300 p-[3px] rounded-md">
                                                <X @click="isActive.value = false" />
                                            </button>
                                        </v-card-actions>
                                        <v-card title="Dialog">
                                            <v-card-text> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </v-card-text>

                                            <Table class="border-2 p-4">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead class="text-left">Imagem</TableHead>
                                                        <TableHead class="text-left">Product</TableHead>
                                                        <TableHead class="text-left">Quantidade</TableHead>
                                                        <TableHead class="text-left">Preço</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>{{ order.customerOrder.name }}</TableCell>
                                                        <TableCell>{{ order.customerOrder.name }}</TableCell>
                                                        <TableCell>{{ formatDate(order.createdAt) }}</TableCell>
                                                        <TableCell>{{ order.paymentOrder.Amount }}</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell class="text-center">Total:</TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell class="text-center">{{ order.paymentOrder.Amount }}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </v-card>
                                    </template>
                                </v-dialog>
                            </TableCell>
                            <TableCell>
                                <div class="flex flex-row gap-2">
                                    <button class="bg-slate-300 p-[3px] rounded-md"><Pen size="18" /></button>
                                    <button class="bg-slate-300 p-[3px] rounded-md">
                                        <Trash2
                                            color="red"
                                            size="18" />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div class="flex items-center space-x-2 py-4">
                <v-pagination
                    v-model="curenntPage"
                    @update:modelValue="pageEvent"
                    :length="totalPages"
                    :total-visible="4"
                    density="compact"
                    variant="flat"></v-pagination>
            </div>
        </div>
        <div v-else class="text-center">
            <p>Sem pedidos</p>
        </div>
    </div>
</template>
<script setup>
    import { onMounted, computed, watchEffect, ref, onBeforeUnmount } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";
    import { format } from "date-fns";

    import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
    import { Pen } from "lucide-vue-next";
    import { Trash2 } from "lucide-vue-next";
    import { X } from "lucide-vue-next";

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const orders = computed(() => store.state.orders.docs);

    const curenntPage = ref(Number(route.query.offset) || 1);
    const totalPages = computed(() => Number(store.state.orders.totalPages));

    onMounted(async () => {
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
        return format(new Date(date), "dd/MM/yyyy");
    }

    watchEffect(() => {
        fetchOrders();
    });
</script>
