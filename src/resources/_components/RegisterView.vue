<template>
    <form @submit.prevent="submitSignUp">
        <LogoPart class="mb-4" />
        <h1 class="title">Criar uma conta</h1>

        <!-- First Name -->
        <div class="w-full">
            <input
                type="text"
                autocomplete="name"
                v-model="firstName.value.value"
                placeholder="Nome" />
            <span class="error-message">{{ firstName.errorMessage.value }}</span>
        </div>

        <!-- Last Name -->
        <div class="w-full">
            <input
                type="text"
                autocomplete="name"
                v-model="lastName.value.value"
                placeholder="Apelido" />
            <span class="error-message">{{ lastName.errorMessage.value }}</span>
        </div>

        <!-- Email -->
        <div class="w-full">
            <input
                v-model="email.value.value"
                autocomplete="email"
                type="email"
                placeholder="Email" />
            <span class="error-message">{{ email.errorMessage.value }}</span>
        </div>

        <!-- Password -->
        <div class="w-full">
            <input
                v-model="password.value.value"
                autocomplete="new-password"
                type="password"
                placeholder="Password" />
            <span class="error-message">{{ password.errorMessage.value }}</span>
        </div>

        <div class="flex flex-row gap-3">
            <v-btn
                type="submit"
                @click="(loadSignUpBtn = true), (toogleButtonLoad = true)"
                :loading="loadSignUpBtn"
                >Cadastrar</v-btn
            >
            <button
                style="background-color: rgb(204, 15, 15)"
                @click="handleReset">
                Limpar
            </button>
        </div>
        <div class="social-icons">
            <div
                href="#"
                class="icon">
                <i class="fa-brands fa-google-plus-g"></i>
            </div>
            <div
                href="#"
                class="icon">
                <i class="fa-brands fa-facebook-f"></i>
            </div>
            <div
                href="#"
                class="icon">
                <i class="fa-brands fa-github"></i>
            </div>
            <div
                href="#"
                class="icon">
                <i class="fa-brands fa-linkedin-in"></i>
            </div>
        </div>
    </form>
</template>

<script setup>
    import LogoPart from "@/components/partials/LogoPart.vue";
    import { useStore } from "vuex";
    import { ref } from "vue";
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    const store = useStore();

    const loadSignUpBtn = ref(false);
    const toogleButtonLoad = ref(false);

    const onsubmit = async (values) => {
        await store.dispatch("newUser", { values });
        loadSignUpBtn.value = false;
        toogleButtonLoad.value = false;
    };

    const handleError = () => {
        loadSignUpBtn.value = false;
        toogleButtonLoad.value = false;
    };

    const { handleSubmit, handleReset } = useForm({
        validationSchema: toTypedSchema(
            z.object({
                email: z.string({ message: "Campo Email obrigatório" }).email({ message: "E-mail inválido" }),
                // password
                password: z
                    .string({ message: "Campo Password obrigatório" })
                    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
                    .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
                    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
                    .regex(/\d/, { message: "A senha deve conter pelo menos um número" }),
                //firstName
                firstName: z.string({ message: "Campo Nome obrigatório" }).regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" }),
                //lastName
                lastName: z.string({ message: "Campo Apelido obrigatório" }).regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" }),
            })
        ),
    });

    const firstName = useField("firstName");
    const lastName = useField("lastName");
    const email = useField("email");
    const password = useField("password");

    const submitSignUp = handleSubmit(onsubmit, handleError);
</script>

<style scoped>
    .title {
        font-size: 30px;
        font-weight: 500;
    }

    .container p {
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.3px;
        margin: 20px 0;
    }
    .error-message {
        margin: 5px 0 0 0;
        padding: 0 0 0 10px;
        width: 100%;
        height: 15px;
        line-height: 13px;
        color: red;
        display: flex;
        align-items: center;
    }
    .container span {
        font-size: 12px;
    }

    .container a {
        color: #333;
        font-size: 13px;
        text-decoration: none;
        margin: 15px 0 10px;
    }

    .container button {
        background-color: #512da8;
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

    .container button.hidden {
        background-color: transparent;
        border-color: #fff;
    }

    input {
        background-color: #eee;
        border: none;
        margin: 8px 0;
        padding: 10px 15px;
        font-size: 13px;
        border-radius: 8px;
        width: 100%;
        outline: none;
    }

    .social-icons {
        margin: 20px 0;
    }

    .social-icons a {
        border: 1px solid #ccc;
        border-radius: 20%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin: 0 3px;
        width: 40px;
        height: 40px;
    }
</style>
