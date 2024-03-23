<template lang="">
    <div class="flex flex-col flex-1 gap-2">
        <div class="relative flex-1" v-if="customers && customers.length > 0">
            <div class="p-4"><Input class="max-w-sm" placeholder="Filter emails..." /></div>
            <div class="absolute bottom-0 top-[60px] right-0 flex-1 w-full flex flex-col overflow-auto">
                <Table class="border-2 p-4">
                    <TableCaption>Lista de clientes</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead class="text-center">Name</TableHead>
                            <TableHead class="text-center">Email</TableHead>
                            <TableHead class="text-center">Telefones</TableHead>
                            <TableHead class="text-center">Data de Registro</TableHead>
                            <TableHead class="text-center">Estado</TableHead>
                            <TableHead class="text-center">Detalhes</TableHead>
                            <TableHead class="text-center">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="customer in customers" :key="customer._id">
                            <TableCell class="text-center">{{ customer.name }}</TableCell>
                            <TableCell class="text-center">{{ customer.email }}</TableCell>
                            <TableCell class="text-center" v-for="(contact, index) in customer.contacts" :key="index">
                                <p>{{ contact }}</p></TableCell
                            >
                            <TableCell class="text-center">{{ formatDate(customer.createdAt) }}</TableCell>

                            <TableCell class="text-center"> <span v-if="customer.deleted === false"> Activo </span> <span v-else> Apadado </span> </TableCell>
                            <TableCell class="text-center">
                                <v-dialog width="500">
                                    <template v-slot:activator="{ props }">
                                        <Button v-bind="props">Detalhes</Button>
                                    </template>

                                    <template v-slot:default="{ isActive }">
                                        <v-card-actions class="bg-slate-200 rounded-md">
                                            <v-spacer>Detalhes do pedido</v-spacer>
                                            <button class="bg-slate-300 p-[3px] rounded-md">
                                                <X @click="isActive.value = false" />
                                            </button>
                                        </v-card-actions>

                                        <v-card>
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
                                <div class="flex justify-center flex-row gap-2">
                                    <button class="bg-slate-300 p-[3px] rounded-md"><Pen size="18" /></button>
                                    <button class="bg-slate-300 p-[3px] rounded-md"><Trash2 color="red" size="18" /></button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
        <div class="flex items-center space-x-2 py-4">
            <v-pagination v-model="curentPage" total-visible="5" @update:modelValue="pageEvent" :length="totalPages" :total-visible="4" density="compact" variant="flat"></v-pagination>
        </div>
    </div>
</template>
<script setup>
    import { onMounted, computed, watchEffect, ref, onBeforeUnmount, watch } from "vue";
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

    // const customers = computed(() => store.state.customers.docs);
    const customers = computed(() => store.state.customers.docs);
    const curentPage = ref(Number(route.query.offset) || 1);
    const totalPages = ref(Number(customers.totalPages));
    const limit = computed(() => Number(store.state.customers.limit));

    onMounted(async () => {
        const offset = route.query.offset || 1;
        await store.dispatch("getAllCustomers", offset);
    });

    onBeforeUnmount(() => {
        store.commit("CLEAR_CUSTOMERS");
    });

    function pageEvent(e) {
        router.push({ name: "allCustomers", query: { offset: e } });
    }

    const fetchCustomrs = () => {
        const offset = route.query.offset || 1;
        store.dispatch("getAllCustomers", offset);
    };

    function formatDate(date) {
        return format(new Date(date), "dd/MM/yyyy");
    }

    watchEffect(() => {
        fetchCustomrs();
    });
</script>
