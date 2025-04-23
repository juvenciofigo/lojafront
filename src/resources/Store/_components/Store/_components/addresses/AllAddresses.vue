<template lang="">
    <div
        v-loading="loading"
        class="flex flex-col flex-1 gap-2 overflow-auto allAddresses ">
        <div>
            <div v-if="addresses && addresses.length > 0 && loading === false">
                <ul
                    v-if="addresses && addresses.length > 0"
                    class="grid grid-cols-2 md:flex flex-row flex-wrap gap-1">
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
                        class="col-span-1 md:flex flex-col flex-wrap gap-4 p-4 cursor-pointer border hover:-translate-y-1 duration-500 bg-foreground_2 shadow-md address">
                        <AddressComp :address="address" 
                        
                        
                        />
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
                    <div class="informations border p-3 m-3 rounded-md bg-background_2">
                        <h2 class="font-semibold text-lg">Informações do Endereço de entrega</h2>
                        <hr class="my-3" />
                        <div
                            class="flex flex-row"
                            v-if="addressSelected">
                            <div class="grid sm:grid-cols-2 gap-3 flex-1">
                                <div v-if="addressSelected.firstName">
                                    <p class="font-semibold mb-1">Nome:</p>
                                    <p>{{ addressSelected.firstName }}</p>
                                </div>
                                <div v-if="addressSelected.lastName">
                                    <p class="font-semibold mb-1">Apelido:</p>
                                    <p>{{ addressSelected.lastName }}</p>
                                </div>
                                <div v-if="addressSelected.email">
                                    <p class="font-semibold mb-1">Email</p>
                                    <p>{{ addressSelected.email }}</p>
                                </div>
                                <div v-if="addressSelected.cellNumber">
                                    <p class="font-semibold mb-1">Email</p>
                                    <p>{{ addressSelected.cellNumber }}</p>
                                </div>
                                <div v-if="addressSelected.city">
                                    <p class="font-semibold mb-1">Cidadde:</p>
                                    <p>{{ addressSelected.city }}</p>
                                </div>
                                <div v-if="addressSelected.complete">
                                    <p class="font-semibold mb-1">Completo:</p>
                                    <p>{{ addressSelected.complete }}</p>
                                </div>
                                <div v-if="addressSelected.complete">
                                    <p class="font-semibold mb-1">Bairo:</p>
                                    <p>{{ addressSelected.neighborhood }}</p>
                                </div>
                                <div v-if="addressSelected.postalCode">
                                    <p class="font-semibold mb-1">Código Postal:</p>
                                    <p>{{ addressSelected.postalCode }}</p>
                                </div>
                                <div v-if="addressSelected.province">
                                    <p class="font-semibold mb-1">Pronvincia:</p>
                                    <p>{{ addressSelected.province }}</p>
                                </div>
                                <div v-if="addressSelected.reference">
                                    <p class="font-semibold mb-1">Referência:</p>
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
