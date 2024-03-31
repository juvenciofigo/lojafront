<template>
    <v-stepper
        v-model="step"
        editable
        :items="['Informações de Envio', 'Informações de Pagamento', 'Confirmação']"
        show-actions>
        <template v-slot:item.1>
            <h3 class="text-h6">Informações de envio</h3>

            <br />

            <form @submit.prevent="submit">
                <div class="flex flex-col gap-3">
                    <!-- Nome -->
                    <v-text-field
                        v-model="name.value.value"
                        variant="outlined"
                        placeholder="Nome"
                        density="compact"
                        bg-color="white"
                        :counter="40"
                        :error-messages="name.errorMessage.value"
                        label="Nome">
                    </v-text-field>

                    <!-- Email -->
                    <v-text-field
                        v-model="email.value.value"
                        autocomplete="email"
                        variant="outlined"
                        density="compact"
                        bg-color="white"
                        :error-messages="email.errorMessage.value"
                        label="E-mail">
                    </v-text-field>

                    <!-- Número de Celular -->
                    <v-text-field
                        v-model="cellNumber.value.value"
                        autocomplete="tel"
                        variant="outlined"
                        density="compact"
                        bg-color="white"
                        :error-messages="cellNumber.errorMessage.value"
                        label="Número de Celular">
                    </v-text-field>

                    <!-- Endereço -->
                    <v-text-field
                        v-model="address.value.value"
                        variant="outlined"
                        placeholder="Endereço"
                        density="compact"
                        bg-color="white"
                        :error-messages="address.errorMessage.value"
                        label="Endereço Completo">
                    </v-text-field>

                    <!-- País -->
                    <v-text-field
                        v-model="country.value.value"
                        variant="outlined"
                        placeholder="País"
                        density="compact"
                        bg-color="white"
                        :error-messages="country.errorMessage.value"
                        label="País">
                    </v-text-field>

                    <!-- Província -->
                    <v-text-field
                        v-model="province.value.value"
                        variant="outlined"
                        placeholder="Província"
                        density="compact"
                        bg-color="white"
                        :error-messages="province.errorMessage.value"
                        label="Província">
                    </v-text-field>

                    <!-- Cidade -->
                    <v-text-field
                        v-model="city.value.value"
                        variant="outlined"
                        placeholder="Cidade"
                        density="compact"
                        bg-color="white"
                        :error-messages="city.errorMessage.value"
                        label="Cidade">
                    </v-text-field>

                    <!-- Nota -->
                    <v-textarea
                        v-model="note.value.value"
                        variant="outlined"
                        placeholder="Nota"
                        density="compact"
                        bg-color="white"
                        :error-messages="note.errorMessage.value"
                        label="Nota">
                    </v-textarea>
                </div>

                <!-- Botões -->
                <v-btn
                    class="me-4"
                    type="submit">
                    Enviar
                </v-btn>
                <v-btn @click="handleReset">Limpar</v-btn>
            </form>
        </template>

        <template v-slot:item.2>
            <h3 class="text-h6">Informações de pagamento</h3>

            <br />

            <div>
                <h2>Pagamento por m-Pesa</h2>
                <form @click.prevent="confirmePayment">
                    <input type="number" />

                    <button>Confirmar</button>
                </form>
            </div>
        </template>

        <template v-slot:item.3>
            <h3 class="text-h6">Confirmação</h3>

            <br />

            <CartProductsComp :cartProducts="cartProducts" />
        </template>
        <v-stepper-actions
            :disabled="disabled"
            @click:next="next"
            @click:prev="prev">
        </v-stepper-actions>
    </v-stepper>

    <!-- /////////////////////// -->

    <div class="flex-1">
        <h1>Fazer Pedido</h1>
        <p>Quant. de produtos: {{ cartTotal }}</p>
        <p>Preço total de produtos: {{ formatCurrency(priceTotal) }}</p>
        <p>Taxa de envio: {{ formatCurrency(taxaEnvio) }}</p>
        <p>Total: {{ formatCurrency(totalPedido) }}</p>

        <button @click="finalizarPedido">Finalizar Pedido</button>
    </div>
</template>

<script setup>
    import { useRouter } from "vue-router";
    import { computed, ref } from "vue";
    import { useStore } from "vuex";
    import { Input } from "@/components/ui/input";

    const router = useRouter();
    const store = useStore();
    const cartProducts = ref(computed(() => store.getters.cartProducts));

    // Função para formatar valores monetários
    const formatCurrency = (value) => {
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };

    // Calculando o total de produtos no carrinho
    const cartTotal = computed(() => {
        return calculateCartTotal(store.getters.cartProducts);
    });

    // Calculando o preço total de produtos
    const priceTotal = computed(() => {
        return calculatePriceTotal(store.getters.cartProducts);
    });

    // Definindo uma taxa de envio fixa
    const taxaEnvio = ref(10);

    // Calculando o total do pedido
    const totalPedido = computed(() => {
        return priceTotal.value + taxaEnvio.value;
    });

    // Função para finalizar o pedido
    const finalizarPedido = () => {
        store.dispatch("finalizarPedido");
        router.push("/");
    };

    // Função para calcular o total de produtos no carrinho
    const calculateCartTotal = (cartProducts) => {
        return cartProducts.reduce((total, product) => total + product.quantity, 0);
    };

    // Função para calcular o preço total de produtos
    const calculatePriceTotal = (cartProducts) => {
        return cartProducts.reduce((total, product) => total + product.subtotal, 0);
    };

    const step = ref(1);
    import CartProductsComp from "@/resources/Store/_components/CartProductsComp.vue";

    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    const { handleSubmit, handleReset } = useForm({
        validationSchema: toTypedSchema(
            z.object({
                // Name
                name: z
                    .string()
                    .regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" })
                    .min(4, { message: "O nome deve ter no mínimo 4 caracteres" }),

                // Email
                email: z.string().email({ message: "E-mail inválido" }),

                // Cell number
                cellNumber: z.string().regex(/^(\+258)?\d{9}$/, { message: "O número de celular deve começar com +258 e ter exatamente 13 dígitos" }),
                // Address
                address: z.string(),

                // Country
                country: z.string(),

                // Province
                province: z.string(),

                // City
                city: z.string(),

                // Note
                note: z.string().optional(),
            })
        ),
    });

    const name = useField("name"),
        email = useField("email"),
        cellNumber = useField("cellNumber"),
        address = useField("address"),
        country = useField("country"),
        province = useField("province"),
        city = useField("city"),
        note = useField("note");

    const submit = handleSubmit(async (values) => {
        await store.dispatch("newUser", { values, router });
    });

    const e1 = ref(1);
    const steps = ref(2);
    function disabled() {
        return e1.value === 1 ? "prev" : e1.value === steps.value ? "next" : undefined;
    }
</script>
