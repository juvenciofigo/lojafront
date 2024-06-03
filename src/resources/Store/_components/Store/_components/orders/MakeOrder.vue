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
                        @next="nextStep"
                        @deliveryData="handleDeliveryData" />
                    <ConfirmationStep
                        :currentStep="currentStep"
                        @submit="handleConfirmationData"
                        @prev="prevStep" />
                </v-stepper-window>

                <v-stepper-actions
                    :disabled="disabled"
                    @click:next="next"
                    @click:prev="prev">
                </v-stepper-actions>
            </template>
        </v-stepper>
        <div class="mt-2 flex flex-row justify-end">
            <Button
                :disabled="buttonStatus"
                class="self-end w-max"
                @click="makeOrder()">
                Finalizar Pedido
            </Button>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onBeforeUnmount, onBeforeMount, toRaw } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";

    import ShippingInfoStep from "@/resources/Store/_components/Store/_components/orders/makeorderComp/ShippingInfoStep.vue";
    import ConfirmationStep from "@/resources/Store/_components/Store/_components/orders/makeorderComp/ConfirmationStep.vue";
    import { Button } from "@/components/ui/button";

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const steps = ref(["Informações de Envio", "Confirmação"]);
    const currentStep = ref(1);
    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));

    const nextStep = () => {
        currentStep.value++;
    };

    const prevStep = () => {
        currentStep.value--;
    };

    const disabled = computed(() => (currentStep.value === 1 ? "prev" : currentStep.value === steps.value.length ? "next" : undefined));
    const buttonStatus = computed(() => currentStep.value !== steps.value.length);

    // before Unmount
    onBeforeUnmount(() => {
        store.commit("CLEAR_CARTPRODUCTS");
    });
    const cartProducts = ref(computed(() => toRaw(store.getters.cartProducts)));

    // on Mount
    onBeforeMount(async () => {
        const from = route.query.productsFrom;

        async function userDara() {
            await store.dispatch("deliveryData");
        }

        if (from === "cartProducts") {
            await store.dispatch("displayTempCartProducts", isAuthenticated.value);

            if (!cartProducts.value || cartProducts.value.length <= 0) {
                router.push({ name: "homepage" });
                return;
            }

            if (isAuthenticated.value === true) {
                userDara();
            }
            return;
        }

        if (from === "payNow") {
            await store.dispatch("buyNow", { product: { id: route.query.product, quantity: route.query.quantity } });

            if (isAuthenticated.value === true) {
                userDara();
            }
            return;
        }

        router.push({ name: "homepage" });
    });

    function gerReferenceNumeber() {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const caracteresLength = caracteres.length;
        const tamanhoMinimo = 6;
        const tamanhoMaximo = 20;

        // Gera um timestamp único
        const timestamp = new Date().getTime().toString();

        // Gera um número aleatório de caracteres
        const numeroAleatorio = Array.from({ length: tamanhoMaximo }, () => caracteres.charAt(Math.floor(Math.random() * caracteresLength))).join("");

        // Calcula o tamanho do número de referência
        const tamanho = Math.floor(Math.random() * (tamanhoMaximo - tamanhoMinimo + 1)) + tamanhoMinimo;

        // Combina o timestamp e o número aleatório para formar o número de referência
        const numeroReferencia = `${timestamp}${numeroAleatorio}`.slice(0, tamanho);

        return numeroReferencia;
    }

    // Finalizar o pedido
    let deliveryData = null;
    let confirmationData = null;

    const handleDeliveryData = (data) => {
        deliveryData = data;
    };
    const handleConfirmationData = (data) => {
        confirmationData = data;
    };
    const status = ref(computed(() => store.state.deliveryData));

    async function makeOrder() {
        if (!deliveryData) {
            store.commit("updateSnackbar", { show: true, text: "Preencha o campo com as informações de envio", color: "red" });
            return;
        }
        const delivery = {
            email: deliveryData.email,
            name: deliveryData.name,
            contacts: deliveryData.cellNumber,
            address: {
                country: deliveryData.country,
                address: deliveryData.address,
                city: deliveryData.city,
                province: deliveryData.province,
                reference: deliveryData.reference,
            },
            note: deliveryData.note,
        };

        store.dispatch("sendOrder", { status: toRaw(status.value), data: { delivery, confirmationData: toRaw(confirmationData), cart: cartProducts.value, referece: gerReferenceNumeber() } });
    }
</script>
