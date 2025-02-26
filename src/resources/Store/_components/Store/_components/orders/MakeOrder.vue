<template>
    <div class="flex-1">
        <v-stepper
            prev-text="Anterior"
            next-text="Próximo"
            editable
            v-model="currentStep">
            <template v-slot:default="{ prev, next }">
                <v-stepper-header>
                    <template
                        v-for="(step, index) in steps"
                        :key="index">
                        <v-stepper-item
                            :complete="currentStep > index"
                            :value="index + 1"
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
                        :addressSkeleton="addressRes"
                        @next="nextStep"
                        @address="handleDeliveryData" />
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
            <v-btn
                :disabled="buttonStatus"
                :loading="loading"
                class="self-end button"
                @click="sendOrder()">
                Finalizar Pedido
            </v-btn>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onBeforeUnmount, onBeforeMount, toRaw } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";

    import ShippingInfoStep from "@/resources/Store/_components/Store/_components/orders/makeorderComp/ShippingInfoStep.vue";
    import ConfirmationStep from "@/resources/Store/_components/Store/_components/orders/makeorderComp/ConfirmationStep.vue";

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const steps = ref(["Informações de Envio", "Confirmação"]);
    const currentStep = ref(1);
    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));
    const addressRes = ref(false);

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
        store.commit("CLEAR_ADDRESSES");
        store.commit("CLEAR_ADDRESS");
        store.commit("CLEAR_PROVIDE_ADDRESS");
    });
    const cart = ref(computed(() => toRaw(store.getters.cart)));

    // on Mount
    onBeforeMount(async () => {
        const from = route.query.productsFrom;
        if (from) {
            if (from === "cartProducts") {
                await store.dispatch("displayCartProducts", isAuthenticated.value);

                if (!cart.value.items || cart.value.items.length <= 0) {
                    router.push({ name: "home" });
                    window.location.href = "/";
                }
                if (isAuthenticated.value === true) {
                    userAddresses();
                }
                return;
            }

            if (from === "payNow") {
                await store.dispatch("buyNow", { product: { id: route.query.product, quantity: route.query.quantity } });

                if (isAuthenticated.value === true) {
                    userAddresses();
                }
                return;
            }
        }

        router.push({ name: "home" });
    });

    async function userAddresses() {
        await store.dispatch("addresses");
        addressRes.value = true;
    }

    function gerReferenceNumeber() {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const caracteresLength = caracteres.length;
        const tamanhoMinimo = 6;
        const tamanhoMaximo = 20;

        // Gerar um timestamp único
        const timestamp = new Date().getTime().toString();

        // Gerar um número aleatório de caracteres
        const numeroAleatorio = Array.from({ length: tamanhoMaximo }, () => caracteres.charAt(Math.floor(Math.random() * caracteresLength))).join("");

        // Calcula o tamanho do número de referência
        const tamanho = Math.floor(Math.random() * (tamanhoMaximo - tamanhoMinimo + 1)) + tamanhoMinimo;

        // Combinar o timestamp e o número aleatório para formar o número de referência
        const numeroReferencia = `${timestamp}${numeroAleatorio}`.slice(0, tamanho);

        return numeroReferencia;
    }

    // Finalizar o pedido
    let selectAddress = ref(null);
    const confirmationData = ref(null);

    const handleDeliveryData = (data) => {
        selectAddress.value = data;
    };
    const handleConfirmationData = (data) => {
        confirmationData.value = data;
    };
    const loading = ref(false);

    async function sendOrder() {
        if (!selectAddress.value) {
            store.commit("updateSnackbar", {
                text: "Preencha o campo com as informações de envio",
                snackbarType: "error",
            });
            loading.value = false;
            prevStep();
            return;
        }

        if (!confirmationData.value) {
            window.location.reload();
            return;
        }

        const res = await store.dispatch("sendOrder", {
            selectAddress: toRaw(selectAddress.value),
            cart: cart.value.cartId,
            reference: gerReferenceNumeber(),
        });

        if (!res || res === false) {
            loading.value = false;
        }
    }
</script>
<style scoped>
    .button {
        background-color: #2da848;
        color: #fff;
        font-size: 12px;
        padding: 10px 45px;
        border: 1px solid transparent;
        border-radius: 8px;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin-top: 10px;
        cursor: pointer;
    }
</style>
