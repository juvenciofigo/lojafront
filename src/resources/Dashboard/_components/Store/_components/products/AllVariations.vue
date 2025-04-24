<template lang="">
    <div>
        <div>
            <router-link :to="{ name: 'admin-product-variation-add' }">
                <el-button
                    :icon="Plus"
                    size="small">
                    Adicionar variações
                </el-button>
            </router-link>
        </div>
        <br />
        <div
            v-if="variations && variations.length > 0"
            v-loading="loading">
            <div>Todas:</div>
            <div class="p-2 flex flex-wrap gap-2 justify-center">
                <template
                    v-for="variation in variations"
                    :key="variation._id">
                    <v-card class="w-max">
                        <router-link :to="{ name: `admin-product-variation-edit`, params: { variation: `${variation._id}` } }">
                            <div class="flex flex-row justify-between items-center px-1">
                                <div>
                                    <span class="text-base text-blue-700 font-semibold">{{ variation.variationType }}</span
                                    >: {{ variation.variationValue }}
                                </div>
                                <router-link :to="{ name: `admin-product-variation-edit`, params: { variation: `${variation._id}` } }">
                                    <el-link
                                        type="primary"
                                        link
                                        :icon="EditPen">
                                        Modificar
                                    </el-link>
                                </router-link>
                            </div>

                            <div class="flex flex-row gap-5 bg-blue-100 p-2">
                                <div>
                                    <div><span class="font-medium">Sku:</span> {{ variation.sku }}</div>
                                    <div>
                                        <span>
                                            <span class="font-medium">Disponível: </span>
                                            <span v-if="variation.variationStock">Sim </span>
                                            <span v-else> Não</span>
                                        </span>
                                    </div>

                                    <div><span class="font-medium">Preço adicional:</span> {{ variation.variationPrice }}</div>
                                    <div><span class="font-medium">Preço promocional:</span> {{ variation.variationPromotion }}</div>
                                </div>
                                <div>
                                    <div v-if="variation.delivery.dimensions.heightCm || variation.delivery.dimensions.widthCm || variation.delivery.dimensions.depthCm">
                                        <h5><span class="font-medium">Dimensões:</span></h5>
                                        <div><span class="font-medium">Altura:</span>{{ variation.delivery.dimensions.heightCm }}</div>
                                        <div><span class="font-medium">Larcura:</span>{{ variation.delivery.dimensions.widthCm }}</div>
                                        <div><span class="font-medium">Comprimento:</span>{{ variation.delivery.dimensions.depthCm }}</div>
                                    </div>
                                    <div v-if="variation.delivery.weight">{{ variation.delivery.weight }}</div>
                                    <div>
                                        <span class="font-medium">Entrega:</span>
                                        <span v-if="variation.delivery.shippingFree">Gratis</span>
                                        <span v-else>Não</span>
                                    </div>
                                </div>
                            </div>
                        </router-link>

                        <div class="flex flex-row justify-end items-center p-1">
                            <el-link
                                @click="confirmDelete(variation._id)"
                                type="danger"
                                :icon="Delete">
                            </el-link>
                        </div>
                    </v-card>
                </template>
            </div>
        </div>
        <DialogConfirmation
            :dialog="showDialog"
            tileConfirmation="Deleção de Endereço"
            textConfirmation="Você tem certeza de que deseja deletar este endereço?"
            positiveConfirmation="Deletar"
            @update:dialog="showDialog = $event"
            @cancelar="handleCancel"
            @confirmar="handleConfirm" />
    </div>
</template>
<script setup>
    import { onBeforeMount, computed, ref } from "vue";
    import { useStore } from "vuex";
    import { useRoute } from "vue-router";
    import { EditPen, Plus, Delete } from "@element-plus/icons-vue";

    import DialogConfirmation from "@/components/partials/DialogConfirmation.vue";
    const variations = computed(() => store.state.products.variations);
    const store = useStore();
    const route = useRoute();

    const loading = ref(true);
    const showDialog = ref(false);
    const deleteIndex = ref(null);

    function confirmDelete(index) {
        deleteIndex.value = index;
        showDialog.value = true;
    }

    const handleCancel = () => {
        showDialog.value = false;
    };

    const handleConfirm = () => {
        deleteVariation();
    };

    async function deleteVariation() {
        loading.value = true;
        if (deleteIndex.value !== null) {
            console.log(deleteIndex.value);
            await store.dispatch("products/deleteVariation", deleteIndex.value);
            showDialog.value = false;
            deleteIndex.value = null;
        }
        loading.value = false;
    }
    onBeforeMount(async () => {
        await store.dispatch("products/fetchVariationsAdmin", route.params.id);
        loading.value = false;
    });
</script>
