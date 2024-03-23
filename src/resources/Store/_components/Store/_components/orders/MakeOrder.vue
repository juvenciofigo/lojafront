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
                    <PaymentInfoStep
                        :currentStep="currentStep"
                        @prev="prevStep"
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
    import { useRouter } from "vue-router";
    import { useStore } from "vuex";
    import { ref, computed } from "vue";

    import ShippingInfoStep from "@/resources/Store/_components/Store/_components/orders/makeorderComp/ShippingInfoStep.vue";
    import PaymentInfoStep from "@/resources/Store/_components/Store/_components/orders/makeorderComp/PaymentInfoStep.vue";
    import ConfirmationStep from "@/resources/Store/_components/Store/_components/orders/makeorderComp/ConfirmationStep.vue";

    const router = useRouter();
    const store = useStore();
    const steps = ref(["Informações de Envio", "Informações de Pagamento", "Confirmação"]);
    const currentStep = ref(1);

    const nextStep = () => {
        currentStep.value++;
    };

    const prevStep = () => {
        currentStep.value--;
    };

    const disabled = computed(() => (currentStep.value === 1 ? "prev" : currentStep.value === steps.value.length ? "next" : undefined));

    // Finalizar o pedido
    const sendOrder = () => {
        console.log(1);
        store.dispatch("sendOrder", { cart: { ...cartProducts.value }, payment: { PaymentForm, PaymentStatus }, delivery: { deliveryCost, deliveryType }, router });
    };
</script>
