<template>
    <div class="flex flex-col bg-white rounded-md">
        <h2 class="bg-[#ff0000] rounded-t-[inherit] p-5 font-normal text-3xl">Pagamento por m-Pesa</h2>
        <hr />
        <div class="p-5">
            <v-text-field
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
                <h2 class="font-bold text-xl">{{ formatCurrency(total) }}</h2>
            </div>
        </div>
        <div class="text-center mb-2">
            <v-btn @click="confirmePayment">Pagar</v-btn>
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
                        @click="errorDialog = false"
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
    const store = useStore();
    const number = ref("840657153");
    const total = computed(() => store.getters.amoutPayment);
    const errorDialog = ref(false);
    const errorMessage = ref("");

    async function confirmePayment() {
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

        await store.dispatch("mpesapay", { client_number: `258${number.value}` });
    }

    const formatCurrency = (value) => {
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };
</script>

<style scoped>
    .error-dialog-title {
        background-color: #ff0000;
        color: white;
    }
</style>
