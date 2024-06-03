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
                                <v-dialog  class="flex flex-col lg:items-start lg:flex-row lg:pr-5 flex-1 gap-4 flex-wrap">
                                    <template v-slot:activator="{ props }">
                                        <button v-bind="props">Ver</button>
                                    </template>

                                    <template v-slot:default="{ isActive }">
                                        <v-card-actions>
                                            <v-spacer>Detalhes do pedido</v-spacer>

                                            <button class="bg-slate-300 p-[3px] rounded-md">
                                                <X @click="isActive.value = false" />
                                            </button>
                                        </v-card-actions>

                                        <v-card title="Detalhes do pedido de: ">
                                            <v-card-text> {{ order.customerOrder.name }} </v-card-text>

                                            <div
                                                v-if="order.Ordercart && order.Ordercart.length > 0"
                                                class="">
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead class="text-center flex-1">Product</TableHead>
                                                            <TableHead class="text-center">Preço unit.</TableHead>
                                                            <TableHead class="text-center">Quant.</TableHead>
                                                            <TableHead class="text-center">Subtotal</TableHead>
                                                            <TableHead
                                                                class="text-center"
                                                                :class="actionButton"
                                                                >Ações</TableHead
                                                            >
                                                        </TableRow>
                                                    </TableHeader>

                                                    <TableBody
                                                        v-for="product in order.Ordercart"
                                                        :key="product.productId">
                                                        <TableRow :class="tableRowHeight">
                                                            <TableCell class="text-center">
                                                                <button
                                                                    @click="goTo(product.productId)"
                                                                    class="flex flex-row flex-wrap justify-center items-center text-lg gap-2">
                                                                    <img
                                                                        :src="product.picture"
                                                                        alt="Imagem do Produto"
                                                                        class="min-h-10 max-h-24 border"
                                                                        :class="image" />
                                                                    {{ product.productName }}
                                                                </button>
                                                            </TableCell>
                                                            <TableCell class="text-center">{{ product.productPrice }}</TableCell>
                                                            <TableCell class="text-center">
                                                                <input
                                                                    class="text-center"
                                                                    type="number"
                                                                    v-model.number="product.quantity"
                                                                    @change="updateQuantity(product.productId, product.quantity)"
                                                                    min="1" />
                                                            </TableCell>
                                                            <TableCell class="text-center">{{ formatCurrency(product.subtotal) }} </TableCell>
                                                            <TableCell
                                                                class="text-center"
                                                                :class="actionButton">
                                                                <button class="bg-slate-300 p-[3px] rounded-md">
                                                                    <Trash2
                                                                        @click="removeProduct(product.productId)"
                                                                        color="red"
                                                                        size="18" />
                                                                </button>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                            <!-- <Table class="border-2 p-4">
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
                                            </Table> -->
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
                    v-model="curentPage"
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
    import { Input } from "@/components/ui/input";

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const orders = computed(() => store.state.orders.docs);
    const curentPage = ref(Number(route.query.offset) || 1);
    const totalPages = computed(() => {
        const orderDocs = store.state.orders.docs || {};
        return orderDocs.totalPages || 0;
    });

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

    const formatCurrency = (value) => {
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };
</script>
