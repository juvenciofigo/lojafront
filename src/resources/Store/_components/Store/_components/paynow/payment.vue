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
    const transaction_reference = gerReferenceNumeber();

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
