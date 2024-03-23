<template lang="">
    <v-stepper-window-item :value="1">
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
            <v-btn @click="handleReset">Limpar</v-btn>
        </form>
    </v-stepper-window-item>
</template>
<script setup>
    import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
    import { Input } from "@/components/ui/input";

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
</script>
<style lang=""></style>
