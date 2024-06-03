<template>
        <v-card height="200">
            <h2>Pagamento por m-Pesa</h2>

            <div>
                <div class="form-group">
                    <label for="amount">Valor a pagar: </label>
                    <input
                        type="number"
                        readonly
                        step="0.01"
                        min="1"
                        name="amount"
                        class="form-control"
                        :value="store.state.totalprice" />
                </div>
                <div class="form-group">
                    <label for="">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        class="form-control"
                        value="number"
                        v-model="number" />
                </div>
                <button @click="confirmePayment()">pagar</button>
            </div>
        </v-card>
</template>
<script setup>
    import { useStore } from "vuex";
    import { ref } from "vue";
    const store = useStore();
    const number = ref("");

    
    async function confirmePayment() {
        const payload = {
            client_number: `258${number.value}`,
            third_party_reference: transaction_reference,
            transaction_reference: transaction_reference,
        };

        await store.dispatch("mpesapay", { ...payload });
    }
</script>
<style></style>
