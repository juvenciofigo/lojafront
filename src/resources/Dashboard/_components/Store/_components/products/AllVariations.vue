<template lang="">
    <div>
        <div>
            <v-btn :to="{ name: `addVariation` }">Adicionar variações</v-btn>
        </div>
        <br />
        <br />
        <div v-if="variations && variations.length > 0">
            <div>Todas</div>
            <div class="flex flex-wrap gap-5 justify-center">
                <template
                    v-for="variation in variations"
                    :key="variation._id">
                    <router-link :to="{ name: `editVariation`, params: { variation: `${variation._id}` } }">
                        <v-card class="w-max p-4">
                            <div class="flex flex-row justify-between">
                                <div>
                                    <span class="text-lg text-blue-700 font-semibold">{{ variation.variationType }}</span
                                    >: {{ variation.variationValue }}
                                </div>
                                <div>
                                    <v-btn
                                        :to="{ name: `editVariation`, params: { variation: `${variation._id}` } }"
                                        variant="tonal"
                                        class="bg-primary"
                                        size="x-small"
                                        >Modificar</v-btn
                                    >
                                </div>
                            </div>

                            <div class="flex flex-row gap-5 xl:ml-6 bg-slate-100 p-3 rounded-md">
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
                                    <!-- <div>{{ variation.variationImage }}</div> -->
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
    import { onBeforeMount, ref } from "vue";
    import { useStore } from "vuex";
    import { useRoute } from "vue-router";

    const variations = ref([]);
    const store = useStore();
    const route = useRoute();

    onBeforeMount(async () => {
        variations.value = await store.dispatch("AllvariationsAdmin", route.params.id);
    });
</script>
<style lang=""></style>
