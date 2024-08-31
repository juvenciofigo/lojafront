<template lang="">
    <div class="flex flex-col flex-1 gap-2">
        <div
            class="relative flex-1"
            v-if="customers && customers.length > 0">
            <div class="p-4">
                <Input
                    class="max-w-sm"
                    placeholder="Filter emails..." />
            </div>
            <div class="absolute bottom-0 items-center top-[60px] left-0 flex-1 w-full max-w-[14 00px] flex flex-col overflow-auto">
                <v-table
                    density="compact"
                    fixed-header>
                    <thead>
                        <tr>
                            <th class="text-center">#</th>
                            <th class="text-center">Cliente</th>
                            <th class="text-center">Email</th>
                            <th class="text-center">Telefone</th>
                            <th class="text-center">Data de Registro</th>
                            <th class="text-center whitespace-nowrap">Estado</th>
                            <th class="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(customer, index) in customers"
                            :key="customer._id">
                            <td class="text-center font-bold">{{ index + 1 }}</td>
                            <td class="text-center whitespace-nowrap">{{ customer.name }}</td>
                            <td class="text-center whitespace-nowrap">{{ customer.email }}</td>
                            <td class="text-center whitespace-nowrap">{{ customer.contacts }}</td>
                            <td class="text-center whitespace-nowrap">{{ formatDate(customer.createdAt) }}</td>
                            <td class="text-center">
                                <span v-if="customer.deleted === false"> Activo </span>
                                <span v-else> Apadado </span>
                            </td>
                            <td class="flex flex-row gap-2">
                                <v-dialog max-width="1000">
                                    <template v-slot:activator="{ props: activatorProps }">
                                        <button
                                            v-bind="activatorProps"
                                            class="p-[3px] rounded-md">
                                            <Eye size="18" />
                                        </button>
                                    </template>

                                    <template v-slot:default="{ isActive }">
                                        <v-card title="Use Google's location service?">
                                            <template v-slot:text>
                                                <CustumerDetails />
                                            </template>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>

                                                <v-btn
                                                    color="surface-variant"
                                                    text="Fechar"
                                                    variant="flat"
                                                    @click="isActive.value = false">
                                                </v-btn>
                                            </v-card-actions>
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

    import CustumerDetails from "@/resources/Dashboard/_components/Store/_components/customers/CustumerDetails.vue";
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const customers = computed(() => store.state.customers.docs);
    const curentPage = ref(Number(route.query.offset) || 1);
    const totalPages = computed(() => {
        const customers = store.state.customers || {};
        return customers.totalPages || 0;
    });

    onBeforeMount(async () => {
        const offset = route.query.offset || 1;
        await store.dispatch("getAllCustomers", offset);
    });

    onBeforeUnmount(() => {
        store.commit("CLEAR_CUSTOMERS");
    });

    function pageEvent(e) {
        router.push({ name: "allCustomers", query: { offset: `${e}` } });
    }

    const fetchCustomrs = () => {
        const offset = route.query.offset || 1;
        store.dispatch("getAllCustomers", offset);
    };

    function formatDate(date) {
        return format(new Date(date), "dd/MM/yyyy HH:mm");
    }

    watchEffect(() => {
        fetchCustomrs();
    });
</script>
