<template lang="">
    <div
        v-loading="loading"
        class="allAddresses flex flex-1 flex-col gap-2 overflow-auto bg-black">
        <div>
            <div v-if="addresses && addresses.length > 0 && loading === false">
                <ul
                    v-if="addresses && addresses.length > 0"
                    class="grid grid-cols-2 flex-row flex-wrap gap-1 md:flex">
                    <!-- @click="select(index)" -->
                    <li
                        v-for="(address, index) in addresses"
                        :key="index"
                        :value="address._id"
                        @click="
                            () => {
                                addressSelected = address;
                                modifyDialog = !modifyDialog;
                            }
                        "
                        class="address col-span-1 cursor-pointer flex-col flex-wrap gap-4 rounded-md border border-[#e5e7eb] bg-[#f9fafb] p-4 shadow-md duration-500 hover:-translate-y-1 hover:border-[#e0a9a9] md:flex">
                        <AddressComp :address="address" />
                    </li>
                </ul>

                <el-dialog
                    :close-on-press-escape="true"
                    v-model="modifyDialog"
                    width="100%"
                    class="bg-transparent"
                    :show-close="false"
                    align-center
                    destroy-on-close
                    center>
                    <div class="informations m-3 rounded-md border bg-white p-3">
                        <h2 class="text-lg font-semibold">Informações do Endereço de entrega</h2>
                        <hr class="my-3" />
                        <div
                            class="flex flex-row"
                            v-if="addressSelected">
                            <div class="grid flex-1 gap-3 sm:grid-cols-2">
                                <div v-if="addressSelected.firstName">
                                    <p class="mb-1 font-semibold">Nome:</p>
                                    <p>{{ addressSelected.firstName }}</p>
                                </div>
                                <div v-if="addressSelected.lastName">
                                    <p class="mb-1 font-semibold">Apelido:</p>
                                    <p>{{ addressSelected.lastName }}</p>
                                </div>
                                <div v-if="addressSelected.email">
                                    <p class="mb-1 font-semibold">Email</p>
                                    <p>{{ addressSelected.email }}</p>
                                </div>
                                <div v-if="addressSelected.cellNumber">
                                    <p class="mb-1 font-semibold">Email</p>
                                    <p>{{ addressSelected.cellNumber }}</p>
                                </div>
                                <div v-if="addressSelected.city">
                                    <p class="mb-1 font-semibold">Cidadde:</p>
                                    <p>{{ addressSelected.city }}</p>
                                </div>
                                <div v-if="addressSelected.complete">
                                    <p class="mb-1 font-semibold">Completo:</p>
                                    <p>{{ addressSelected.complete }}</p>
                                </div>
                                <div v-if="addressSelected.complete">
                                    <p class="mb-1 font-semibold">Bairo:</p>
                                    <p>{{ addressSelected.neighborhood }}</p>
                                </div>
                                <div v-if="addressSelected.postalCode">
                                    <p class="mb-1 font-semibold">Código Postal:</p>
                                    <p>{{ addressSelected.postalCode }}</p>
                                </div>
                                <div v-if="addressSelected.province">
                                    <p class="mb-1 font-semibold">Pronvincia:</p>
                                    <p>{{ addressSelected.province }}</p>
                                </div>
                                <div v-if="addressSelected.reference">
                                    <p class="mb-1 font-semibold">Referência:</p>
                                    <p>{{ addressSelected.reference }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-dialog>
            </div>
            <div v-else>Sem Endereços</div>
        </div>
    </div>
</template>
<script setup>
    import { ref, onBeforeMount, computed } from "vue";
    import { useStore } from "vuex";
    import AddressComp from "@/resources/_components/_partials/AddressCard.vue";

    const store = useStore();
    const addresses = computed(() => store.state.addresses.addresses);
    const loading = ref(true);
    const addressSelected = ref(null);
    const modifyDialog = ref(false);

    const fetchAddresses = async () => {
        loading.value = true;
        await store.dispatch("addresses/fetchAddresses");
        loading.value = false;
    };
    onBeforeMount(() => {
        fetchAddresses();
    });
</script>
