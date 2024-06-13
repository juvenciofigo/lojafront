<template>
    <v-stepper-window-item :value="1">
        <h3 class="text-2xl">Informações de envio</h3>
        <br />
        <div v-if="addresses && addresses.length > 0">
            <h2>Selecione o Endereço</h2>
            <v-item-group selected-class="bg-primary">
                <div class="flex flex-row flex-wrap gap-4">
                    <template
                        v-for="(address, index) in addresses"
                        :key="index">
                        <v-item v-slot="{ selectedClass, toggle }">
                            <div
                                :class="[
                                    selectedClass,
                                    'cursor-pointer rounded-md border-[1px] p-2',
                                    { 'hover:border-[#f0d4d4] hover:-translate-y-0.5 hover:bg-yellow-300 duration-500 border-[#d6d3d35b]': true },
                                ]"
                                @click="
                                    () => {
                                        toggle();
                                        select(index);
                                    }
                                ">
                                <div class="flex flex-col gap-2">
                                    <div>{{ address.firstName }}</div>
                                    <div class="text-muted-foreground text-center">
                                        <div>{{ address.neighborhood }}</div>
                                        <div>{{ address.city }}</div>
                                        <div>{{ address.province }}</div>
                                        <div>{{ address.country }}</div>
                                    </div>
                                </div>
                                <div class="text-end">
                                    <button
                                        @click.stop="confirmDelete(address._id)"
                                        class="p-[3px] rounded-md shadow-[#969191] shadow-sm">
                                        <Trash2
                                            color="red"
                                            size="20" />
                                    </button>
                                </div>
                            </div>
                        </v-item>
                    </template>
                </div>
            </v-item-group>
        </div>
        <br />

        <form>
            <div class="flex flex-col gap-3">
                <h3 class="text-xl">Novo Endereço</h3>
                <!-- Nome -->
                <v-text-field
                    :disabled="disabledTextarea"
                    @change="submit"
                    v-model="firstName.value.value"
                    variant="outlined"
                    placeholder="Nome"
                    density="compact"
                    bg-color="white"
                    :counter="40"
                    :error-messages="firstName.errorMessage.value"
                    label="Nome"></v-text-field>

                <!-- Apelido -->
                <v-text-field
                    :disabled="disabledTextarea"
                    @change="submit"
                    v-model="lastName.value.value"
                    variant="outlined"
                    placeholder="Nome"
                    density="compact"
                    bg-color="white"
                    :counter="40"
                    :error-messages="lastName.errorMessage.value"
                    label="Apelido"></v-text-field>

                <!-- Email -->
                <v-text-field
                    :disabled="disabledTextarea"
                    @change="submit"
                    v-model="email.value.value"
                    autocomplete="email"
                    variant="outlined"
                    density="compact"
                    bg-color="white"
                    :error-messages="email.errorMessage.value"
                    label="E-mail"></v-text-field>

                <!-- Número de Celular -->
                <v-text-field
                    :disabled="disabledTextarea"
                    @change="submit"
                    v-model="cellNumber.value.value"
                    autocomplete="tel"
                    variant="outlined"
                    density="compact"
                    bg-color="white"
                    :error-messages="cellNumber.errorMessage.value"
                    label="Número de Celular"></v-text-field>

                <!-- Bairro -->
                <v-text-field
                    :disabled="disabledTextarea"
                    v-model="neighborhood.value.value"
                    @change="submit"
                    variant="outlined"
                    placeholder="Cidade"
                    density="compact"
                    bg-color="white"
                    :error-messages="neighborhood.errorMessage.value"
                    label="Bairro"></v-text-field>

                <!-- Endereço completo -->
                <v-text-field
                    :disabled="disabledTextarea"
                    @change="submit"
                    v-model="complete.value.value"
                    variant="outlined"
                    placeholder="Endereço"
                    density="compact"
                    bg-color="white"
                    :error-messages="complete.errorMessage.value"
                    label="Endereço Completo"></v-text-field>

                <!-- Província -->
                <v-text-field
                    :disabled="disabledTextarea"
                    @change="submit"
                    v-model="province.value.value"
                    variant="outlined"
                    placeholder="Província"
                    density="compact"
                    bg-color="white"
                    :error-messages="province.errorMessage.value"
                    label="Província"></v-text-field>

                <!-- Cidade -->
                <v-text-field
                    :disabled="disabledTextarea"
                    v-model="city.value.value"
                    @change="submit"
                    variant="outlined"
                    placeholder="Cidade"
                    density="compact"
                    bg-color="white"
                    :error-messages="city.errorMessage.value"
                    label="Cidade"></v-text-field>

                <!-- Postal -->
                <v-text-field
                    :disabled="disabledTextarea"
                    v-model="postalCode.value.value"
                    @change="submit"
                    variant="outlined"
                    placeholder="Cidade"
                    density="compact"
                    bg-color="white"
                    :error-messages="postalCode.errorMessage.value"
                    label="Código postal"></v-text-field>

                <!-- País -->
                <v-text-field
                    :disabled="disabledTextarea"
                    @change="submit"
                    v-model="country.value.value"
                    variant="outlined"
                    placeholder="País"
                    density="compact"
                    bg-color="white"
                    :error-messages="country.errorMessage.value"
                    label="País"></v-text-field>

                <!-- Referencia -->
                <v-text-field
                    :disabled="disabledTextarea"
                    v-model="reference.value.value"
                    @change="submit"
                    variant="outlined"
                    placeholder="Referência"
                    density="compact"
                    bg-color="white"
                    :error-messages="reference.errorMessage.value"
                    label="Referência"></v-text-field>

                <!-- Nota -->
                <v-textarea
                    @change="submit"
                    v-model="note.value.value"
                    variant="outlined"
                    placeholder="Nota"
                    density="compact"
                    bg-color="white"
                    :error-messages="note.errorMessage.value"
                    label="Nota"></v-textarea>

                <input
                    v-model="addressId.value.value"
                    type="text"
                    readonly
                    hidden />
            </div>

            <!-- Botões -->
            <v-btn @click="handleReset(), enableTextarea()">Limpar</v-btn>
        </form>
    </v-stepper-window-item>

    <DialogConfirmation
        :dialog="showDialog"
        tileConfirmation="Deleção de Endereço"
        textConfirmation="Você tem certeza de que deseja deletar este endereço?"
        positiveConfirmation="Deletar"
        @update:dialog="showDialog = $event"
        @cancelar="handleCancel"
        @confirmar="handleConfirm" />
</template>

<script setup>
    import { defineEmits, ref, computed, watch, toRaw } from "vue";
    import { useStore } from "vuex";
    const store = useStore();
    import DialogConfirmation from "@/components/partials/DialogConfirmation.vue";
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    const { handleSubmit, handleReset } = useForm({
        validationSchema: toTypedSchema(
            z.object({
                firstName: z
                    .string()
                    .regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" })
                    .min(4, { message: "O nome deve ter no mínimo 4 caracteres" }),
                lastName: z
                    .string()
                    .regex(/^[\p{L}\s'-]+$/u, { message: "O apelido deve conter apenas letras, espaços, apóstrofos e hífens" })
                    .min(4, { message: "O apelido deve ter no mínimo 4 caracteres" }),
                email: z.string().email({ message: "E-mail inválido" }).optional(),
                cellNumber: z.string().regex(/^(\+258)?\d{9}$/, { message: "O número de celular deve começar com +258 e ter exatamente 13 dígitos" }),
                complete: z.string(),
                country: z.string(),
                province: z.string(),
                city: z.string(),
                neighborhood: z.string(),
                reference: z.string(),
                postalCode: z.string(),
                note: z.string().optional(),
                addressId: z.string().optional(),
            })
        ),
    });

    let firstName = useField("firstName"),
        lastName = useField("lastName"),
        email = useField("email"),
        cellNumber = useField("cellNumber"),
        neighborhood = useField("neighborhood"),
        complete = useField("complete"),
        province = useField("province"),
        city = useField("city"),
        postalCode = useField("postalCode"),
        country = useField("country"),
        reference = useField("reference"),
        note = useField("note"),
        addressId = useField("addressId");

    const selectAddress = ref(computed(() => store.getters.selectAddress));
    const addresses = ref(computed(() => store.getters.addresses));
    const disabledTextarea = ref(false);

    import { Trash2 } from "lucide-vue-next";

    const emit = defineEmits(["address"]);

    const submit = handleSubmit(async (values) => {
        emit("address", { ...values });
    });

    function select(index) {
        disabledTextarea.value = true;
        store.commit("SET_ADDRESS", toRaw(addresses.value[index]));
        store.commit("SET_PROVIDE_ADDRESS", true);
    }

    function enableTextarea() {
        disabledTextarea.value = false;
        store.commit("SET_PROVIDE_ADDRESS", false);
    }

    const showDialog = ref(false);
    const deleteIndex = ref(null);

    function confirmDelete(index) {
        deleteIndex.value = index;
        showDialog.value = true;
    }

    async function deleteAddress() {
        if (deleteIndex.value !== null) {
            enableTextarea();
            await store.dispatch("deleteAddress", deleteIndex.value);
            await store.dispatch("addresses");
            showDialog.value = false;
            deleteIndex.value = null;
        }
    }
    const handleCancel = () => {
        showDialog.value = false;
    };

    const handleConfirm = () => {
        deleteAddress();
    };

    watch(selectAddress, async () => {
        if (selectAddress.value !== false) {
            const address = toRaw(selectAddress.value);

            firstName.value.value = address.firstName;
            lastName.value.value = address.lastName;
            email.value.value = address.email;
            cellNumber.value.value = address.cellNumber;
            complete.value.value = address.complete;
            country.value.value = address.country;
            province.value.value = address.province;
            postalCode.value.value = address.postalCode;
            neighborhood.value.value = address.neighborhood;
            city.value.value = address.city;
            reference.value.value = address.reference;
            if (address.note) {
                note.value.value = address.note;
            }
            if (address._id) {
                addressId.value.value = address._id;
            }
            submit();
        }
    });
</script>
