<template>
    <v-stepper-window-item :value="2">
        <v-card height="200">
            <h2>Pagamento por m-Pesa</h2>
            <form @click.prevent="confirmePayment">
                <!-- Número de Celular -->
                <v-text-field
                    autocomplete="tel"
                    variant="outlined"
                    density="compact"
                    bg-color="white"
                    :error-messages="cellNumber.errorMessage.value"
                    label="Número de Celular para pagamento">
                </v-text-field>

                <button>Confirmar</button>
            </form>
            <div>
                <h2>Digite o código de confirmação</h2>

                <v-text-field
                    variant="outlined"
                    density="compact"
                    bg-color="white">
                </v-text-field>
            </div>
        </v-card>
    </v-stepper-window-item>
</template>
<script setup>
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    const { handleSubmit, handleReset } = useForm({
        validationSchema: toTypedSchema(
            z.object({
                // Cell number
                cellNumber: z.string().regex(/^(\+258)?\d{9}$/, { message: "O número de celular deve começar com +258 e ter exatamente 13 dígitos" }),
            })
        ),
    });

    const cellNumber = useField("cellNumber");

    const submit = handleSubmit(async (values) => {
        await store.dispatch("newUser", { values, router });
    });
</script>
<style></style>
