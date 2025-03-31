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
                            @click="selelectingAddress(index)"
                            class="col-span-1 md:flex flex-col flex-wrap gap-4 p-4 rounded-md cursor-pointer border hover:-translate-y-1 duration-500 border-[#e5e7eb] bg-[#f9fafb] hover:border-[#e0a9a9] shadow-md address">
                            <AddressComp :address="address" />
                        </li>
                    </ul>
                </el-collapse-item>
            </el-collapse>

            <!-- Novo -->
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
                    <div>
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
                                <div class="flex-1">
                                    <!-- Província -->
                                    <div class="w-full">
                                        <el-select
                                            filterable
                                            placeholder="Província"
                                            @change="selectedProvice"
                                            v-model="province.value.value"
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            autocomplete="Província">
                                            <el-option
                                                v-for="province in provinces"
                                                :key="province"
                                                :label="province"
                                                :value="province" />
                                        </el-select>

                                        <span class="error-message">{{ province.errorMessage.value }}</span>
                                    </div>

                                    <!-- Cidade -->
                                    <div class="w-full">
                                        <el-select
                                            filterable
                                            placeholder=" Selecione a Cidade"
                                            v-model="city.value.value"
                                            :disabled="disabledTextarea || addressSkeleton == false">
                                            <el-option
                                                v-for="city in cities"
                                                :key="city"
                                                :label="city.label || city"
                                                :value="city"
                                                :disabled="city.disabled" />
                                        </el-select>

                                        <span class="error-message">{{ city.errorMessage.value }}</span>
                                    </div>

                                    <!-- Endereço completo -->
                                    <div class="w-full">
                                        <el-input
                                            name="Endereço"
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            type="text"
                                            autocomplete="Address "
                                            v-model="complete.value.value"
                                            placeholder="Bairro, Rua, Quarteirão" />
                                        <span class="error-message">{{ complete.errorMessage.value }}</span>
                                    </div>
                                </div>

                                <div class="flex-1">
                                    <!-- Postal -->
                                    <div class="w-full">
                                        <el-input-number
                                            :controls="false"
                                            v-model="postalCode.value.value"
                                            :disabled="disabledTextarea || addressSkeleton == false"
                                            autocomplete="postalCode"
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
                        </div>

                        <!-- Botões -->
                        <div class="flex flex-row gap-1">
                            <!-- <input
                                v-model="addressId.value.value"
                                type="text"
                                readonly
                                hidden /> -->
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
                    </div>
                </el-collapse-item>
            </el-collapse>
        </template>
        <CompleteProfile />
    </div>
</template>

<script setup>
    import { defineProps, ref, computed, toRaw } from "vue";
    import { useStore } from "vuex";
    import AddressComp from "@/resources/_components/_partials/AddressCard.vue";
    import AddressCompSkeleton from "@/components/skeletons/AddressCompSkeleton.vue";
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    import { Plus } from "@element-plus/icons-vue";
    import CompleteProfile from "@/resources/_components/CompleteProfile.vue";

    const store = useStore();

    const addresses = computed(() => store.state.addresses.addresses);
    const disabledTextarea = ref(false);
    const divAddres = ref([]);
    defineProps({
        addressSkeleton: {
            type: Boolean,
        },
    });

    import { provinces, locations } from "@/util/functions";
    const cities = ref([
        {
            label: "Selecione a Provincia antes da cidade",
            disabled: true,
        },
    ]);
    function selectedProvice(province = province.value.value) {
        city.value.value = null;
        
        cities.value = locations[province];
    }

    const { handleSubmit, handleReset } = useForm({
        validationSchema: toTypedSchema(
            z.object({
                firstName: z.string().regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" }),
                lastName: z.string().regex(/^[\p{L}\s'-]+$/u, { message: "O apelido deve conter apenas letras, espaços, apóstrofos e hífens" }),
                email: z.string().email({ message: "E-mail inválido" }).optional(),
                cellNumber: z.string().regex(/^(\+258)?\d{9}$/, { message: "O número de celular deve começar com +258 e ter exatamente 13 dígitos" }),
                complete: z.string(),
                province: z.string().regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" }),
                city: z.string().regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" }),
                reference: z.string(),
                postalCode: z.number(),
                note: z.string().optional(),
            })
        ),
    });

    let firstName = useField("firstName"),
        lastName = useField("lastName"),
        email = useField("email"),
        cellNumber = useField("cellNumber"),
        complete = useField("complete"),
        province = useField("province"),
        city = useField("city"),
        postalCode = useField("postalCode"),
        reference = useField("reference"),
        note = useField("note");

    const submit = handleSubmit(
        async (values) => {
            disabledTextarea.value = true;
            await store.dispatch("addresses/addAddress", values);
            disabledTextarea.value = false;
        },
        () => {
            disabledTextarea.value = false;
        }
    );

    function enableTextarea() {
        disabledTextarea.value = false;
        divAddres.value.forEach((item) => {
            item.classList.remove("bg-primary");
        });
    }

    function selelectingAddress(index) {
        // Limpa estado e obtém elementos
        store.commit("addresses/CLEAR_ADDRESS");
        const addressElements = Array.from(document.querySelectorAll(".address"));

        // Valida índice
        if (index < 0 || index >= addressElements.length) return;

        // Controla a classe ativa
        const toggleActiveClass = (element, add) => {
            element.classList.toggle("bg-primary", add);
        };

        // Atualiza estado e submete
        const updateSelection = () => {
            disabledTextarea.value = true;
            store.commit("addresses/SET_ADDRESS", toRaw(addresses.value[index]));
            submit();
        };

        // Lógica principal de seleção
        addressElements.forEach((element, idx) => {
            const isSelected = element.classList.contains("bg-primary");
            const isCurrent = idx === index;

            if (isSelected && isCurrent) {
                // Desselecionar item atual
                toggleActiveClass(element, false);
                handleReset();
                enableTextarea();
                return;
            }

            if (isSelected) {
                // Remover seleção anterior
                toggleActiveClass(element, false);
            }

            if (isCurrent) {
                // Selecionar novo item
                toggleActiveClass(element, true);
                updateSelection();
            }
        });
    }
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

    .input-field input::placeholder {
        color: #aaa;
        font-weight: 500;
    }
</style>

