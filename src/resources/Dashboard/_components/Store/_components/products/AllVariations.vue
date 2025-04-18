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
        <div v-if="variations && variations.length > 0">
            <div>Todas:</div>
            <div class="p-2 flex flex-wrap gap-5 justify-center">
                <template
                    v-for="variation in variations"
                    :key="variation._id">
                    <router-link :to="{ name: `admin-product-variation-edit`, params: { variation: `${variation._id}` } }">
                        <v-card class="w-max">
                            <div class="flex flex-row justify-between items-center px-1">
                                <div>
                                    <span class="text-base text-blue-700 font-semibold">{{ variation.variationType }}</span
                                    >: {{ variation.variationValue }}
                                </div>
                                <div>
                                    <router-link :to="{ name: `admin-product-variation-edit`, params: { variation: `${variation._id}` } }">
                                        <el-link
                                            type="primary"
                                            link
                                            :icon="EditPen">
                                            Modificar
                                        </el-link>
                                    </router-link>
                                </div>
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
                        </v-card>
                    </router-link>
                </template>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { onBeforeMount, computed } from "vue";
    import { useStore } from "vuex";
    import { useRoute } from "vue-router";
    import { EditPen, Plus } from "@element-plus/icons-vue";

    const variations = computed(() => store.state.products.variations);
    const store = useStore();
    const route = useRoute();

    onBeforeMount(async () => {
        await store.dispatch("products/fetchVariationsAdmin", route.params.id);
    });
</script>
