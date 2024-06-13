<template>
    <div class="flex flex-row h-100">
        <div class="flex-1"></div>

        <div class="max-w-[400px] w-screen flex flex-col justify-between bg-slate-300">
            <div class="flex flex-col flex-1">
                <LogoPart />

                <Separator
                    orientation="horizontal"
                    class="w-[85%] self-center my-4 mb-6"
                    decotarive />

                <p class="text-blue-600 text-2xl self-center">Bem-vindo!</p>

                <div class="px-7 mt-10">
                    <form @submit.prevent="submit">
                        <div class="flex flex-col gap-3">
                            <v-text-field
                                v-model="firstName.value.value"
                                variant="outlined"
                                placeholder="Nome"
                                density="compact"
                                bg-color="white"
                                :counter="40"
                                :error-messages="firstName.errorMessage.value"
                                label="Nome">
                            </v-text-field>
                            <v-text-field
                                v-model="lastName.value.value"
                                variant="outlined"
                                placeholder="Apelido"
                                density="compact"
                                bg-color="white"
                                :counter="40"
                                :error-messages="lastName.errorMessage.value"
                                label="Apelido">
                            </v-text-field>
                            <v-text-field
                                v-model="password.value.value"
                                autocomplete="new-password"
                                variant="outlined"
                                density="compact"
                                bg-color="white"
                                :counter="8"
                                type="password"
                                :error-messages="password.errorMessage.value"
                                label="Senha">
                            </v-text-field>
                            <v-text-field
                                v-model="email.value.value"
                                autocomplete="email"
                                variant="outlined"
                                density="compact"
                                bg-color="white"
                                :error-messages="email.errorMessage.value"
                                label="E-mail">
                            </v-text-field>
                        </div>

                        <v-btn
                            class="me-4"
                            type="submit">
                            Enviar
                        </v-btn>

                        <v-btn @click="handleReset"> Limpar </v-btn>
                    </form>

                    <p class="px-2 mt-[25px]">
                        <span>Esqueceu a senha? </span>
                        <span class="underline">
                            <router-link to="#"><span class="whitespace-nowrap"> Recuperar senha!</span></router-link>
                        </span>
                    </p>

                    <p class="px-2 mt-[25px]">
                        <span>Ja tem uma conta? </span>
                        <span class="underline">
                            <button @click="login"><span class="whitespace-nowrap"> Entrar!</span></button>
                        </span>
                    </p>
                </div>
            </div>

            <SignaturePart class="pb-2" />
        </div>
    </div>
</template>
<script setup>
    // Componentes
    import LogoPart from "@/components/partials/LogoPart.vue";
    import SignaturePart from "@/components/partials/SignaturePart.vue";
    import { useStore } from "vuex";
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    import { Separator } from "@/components/ui/separator";

    const store = useStore();

    const { handleSubmit, handleReset } = useForm({
        validationSchema: toTypedSchema(
            z.object({
                email: z.string().email({ message: "E-mail inválido" }),
                // password
                password: z
                    .string()
                    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
                    .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
                    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
                    .regex(/\d/, { message: "A senha deve conter pelo menos um número" }),
                //firstName
                firstName: z
                    .string()
                    .regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" })
                    .min(4, { message: "O nome deve ter no mínimo 4 caracteres" }),
                //lastName
                lastName: z
                    .string()
                    .regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" })
                    .min(4, { message: "O nome deve ter no mínimo 4 caracteres" }),
            })
        ),
    });

    const firstName = useField("firstName");
    const lastName = useField("lastName");
    const email = useField("email");
    const password = useField("password");

    const submit = handleSubmit(async (values) => {
        await store.dispatch("newUser", { values });
    });

    function login() {
        store.commit("SET_LOGIN_OVERLAY", true);
        store.commit("SET_REGISTER_OVERLAY", false);
    }
</script>
