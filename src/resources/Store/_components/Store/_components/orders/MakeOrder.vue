<template>
    <div class="flex-1">
        <v-stepper v-model="currentStep">
            <template v-slot:default="{ prev, next }">
                <v-stepper-header>
                    <template
                        v-for="(step, index) in steps"
                        :key="index">
                        <v-stepper-item
                            :complete="currentStep > index"
                            :value="index + 1"
                            editable
                            :title="step">
                        </v-stepper-item>

                        <v-divider
                            v-if="index !== steps.length - 1"
                            :key="`divider-${index}`">
                        </v-divider>
                    </template>
                </v-stepper-header>

                <v-stepper-window>
                    <ShippingInfoStep
                        :currentStep="currentStep"
                        @next="nextStep" />
                    <ConfirmationStep
                        :currentStep="currentStep"
                        @prev="prevStep"
                        @sendOrder="sendOrder" />
                </v-stepper-window>

                <v-stepper-actions
                    :disabled="disabled"
                    @click:next="next"
                    @click:prev="prev">
                </v-stepper-actions>
            </template>
        </v-stepper>
    </div>
</template>

<script setup>
    import { ref, computed, onBeforeUnmount, onBeforeMount } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";
    const route = useRoute();
    const router = useRouter();

    import ShippingInfoStep from "@/resources/Store/_components/Store/_components/orders/makeorderComp/ShippingInfoStep.vue";
    import ConfirmationStep from "@/resources/Store/_components/Store/_components/orders/makeorderComp/ConfirmationStep.vue";

    const steps = ref(["Informações de Envio", "Confirmação"]);
    const currentStep = ref(1);

    const nextStep = () => {
        currentStep.value++;
    };

    const prevStep = () => {
        currentStep.value--;
    };

    const store = useStore();

    onBeforeUnmount(() => {
        store.commit("CLEAR_CARTPRODUCTS");
    });
    const disabled = computed(() => (currentStep.value === 1 ? "prev" : currentStep.value === steps.value.length ? "next" : undefined));

    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));
    onBeforeMount(async () => {
        switch (route.query.productsFrom) {
            case "cartProducts":
                await store.dispatch("displayTempCartProducts", isAuthenticated.value);
                break;
            case "payNow":
                await store.dispatch("buyNow", { product: { id: route.query.product, quantity: route.query.quantity } });
                break;
            default:
                router.push({ name: "homepage" });
                break;
        }
    });

    // Finalizar o pedido
    function sendOrder() {
        console.log(1);
        // store.dispatch("sendOrder", { cart: { ...cartProducts.value }, delivery: { deliveryCost }, router });
    }
</script>
