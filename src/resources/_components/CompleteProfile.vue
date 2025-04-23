<template lang="">
    <el-dialog
        v-model="completeProfile"
        width="600px"
        :show-close="false"
        align-center
        destroy-on-close>
        <div class="informations border p-3 m-3 bg-foreground_2">
            <h2 class="font-semibold text-lg">Informações pessoais</h2>
            <hr class="my-3" />
            <div
                class="flex flex-row"
                v-if="mySelf">
                <div class="grid sm:grid-cols-2 gap-3 flex-1">
                    <div>
                        <p class="font-semibold mb-1">Nome:</p>
                        <el-input
                            size="small"
                            readonly
                            v-model="mySelf.firstName"
                            placeholder="Nome" />
                    </div>
                    <div>
                        <p class="font-semibold mb-1">Apelido:</p>
                        <el-input
                            readonly
                            size="small"
                            v-model="mySelf.lastName"
                            placeholder="Apelido" />
                    </div>
                    <div>
                        <p class="font-semibold mb-1">Email:</p>
                        <el-input
                            readonly
                            size="small"
                            v-model="mySelf.email"
                            placeholder="Email" />
                    </div>
                    <div>
                        <p class="font-semibold mb-1">Telefone:</p>
                        <el-input
                            size="small"
                            v-model="cellNumber.value.value"
                            placeholder="Nr de telefone" />
                        <span class="error-message">Adiocne seu Número</span>
                        <span class="error-message">{{ cellNumber.errorMessage.value }}</span>
                    </div>
                    <div>
                        <p class="font-semibold mb-1">Província:</p>

                        <el-select
                            filterable
                            placeholder="Província"
                            @change="selectedProvice"
                            v-model="province.value.value"
                            :disabled="loadbtn"
                            autocomplete="Província">
                            <el-option
                                v-for="province in provinces"
                                :key="province"
                                :label="province"
                                :value="province" />
                        </el-select>
                        <span class="error-message">Adicione sua Província</span>
                        <span class="error-message">{{ province.errorMessage.value }}</span>
                    </div>
                    <div>
                        <p class="font-semibold mb-1">Cidade:</p>
                        <el-select
                            filterable
                            placeholder=" Selecione a Cidade"
                            v-model="city.value.value"
                            :disabled="loadbtn">
                            <el-option
                                v-for="city in cities"
                                :key="city"
                                :label="city.label || city"
                                :value="city"
                                :disabled="city.disabled" />
                        </el-select>
                        <span class="error-message">Adicione sua Cidade</span>
                        <span class="error-message">{{ city.errorMessage.value }}</span>
                    </div>
                </div>
            </div>
            <el-button
                @click="submit"
                class="mt-3"
                size="small"
                :icon="Edit"
                :loading="loadbtn">
                Completar perfil
            </el-button>
        </div>
    </el-dialog>
</template>
<script setup>
    import { computed, ref } from "vue";
    import { useStore } from "vuex";
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";
    import { Edit } from "@element-plus/icons-vue";

    const store = useStore();
    const loadbtn = ref(false);

    import { provinces, locations } from "@/util/functions";
    const cities = ref([
        {
            label: "Selecione a Provincia antes da cidade",
            disabled: true,
        },
    ]);
    function selectedProvice(province = province.value.value) {
        cities.value = locations[province];
    }

    const { handleSubmit: handleSignUpSubmit } = useForm({
        validationSchema: toTypedSchema(
            z.object({
                cellNumber: z.string().regex(/^(\+258)?\d{9}$/, { message: "O número de celular deve começar com +258 e ter exatamente 13 dígitos" }),
                province: z.string().regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" }),
                city: z.string().regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" }),
            })
        ),
    });

    const submit = handleSignUpSubmit(
        async (values) => {
            loadbtn.value = true;
            const res = await store.dispatch("addresses/completeProfile", values);
            if (res === false) {
                loadbtn.value = false;
            }
        },
        () => {
            loadbtn.value = false;
        }
    );

    const mySelf = computed(() => store.state.mySelf);
    const cellNumber = useField("cellNumber");
    const city = useField("city");
    const province = useField("province");
    const completeProfile = computed(() => store.state.completeProfile);
</script>
<style lang=""></style>
