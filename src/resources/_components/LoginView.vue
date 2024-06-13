<template>
    <div class="flex flex-row h-100">
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
                                v-model="email.value.value"
                                autocomplete="email"
                                variant="outlined"
                                density="compact"
                                bg-color="white"
                                :error-messages="email.errorMessage.value"
                                label="E-mail">
                            </v-text-field>
                            <v-text-field
                                v-model="password.value.value"
                                autocomplete="current-password"
                                variant="outlined"
                                density="compact"
                                bg-color="white"
                                :counter="8"
                                type="password"
                                :error-messages="password.errorMessage.value"
                                label="Senha">
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
                        <span>Ainda não se tem uma conta? </span>
                        <span class="underline">
                            <button @click="register"><span class="whitespace-nowrap"> Criar conta!</span></button>
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
    import { Separator } from "@/components/ui/separator";
    import SignaturePart from "@/components/partials/SignaturePart.vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    const store = useStore();
    const router = useRouter();

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
            })
        ),
    });

    const email = useField("email");
    const password = useField("password");
    function register() {
        store.commit("SET_LOGIN_OVERLAY", false);
        store.commit("SET_REGISTER_OVERLAY", true);
    }
    const submit = handleSubmit(async (values) => {
        await store.dispatch("login", { values, router });
    });
</script>
