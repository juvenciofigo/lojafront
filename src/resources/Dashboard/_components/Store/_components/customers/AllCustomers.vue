<template lang="">
    <div>
        <div v-if="customers && customers.length > 0">
            <el-table
                stripe
                border
                :data="customers"
                fit
                show-header
                size="small">
                <!-- ///////////////// -->
                <el-table-column
                    align="center"
                    width="55"
                    label="#">
                </el-table-column>
                <!-- //////////// -->
                <el-table-column
                    align="center"
                    width="170"
                    prop="name"
                    label="Cliente">
                </el-table-column>
                <!-- //////////// -->
                <el-table-column
                    align="center"
                    width="170"
                    prop="email"
                    label="Email">
                </el-table-column>
                <!-- //////////// -->
                <el-table-column
                    align="center"
                    width="170"
                    prop="contacts"
                    label="Telefone">
                </el-table-column>
                <!-- //////////// -->
                <el-table-column
                    align="center"
                    width="170"
                    label="Data de Registro">
                    <template #default="scope">
                        <span class="whitespace-nowrap">{{ formatDate(scope.row.createdAt) }}</span>
                    </template>
                </el-table-column>
                <!-- //////////// -->
                <el-table-column
                    align="center"
                    width="170"
                    label="Estado">
                    <template #default="scope">
                        <span v-if="scope.row.deleted === false"> Activo </span>
                        <span v-else> Apadado </span>
                    </template>
                </el-table-column>
                <!-- //////////// -->
                <el-table-column
                    align="center"
                    width="170"
                    label="Ações">
                    <template #default>
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
                    </template>
                </el-table-column>
            </el-table>
            <!-- //////////////////////////////////////////////////////////////// -->

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
            <p>Sem Clientes</p>
        </div>
    </div>
</template>
<script setup>
    import { onBeforeMount, computed, watchEffect, ref, onBeforeUnmount } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";
    import { Pen, Eye, Trash2 } from "lucide-vue-next";
    import { formatDate } from "@/util/functions";

    import CustumerDetails from "@/resources/Dashboard/_components/Store/_components/customers/CustumerDetails.vue";
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const customers = computed(() => store.state.auth.customers.docs);
    const curentPage = ref(Number(route.query.offset) || 1);
    const totalPages = computed(() => {
        const customers = store.state.customers || {};
        return customers.totalPages || 0;
    });

    onBeforeMount(async () => {
        const offset = route.query.offset || 1;
        await store.dispatch("auth/fetchCustomers", offset);
    });

    onBeforeUnmount(() => {
        store.commit("auth/CLEAR_CUSTOMERS");
    });

    function pageEvent(e) {
        router.push({ name: "allCustomers", query: { offset: `${e}` } });
    }

    const fetchCustomrs = () => {
        const offset = route.query.offset || 1;
        store.dispatch("auth/fetchCustomers", offset);
    };

    watchEffect(() => {
        fetchCustomrs();
    });
</script>
