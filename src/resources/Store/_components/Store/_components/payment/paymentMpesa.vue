<template>
    <div class="flex flex-col rounded-md bg-white">
        <h2 class="rounded-t-[inherit] bg-[#ff0000] p-5 text-3xl font-normal">Pagamento por m-Pesa</h2>
        <hr />
        <div class="p-5">
            <v-text-field
                @keyup.enter="confirmePayment"
                v-model="number"
                type="number"
                variant="outlined"
                placeholder="84/85*****"
                density="compact"
                bg-color="white"
                label="Digite o numero Mpesa">
            </v-text-field>
            <div>
                <p class="text-muted-foreground">Valor a pagar:</p>
                <h2 class="text-xl font-bold">{{ formatCurrency(total) }}</h2>
            </div>
        </div>
        <div class="mb-2 text-center">
            <v-btn
                :loading="loading"
                @click="confirmePayment"
                >Pagar</v-btn
            >
        </div>
        <v-dialog
            v-model="errorDialog"
            max-width="500">
            <v-card>
                <v-card-title class="error-dialog-title">Erro</v-card-title>
                <v-card-text>{{ errorMessage }}</v-card-text>
                <v-card-actions>
                    <v-btn
                        color="primary"
                        @click="((errorDialog = false), (loading = false))"
                        >OK</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
    import { useStore } from "vuex";
    import { ref, computed } from "vue";
    import { formatCurrency } from "@/util/functions";

    const store = useStore();
    const number = ref("");
    const total = computed(() => store.state.payments.amoutPayment);
    const errorDialog = ref(false);
    const errorMessage = ref("");
    const loading = ref(false);

    async function confirmePayment() {
        loading.value = true;
        if (!number.value) {
            errorMessage.value = "Por favor, digite o número Mpesa.";
            errorDialog.value = true;
            return;
        }
        if (number.value.length !== 9) {
            errorMessage.value = "Por digite, um numero valido.";
            errorDialog.value = true;
            return;
        }

        const res = await store.dispatch("payments/mpesapay", { client_number: `258${number.value}` });
        if (res === false) loading.value = false;
    }
</script>

<style scoped>
    .error-dialog-title {
        background-color: #ff0000;
        color: white;
    }
</style>
