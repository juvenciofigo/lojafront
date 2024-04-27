<template>
    <v-stepper-window-item :value="2">
        <v-card height="200">
            <h2>Pagamento por m-Pesa</h2>
            <!-- <form @click.prevent="confirmePayment"> -->
            <!-- Número de Celular -->
            <!-- <v-text-field
                    autocomplete="tel"
                    variant="outlined"
                    density="compact"
                    bg-color="white"
                    :error-messages="cellNumber.errorMessage.value"
                    label="Número de Celular para pagamento"> -->
            <!-- </v-text-field> -->

            <!-- <buttonz>Confirmar</buttonz> -->
            <!-- </form> -->
            <div>
                <div class="form-group">
                    <label for="amount">Amount</label>
                    <input
                        type="number"
                        step="0.01"
                        min="1"
                        name="amount"
                        class="form-control"
                        value="" />
                </div>
                <div class="form-group">
                    <label for="">Email</label>
                    <input
                        type="email"
                        name="email"
                        class="form-control"
                        value="" />
                </div>
                <div class="form-group">
                    <label for="">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        class="form-control"
                        value="" />
                </div>
                <div class="form-group">
                    <label for="">Name</label>
                    <input
                        type="text"
                        name="name"
                        class="form-control"
                        value="" />
                </div>
                <div class="">
                    <div class="">
                        <div class="form-group">
                            <input
                                type="hidden"
                                id="success_return_url"
                                name="success_return_url"
                                value="null" />
                        </div>
                    </div>
                    <div class="">
                        <div class="form-group">
                            <input
                                type="hidden"
                                id="error_return_url"
                                name="error_return_url"
                                value="null" />
                        </div>
                    </div>
                    <div class="">
                        <div class="form-group">
                            <input
                                type="hidden"
                                id="is_test"
                                name="is_test"
                                value="1"
                                checked />
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <input
                        type="hidden"
                        name="callback_url"
                        value=""
                        class="form-control" />
                </div>
                <div class="form-group">
                    <label for="">Purpose</label>
                    <input
                        type="text"
                        name="purpose"
                        value="test"
                        class="form-control" />
                </div>
                <button @click="confirmePayment()"></button>
            </div>
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

    useForm({
        validationSchema: toTypedSchema(
            z.object({
                // Cell number
                cellNumber: z.string().regex(/^(\+258)?\d{9}$/, { message: "O número de celular deve começar com +258 e ter exatamente 13 dígitos" }),
            })
        ),
    });

    const cellNumber = useField("cellNumber");


</script>
<style></style>
