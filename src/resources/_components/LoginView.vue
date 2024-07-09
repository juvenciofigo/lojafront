<template>
    <div
        class="container hidden md:block"
        id="container">
        <div class="form-container sign-up">
            <RegisterView />
        </div>

        <div class="form-container sign-in">
            <form @click.prevent="submit">
                <LogoPart class="mb-4" />
                <h1 class="title">Entrar</h1>

                <!-- Email Input -->
                <div class="w-full">
                    <input
                        v-model="email.value.value"
                        autocomplete="email"
                        type="email"
                        placeholder="Email" />
                    <span class="error-message">{{ email.errorMessage.value }}</span>
                </div>

                <!-- Password Input -->
                <div class="w-full">
                    <input
                        v-model="password.value.value"
                        autocomplete="current-password"
                        type="password"
                        placeholder="Password" />
                    <span class="error-message">{{ password.errorMessage.value }}</span>
                </div>

                <a href="#">Esqueceu sua senha?</a>

                <div class="flex flex-row gap-3">
                    <v-btn
                        type="submit"
                        @click="(loadLoginBtn = true), (toogleButtonLoad = true)"
                        :loading="loadLoginBtn"
                        >Entrar</v-btn
                    >
                    <v-btn
                        style="background-color: rgb(204, 15, 15)"
                        @click="handleReset">
                        Limpar
                    </v-btn>
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
        </div>

        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1 class="title">Bem vindo de volta!</h1>
                    <p>Insira seus dados pessoais para usar todos os recursos do site!</p>
                    <v-btn
                        :loading="toogleButtonLoad"
                        id="login">
                        Entrar
                    </v-btn>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1 class="title">Olá!</h1>
                    <p>Registre-se com seus dados pessoais para usar todos os recursos do site!</p>
                    <v-btn
                        :loading="toogleButtonLoad"
                        id="register">
                        Registar-se
                    </v-btn>
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="container mobile md:hidden">
        <div class="login-class h-full z-">
            <form @click.prevent="submitLogin">
                <LogoPart class="mb-4" />
                <h1 class="title">Entrar</h1>

                <span class="font-poppins">use sue e-mail e senha</span>
                <div class="w-full">
                    <input
                        v-model="email.value.value"
                        autocomplete="email"
                        type="email"
                        placeholder="Email" />
                    <span class="error-message">{{ errors.email }}</span>
                </div>
                <div class="w-full">
                    <input
                        v-model="password.value.value"
                        autocomplete="current-password"
                        type="password"
                        placeholder="Password" />
                    <span class="error-message">{{ errors.password }}</span>
                </div>

                <a href="#">Esqueceu sua senha?</a>

                <div class="flex flex-row gap-3">
                    <v-btn
                        @click="loadLoginBtn = true"
                        :loading="loadLoginBtn"
                        >Entrar</v-btn
                    >
                    <button
                        style="background-color: rgb(204, 15, 15)"
                        @click="reset">
                        Limpar
                    </button>
                </div>
                <button id="register2">Registar-se</button>
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
        </div>
        <RegisterView class="resgiter-class h-full" />
    </div>  -->
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import LogoPart from "@/components/partials/LogoPart.vue";
    import RegisterView from "./RegisterView.vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    const store = useStore();
    const router = useRouter();

    const container = ref(null);
    const registerBtn = ref(null);
    const loginBtn = ref(null);
    const loadLoginBtn = ref(false);
    const toogleButtonLoad = ref(false);

    const onsubmit = async (values) => {
        await store.dispatch("login", { values, router });
        loadLoginBtn.value = false;
        toogleButtonLoad.value = false;
    };

    const handleError = () => {
        loadLoginBtn.value = false;
        toogleButtonLoad.value = false;
    };

    const { handleSubmit, handleReset } = useForm({
        validationSchema: toTypedSchema(
            z.object({
                email: z.string({ message: "Campo email obrigatório" }).email({ message: "E-mail inválido" }),
                // password
                password: z
                    .string({ message: "Campo password obrigatório" })
                    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
                    .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
                    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
                    .regex(/\d/, { message: "A senha deve conter pelo menos um número" }),
            })
        ),
    });

    const email = useField("email");
    const password = useField("password");
    const submit = handleSubmit(onsubmit, handleError);

    // OnMouted
    onMounted(() => {
        container.value = document.getElementById("container");
        registerBtn.value = document.getElementById("register");
        loginBtn.value = document.getElementById("login");
        addEventListeners();
    });

    // Css effect
    function addEventListeners() {
        registerBtn.value.addEventListener("click", () => {
            container.value.classList.add("active");
        });

        loginBtn.value.addEventListener("click", () => {
            container.value.classList.remove("active");
        });
    }
</script>

<style scoped>
    .title {
        font-size: large;
    }
    .container {
        background-color: #fff;
        border-radius: 30px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
        position: relative;
        overflow: hidden;
        width: 768px;
        max-width: 100%;
        min-height: 600px;
    }

    .container p {
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.3px;
        margin: 20px 0;
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

    .container form {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 40px;
        height: 100%;
    }

    .container input {
        background-color: #eee;
        border: none;
        padding: 10px 15px;
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
        line-height: 13px;
        color: red;
        display: flex;
        align-items: center;
    }
    .form-container {
        position: absolute;
        top: 0;
        height: 100%;
        transition: all 0.6s ease-in-out;
    }

    .sign-in {
        left: 0;
        width: 50%;
        z-index: 2;
    }

    .container.active .sign-in {
        transform: translateX(100%);
    }

    .sign-up {
        left: 0;
        width: 50%;
        opacity: 0;
        z-index: 1;
    }

    .container.active .sign-up {
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
        animation: move 0.6s;
    }

    @keyframes move {
        0%,
        49.99% {
            opacity: 0;
            z-index: 1;
        }
        50%,
        100% {
            opacity: 1;
            z-index: 5;
        }
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

    .toggle-container {
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        overflow: hidden;
        transition: all 0.6s ease-in-out;
        border-radius: 150px 0 0 100px;
        z-index: 1000;
    }

    .container.active .toggle-container {
        transform: translateX(-100%);
        border-radius: 0 150px 100px 0;
    }

    .toggle {
        background-color: #512da8;
        height: 100%;
        background: linear-gradient(to right, #5c6bc0, #512da8);
        color: #fff;
        position: relative;
        left: -100%;
        height: 100%;
        width: 200%;
        transform: translateX(0);
        transition: all 0.6s ease-in-out;
    }

    .container.active .toggle {
        transform: translateX(50%);
    }

    .toggle-panel {
        position: absolute;
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 30px;
        text-align: center;
        top: 0;
        transform: translateX(0);
        transition: all 0.6s ease-in-out;
    }

    .toggle-left {
        transform: translateX(-200%);
    }

    .container.active .toggle-left {
        transform: translateX(0);
    }

    .toggle-right {
        right: 0;
        transform: translateX(0);
    }

    .container.active .toggle-right {
        transform: translateX(200%);
    }
</style>
