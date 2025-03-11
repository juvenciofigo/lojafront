<template>
    <div class="flex flex-col">
        <div v-if="addressSkeleton === false">
            <AddressCompSkeleton />
        </div>

        <template v-else>
            <el-collapse
                v-if="addresses && addresses.length > 0"
                class="flex flex-col p-2"
                v-model="activeName"
                accordion>
                <el-collapse-item>
                    <template #title>
                        <span class="ml-2 flex flex-row items-center gap-1"> Selecione o Endereço </span>
                    </template>

                    <ul
                        v-if="addresses && addresses.length > 0"
                        class="grid grid-cols-2 md:flex flex-row flex-wrap gap-1">
                        <li
                            v-for="(address, index) in addresses"
                            :key="index"
                            :value="address._id"
                            @click="select(index)"
                            class="col-span-1 md:flex flex-col flex-wrap gap-4 p-4 rounded-md cursor-pointer border hover:-translate-y-1 duration-500 border-[#e5e7eb] bg-[#f9fafb] hover:border-[#e0a9a9] shadow-md address">
                            <AddressComp :address="address" />
                        </li>
                    </ul>
                </el-collapse-item>
            </el-collapse>
            <el-collapse
                class="flex flex-col p-2"
                v-model="activeName"
                accordion>
                <el-collapse-item>
                    <template #title>
                        <span class="ml-2 flex flex-row items-center gap-1">
                            Novo Endereço <el-icon class="el-icon--upload"><Plus class="w-4 h-4" /></el-icon
                        ></span>
                    </template>
                    <form @submit.stop>
                        <div class="md:flex mb-2 p-2 flex-row gap-4 justify-center bg-blue-200">
                            <!-- informacoes pessoais -->
                            <div class="md:flex flex-row gap-4">
                                <div>
                                    <!-- Nome -->
                                    <div class="w-full">
                                        <el-input
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            type="text"
                                            autocomplete="Name"
                                            v-model="firstName.value.value"
                                            placeholder="Nome" />
                                        <span class="error-message">{{ firstName.errorMessage.value }}</span>
                                    </div>
                                    <!-- Apelido -->
                                    <div class="w-full">
                                        <el-input
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            type="text"
                                            autocomplete="lastname"
                                            v-model="lastName.value.value"
                                            placeholder="Apelido" />
                                        <span class="error-message">{{ lastName.errorMessage.value }}</span>
                                    </div>
                                </div>

                                <div class="flex flex-col">
                                    <!-- Email -->
                                    <div class="w-full">
                                        <el-input
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            type="text"
                                            autocomplete="email"
                                            v-model="email.value.value"
                                            placeholder="Email" />
                                        <span class="error-message">{{ email.errorMessage.value }}</span>
                                    </div>
                                    <!-- Número de Celular -->
                                    <div class="w-full">
                                        <el-input
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            type="text"
                                            autocomplete="tel"
                                            v-model="cellNumber.value.value"
                                            placeholder="Telefone" />
                                        <span class="error-message">{{ cellNumber.errorMessage.value }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- informacoes de endereço -->
                            <div class="flex flex-row gap-4">
                                <div class="">
                                    <!-- Bairro -->
                                    <div class="w-full">
                                        <el-input
                                            name="neighborhood"
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            type="text"
                                            autocomplete="address"
                                            v-model="neighborhood.value.value"
                                            placeholder="Bairro" />
                                        <span class="error-message">{{ neighborhood.errorMessage.value }}</span>
                                    </div>

                                    <!-- Cidade -->
                                    <div class="w-full">
                                        <el-input
                                            name="City"
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            type="text"
                                            autocomplete="Cidade"
                                            v-model="city.value.value"
                                            placeholder="Cidade" />
                                        <span class="error-message">{{ city.errorMessage.value }}</span>
                                    </div>

                                    <!-- Província -->
                                    <div class="w-full">
                                        <el-input
                                            name="Província"
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            type="text"
                                            autocomplete="Província"
                                            v-model="province.value.value"
                                            placeholder="Província" />
                                        <span class="error-message">{{ province.errorMessage.value }}</span>
                                    </div>

                                    <!-- País -->
                                    <div class="w-full">
                                        <el-input
                                            name="País"
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            type="text"
                                            autocomplete="contry"
                                            v-model="country.value.value"
                                            placeholder="País" />
                                        <span class="error-message">{{ country.errorMessage.value }}</span>
                                    </div>
                                </div>

                                <div>
                                    <!-- Endereço completo -->
                                    <div class="w-full">
                                        <el-input
                                            name="Endereço"
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            type="text"
                                            autocomplete="Address "
                                            v-model="complete.value.value"
                                            placeholder="Enderenço completo" />
                                        <span class="error-message">{{ complete.errorMessage.value }}</span>
                                    </div>

                                    <!-- Postal -->
                                    <div class="w-full">
                                        <el-input
                                            name="Código postal"
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            type="text"
                                            autocomplete="postalCode"
                                            v-model="postalCode.value.value"
                                            placeholder="Código postal" />
                                        <span class="error-message">{{ postalCode.errorMessage.value }}</span>
                                    </div>
                                    <!-- Referencia -->
                                    <div class="w-full">
                                        <el-input
                                            name="Ponto de referência"
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            type="textarea"
                                            v-model="reference.value.value"
                                            autosize
                                            placeholder="Ponto de referência" />
                                        <span class="error-message">{{ reference.errorMessage.value }}</span>
                                    </div>

                                    <!-- Nota -->
                                    <div class="w-full">
                                        <el-input
                                            name="Nota"
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            type="textarea"
                                            v-model="note.value.value"
                                            autosize
                                            placeholder="Nota" />
                                        <span class="error-message">{{ note.errorMessage.value }}</span>
                                    </div>
                                </div>
                            </div>

                            <input
                                v-model="addressId.value.value"
                                type="text"
                                readonly
                                hidden />
                        </div>

                        <!-- Botões -->
                        <div class="flex flex-row gap-1">
                            <el-button
                                size="small"
                                type="success"
                                class="text-black"
                                :disabled="disabledTextarea"
                                @click="submit()"
                                >Submeter</el-button
                            >
                            <el-button
                                class="text-black"
                                size="small"
                                type="danger"
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
                </el-collapse-item>
            </el-collapse>
        </template>
    </div>
</template>

<script setup>
    import { defineEmits, defineProps, ref, computed, watch, toRaw } from "vue";
    import { useStore } from "vuex";
    import AddressComp from "@/resources/_components/_partials/AddressComp.vue";
    import AddressCompSkeleton from "@/components/skeletons/AddressCompSkeleton.vue";
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    import { Plus } from "@element-plus/icons-vue";

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
                firstName: z.string().regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" }),
                // .min(4, { message: "O nome deve ter no mínimo 4 caracteres" })
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
    .input-field {
        max-width: 380px;
        width: 100%;
        margin: 5px 0;
    }

    .input-field input {
        width: 100%;
        border: none;
        font-size: 13px;
        border-radius: 8px;
        width: 100%;
        outline: none;
    }
    .error-message {
        margin: 5px 0 0 0;
        padding: 0 0 0 10px;
        width: 100%;
        height: 15px;
        font-size: x-small;
        line-height: 13px;
        color: red;
        display: flex;
        align-items: center;
    }
    .input-field input::placeholder {
        color: #aaa;
        font-weight: 500;
    }
</style>
