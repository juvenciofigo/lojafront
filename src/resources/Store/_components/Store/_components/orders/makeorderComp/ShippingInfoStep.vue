<template>
    <v-stepper-window-item :value="1">
        <h3 class="text-2xl">Informações de envio</h3>
        <br />

        <div class="flex flex-col">
            <h2>Selecione o Endereço</h2>

            <div v-if="addressSkeleton === false">
                <AddressCompSkeleton />
            </div>
            <template v-else>
                <ul
                    v-if="addresses && addresses.length > 0"
                    class="flex flex-col md:flex-row gap-4">
                    <template
                        v-for="(address, index) in addresses"
                        :key="index">
                        <li
                            :value="address._id"
                            @click="select(index)"
                            class="flex address min-w-60 hover:-translate-y-0.5 flex-col flex-wrap gap-4 w-max rounded-md cursor-pointer border-[1px] p-2 hover:border-[#f0d4d4] duration-500 border-[#d6d3d35b">
                            <AddressComp :address="address" />
                        </li>
                    </template>
                </ul>
            </template>
        </div>
        <br />
        <form @submit.stop>
            <div class="flex flex-col gap-3">
                <h3 class="text-xl">Novo Endereço</h3>
                <!-- Nome -->
                <v-text-field
                    :disabled="disabledTextarea || addressSkeleton == false"
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
                    :disabled="disabledTextarea || addressSkeleton == false"
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
                    :disabled="disabledTextarea || addressSkeleton == false"
                    v-model="email.value.value"
                    autocomplete="email"
                    variant="outlined"
                    density="compact"
                    bg-color="white"
                    :error-messages="email.errorMessage.value"
                    label="E-mail"></v-text-field>

                <!-- Número de Celular -->
                <v-text-field
                    :disabled="disabledTextarea || addressSkeleton == false"
                    v-model="cellNumber.value.value"
                    autocomplete="tel"
                    variant="outlined"
                    density="compact"
                    bg-color="white"
                    :error-messages="cellNumber.errorMessage.value"
                    label="Número de Celular"></v-text-field>

                <!-- Bairro -->
                <v-text-field
                    :disabled="disabledTextarea || addressSkeleton == false"
                    v-model="neighborhood.value.value"
                    variant="outlined"
                    placeholder="Cidade"
                    density="compact"
                    bg-color="white"
                    :error-messages="neighborhood.errorMessage.value"
                    label="Bairro"></v-text-field>

                <!-- Endereço completo -->
                <v-text-field
                    :disabled="disabledTextarea || addressSkeleton == false"
                    v-model="complete.value.value"
                    variant="outlined"
                    placeholder="Endereço"
                    density="compact"
                    bg-color="white"
                    :error-messages="complete.errorMessage.value"
                    label="Endereço Completo"></v-text-field>

                <!-- Província -->
                <v-text-field
                    :disabled="disabledTextarea || addressSkeleton == false"
                    v-model="province.value.value"
                    variant="outlined"
                    placeholder="Província"
                    density="compact"
                    bg-color="white"
                    :error-messages="province.errorMessage.value"
                    label="Província"></v-text-field>

                <!-- Cidade -->
                <v-text-field
                    :disabled="disabledTextarea || addressSkeleton == false"
                    v-model="city.value.value"
                    variant="outlined"
                    placeholder="Cidade"
                    density="compact"
                    bg-color="white"
                    :error-messages="city.errorMessage.value"
                    label="Cidade"></v-text-field>

                <!-- Postal -->
                <v-text-field
                    :disabled="disabledTextarea || addressSkeleton == false"
                    v-model="postalCode.value.value"
                    variant="outlined"
                    placeholder="Cidade"
                    density="compact"
                    bg-color="white"
                    :error-messages="postalCode.errorMessage.value"
                    label="Código postal"></v-text-field>

                <!-- País -->
                <v-text-field
                    :disabled="disabledTextarea || addressSkeleton == false"
                    v-model="country.value.value"
                    variant="outlined"
                    placeholder="País"
                    density="compact"
                    bg-color="white"
                    :error-messages="country.errorMessage.value"
                    label="País"></v-text-field>

                <!-- Referencia -->
                <v-text-field
                    :disabled="disabledTextarea || addressSkeleton == false"
                    v-model="reference.value.value"
                    variant="outlined"
                    placeholder="Referência"
                    density="compact"
                    bg-color="white"
                    :error-messages="reference.errorMessage.value"
                    label="Referência"></v-text-field>

                <!-- Nota -->
                <v-textarea
                    :disabled="disabledTextarea || addressSkeleton == false"
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
            <div class="flex flex-row gap-3">
                <el-button
                    :disabled="disabledTextarea"
                    @click="submit()"
                    >Entrar</el-button
                >
                <el-button
                    style="background-color: rgb(204, 15, 15)"
                    @click="
                        () => {
                            handleReset();
                            enableTextarea();
                        }
                    ">
                    Limpar
                </el-button>
            </div>
        </form>
    </v-stepper-window-item>
</template>

<script setup>
    import { defineEmits, defineProps, ref, computed, watch, toRaw } from "vue";
    import { useStore } from "vuex";
    import AddressComp from "@/resources/_components/_partials/AddressComp.vue";
    import AddressCompSkeleton from "@/components/skeletons/AddressCompSkeleton.vue";
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    const store = useStore();

    const selectAddress = ref(computed(() => store.getters.selectAddress));
    const addresses = ref(computed(() => store.getters.addresses));
    const disabledTextarea = ref(false);
    const emit = defineEmits(["address"]);
    const divAddres = ref([]);
    defineProps({
        addressSkeleton: {
            type: Boolean,
        },
    });

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

    const submit = handleSubmit(async (values) => {
        emit("address", { ...values });
    });

    function enableTextarea() {
        disabledTextarea.value = false;
        store.commit("SET_PROVIDE_ADDRESS", false);

        divAddres.value.forEach((item) => {
            item.classList.remove("bg-primary");
        });

        emit("address", null);
    }

    function select(index) {
        divAddres.value = Array.from(document.querySelectorAll(".address"));
        emit("address", null);

        function update() {
            disabledTextarea.value = true;
            store.commit("SET_PROVIDE_ADDRESS", true);
            store.commit("SET_ADDRESS", toRaw(addresses.value[index]));
            submit();
        }

        divAddres.value.forEach((item, idx) => {
            let contai = item.classList.contains("bg-primary");

            if (contai === true && index === idx) {
                // se o elemento clicado contem a class e se é igual a item iterrado
                item.classList.remove("bg-primary");
                store.commit("CLEAR_ADDRESS");
                store.commit("CLEAR_PROVIDE_ADDRESS");
                handleReset();
                enableTextarea();
                store.commit("SET_PROVIDE_ADDRESS", false);
            } else if (contai === true) {
                // troca para o outro
                item.classList.remove("bg-primary");
                update();
            } else if (index === idx) {
                // se nenhum tiver, adicona
                divAddres.value[index].classList.add("bg-primary");
                update();
            }
        });
    }

    watch(selectAddress, async () => {
        if (selectAddress.value !== null) {
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
        }
    });
</script>
<style scoped>
    button {
        background-color: #2da848;
        color: #fff;
        font-size: 12px;
        padding: 10px 45px;
        border: 1px solid transparent;
        border-radius: 8px;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin-top: 10px;
        cursor: pointer;
    }
</style>
