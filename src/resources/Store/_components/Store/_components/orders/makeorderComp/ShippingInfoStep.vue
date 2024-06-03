<template lang="">
    <v-stepper-window-item :value="1">
        <h3 class="text-h6">Informações de envio</h3>

        <br />

        <form>
            <div class="flex flex-col gap-3">
                <!-- Nome -->
                <v-text-field
                    @change="submit"
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
                    @change="submit"
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
                    @change="submit"
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
                    @change="submit"
                    v-model="address.value.value"
                    variant="outlined"
                    placeholder="Endereço"
                    density="compact"
                    bg-color="white"
                    :error-messages="address.errorMessage.value"
                    label="Endereço Completo">
                </v-text-field>

                <!-- Referencia -->
                <v-text-field
                    v-model="reference.value.value"
                    @change="submit"
                    variant="outlined"
                    placeholder="Referência"
                    density="compact"
                    bg-color="white"
                    :error-messages="reference.errorMessage.value"
                    label="Referência">
                </v-text-field>

                <!-- País -->
                <v-text-field
                    @change="submit"
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
                    @change="submit"
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
                    @change="submit"
                    variant="outlined"
                    placeholder="Cidade"
                    density="compact"
                    bg-color="white"
                    :error-messages="city.errorMessage.value"
                    label="Cidade">
                </v-text-field>

                <!-- Nota -->
                <v-textarea
                    @change="submit"
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
    import { defineEmits, ref, computed, watch, toRaw } from "vue";
    import { useStore } from "vuex";
    const store = useStore();

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
                // address
                address: z.string(),

                // Country
                country: z.string(),

                // Province
                province: z.string(),

                // City
                city: z.string(),
                //reference
                reference: z.string(),

                // Note
                note: z.string().optional(),
            })
        ),
    });

    let name = useField("name"),
        email = useField("email"),
        cellNumber = useField("cellNumber"),
        address = useField("address"),
        country = useField("country"),
        province = useField("province"),
        city = useField("city"),
        reference = useField("reference"),
        note = useField("note");
    const deliveryData = ref(computed(() => store.getters.deliveryData));
    const emit = defineEmits(["deliveryData"]);

    const submit = handleSubmit(async (values) => {
        emit("deliveryData", values);
    });
    watch(deliveryData, async () => {
        if (deliveryData.value !== false) {
            const customer = toRaw(deliveryData.value.customer);

            name.value.value = customer.name;
            email.value.value = customer.email;
            cellNumber.value.value = customer.contacts;
            address.value.value = customer.address.address;
            country.value.value = customer.address.country;
            province.value.value = customer.address.province;
            city.value.value = customer.address.city;
            reference.value.value = customer.address.reference;
            if (customer.note) {
                note.value.value = customer.note;
            }
            submit();
        }
    });
</script>
<style lang=""></style>
