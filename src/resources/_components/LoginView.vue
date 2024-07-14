<template>
    <div class="container">
        <el-button
            class="left-0 top-0 z-10 absolute"
            @click="emit(`dialogLogClose`)"
            circle
            color="#409efc"
            :disabled="loadLoginBtn"
            :icon="Close">
        </el-button>

        <div class="forms-container">
            <div class="signin-signup">
                <!-- Sign In Form -->
                <form
                    @submit.prevent="submit()"
                    class="sign-in-form">
                    <LogoPart class="md:mb-7" />

                    <h2 class="title">Entrar</h2>

                    <!-- Email Input -->
                    <div class="input-field">
                        <el-input
                            v-model="email.value.value"
                            autocomplete="email"
                            type="email"
                            placeholder="Email" />
                        <span class="error-message">{{ email.errorMessage.value }}</span>
                    </div>

                    <!-- Password Input -->
                    <div class="input-field">
                        <el-input
                            clearable
                            v-model="password.value.value"
                            autocomplete="current-password"
                            type="password"
                            placeholder="Password"
                            show-password />
                        <span class="error-message">{{ password.errorMessage.value }}</span>
                    </div>

                    <div class="flex flex-row gap-3">
                        <el-button
                            @click.stop="
                                () => {
                                    submit();
                                    loadLoginBtn = true;
                                    toggleButtonLoad = true;
                                }
                            "
                            :loading="loadLoginBtn"
                            >Entrar</el-button
                        >
                        <el-button
                            class="clear_btn"
                            :loading="toggleButtonLoad"
                            @click.stop="handleReset"
                            >Limpar</el-button
                        >
                    </div>
                    <p class="mt-4">Esqueceu sua senha? Clique em <span class="text-decoration-underline">Aqui</span></p>
                </form>

                <!-- Sign Up Form -->
                <form
                    @submit.prevent="submitSignUp"
                    class="sign-up-form">
                    <LogoPart class="mb-4" />

                    <h2 class="title">Criar uma conta</h2>

                    <!-- First Name -->
                    <div class="w-full">
                        <el-input
                            type="text"
                            autocomplete="name"
                            v-model="firstNameSignUp.value.value"
                            placeholder="Nome" />
                        <span class="error-message">{{ firstNameSignUp.errorMessage.value }}</span>
                    </div>

                    <!-- Last Name -->
                    <div class="w-full">
                        <el-input
                            type="text"
                            autocomplete="name"
                            v-model="lastNameSignUp.value.value"
                            placeholder="Apelido" />
                        <span class="error-message">{{ lastNameSignUp.errorMessage.value }}</span>
                    </div>

                    <!-- Email -->
                    <div class="w-full">
                        <el-input
                            v-model="emailSignUp.value.value"
                            autocomplete="email"
                            type="email"
                            placeholder="Email" />
                        <span class="error-message">{{ emailSignUp.errorMessage.value }}</span>
                    </div>

                    <!-- Password -->
                    <div class="w-full">
                        <el-input
                            v-model="passwordSignUp.value.value"
                            autocomplete="new-password"
                            type="password"
                            placeholder="Password" />
                        <span class="error-message">{{ passwordSignUp.errorMessage.value }}</span>
                    </div>

                    <div class="flex flex-row gap-3">
                        <el-button
                            @click.stop="
                                () => {
                                    submitSignUp();
                                    loadSignUpBtn = true;
                                    toggleButtonLoad = true;
                                }
                            "
                            :loading="loadSignUpBtn"
                            >Cadastrar</el-button
                        >
                        <el-button
                            class="clear_btn"
                            :loading="toggleButtonLoad"
                            @click.stop="handleReset">
                            Limpar
                        </el-button>
                    </div>
                    <div class="social-icons">
                        <div class="icon"><i class="fa-brands fa-google-plus-g"></i></div>
                        <div class="icon"><i class="fa-brands fa-facebook-f"></i></div>
                        <div class="icon"><i class="fa-brands fa-github"></i></div>
                        <div class="icon"><i class="fa-brands fa-linkedin-in"></i></div>
                    </div>
                </form>
            </div>
        </div>

        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                    <h3>Novo aqui?</h3>
                    <p>Registre-se com seus dados pessoais para usar todos os recursos do site!</p>
                    <el-button
                        :loading="toggleButtonLoad"
                        variant="tonal"
                        id="sign-up-btn">
                        Registre-se
                    </el-button>
                </div>
                <img
                    src="img/log.svg"
                    class="image"
                    alt="" />
            </div>
            <div class="panel right-panel">
                <div class="content">
                    <h3>Um de nós?</h3>
                    <p>Insira seus dados pessoais para usar todos os recursos do site!</p>
                    <el-button
                        :loading="toggleButtonLoad"
                        variant="tonal"
                        id="sign-in-btn">
                        Entrar
                    </el-button>
                </div>
                <img
                    src="img/register.svg"
                    class="image"
                    alt="" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, defineEmits } from "vue";
    import LogoPart from "@/components/partials/LogoPart.vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import { useField, useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";
    import { Close } from "@element-plus/icons-vue";
    const store = useStore();
    const router = useRouter();

    const loadLoginBtn = ref(false);
    const toggleButtonLoad = ref(false);
    const loadSignUpBtn = ref(false);
    const emit = defineEmits(["dialogLogClose"]);

    const { handleSubmit: handleSignInSubmit, handleReset: handleSignInReset } = useForm({
        validationSchema: toTypedSchema(
            z.object({
                email: z.string({ message: "Campo obrigatório" }).email({ message: "E-mail inválido" }),
                password: z
                    .string({ message: "Campo obrigatório" })
                    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
                    .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
                    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
                    .regex(/\d/, { message: "A senha deve conter pelo menos um número" }),
            })
        ),
    });

    const email = useField("email");
    const password = useField("password");

    const submit = handleSignInSubmit(
        async (values) => {
            await store.dispatch("login", { values, router });
            loadLoginBtn.value = false;
            toggleButtonLoad.value = false;
        },
        () => {
            loadLoginBtn.value = false;
            toggleButtonLoad.value = false;
        }
    );

    const { handleSubmit: handleSignUpSubmit, handleReset: handleSignUpReset } = useForm({
        validationSchema: toTypedSchema(
            z.object({
                emailSignUp: z.string({ message: "Campo obrigatório" }).email({ message: "E-mail inválido" }).nonempty({ message: "Campo Email obrigatório" }),
                passwordSignUp: z
                    .string({ message: "Campo obrigatório" })
                    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
                    .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
                    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
                    .regex(/\d/, { message: "A senha deve conter pelo menos um número" })
                    .nonempty({ message: "Campo Password obrigatório" }),
                firstNameSignUp: z
                    .string({ message: "Campo obrigatório" })
                    .regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" })
                    .nonempty({ message: "Campo Nome obrigatório" }),
                lastNameSignUp: z
                    .string({ message: "Campo obrigatório" })
                    .regex(/^[\p{L}\s'-]+$/u, { message: "O nome deve conter apenas letras, espaços, apóstrofos e hífens" })
                    .nonempty({ message: "Campo Apelido obrigatório" }),
            })
        ),
    });

    const firstNameSignUp = useField("firstNameSignUp");
    const lastNameSignUp = useField("lastNameSignUp");
    const emailSignUp = useField("emailSignUp");
    const passwordSignUp = useField("passwordSignUp");

    const submitSignUp = handleSignUpSubmit(
        async (values) => {
            await store.dispatch("signup", { values, router });
            loadSignUpBtn.value = false;
            toggleButtonLoad.value = false;
        },
        () => {
            loadSignUpBtn.value = false;
            toggleButtonLoad.value = false;
        }
    );

    const handleReset = () => {
        handleSignInReset();
        handleSignUpReset();
    };

    onMounted(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");

        sign_up_btn?.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
        });

        sign_in_btn?.addEventListener("click", () => {
            container.classList.remove("sign-up-mode");
        });
    });
</script>
<!-- <style scoped>
    .container {
        position: relative;
        width: 100%;
        background-color: #fff;
        min-height: 100%;
        overflow: hidden;
    }

    .forms-container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .signin-signup {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 75%;
        width: 50%;
        transition: 1s 0.7s ease-in-out;
        display: grid;
        grid-template-columns: 1fr;
        z-index: 5;
        overflow: auto;
    }

    form {
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0rem 5rem;
        transition: all 0.2s 0.7s;
        overflow: hidden;
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }
    .clear_btn {
        background-color: rgb(255, 49, 49);
    }
    /* form {
        } */
    form.sign-up-form {
        opacity: 0;
        z-index: 1;
    }

    form.sign-in-form {
        z-index: 2;
    }

    .title {
        font-size: 2.2rem;
        color: #444;
        margin-bottom: 10px;
    }

    .input-field {
        max-width: 380px;
        width: 100%;
        margin: 10px 0;
    }
    .error-message {
        margin: 5px 0 0 0;
        padding: 0 0 0 10px;
        width: 100%;
        height: 15px;
        font-size: small;
        line-height: 13px;
        color: red;
        display: flex;
        align-items: center;
    }

    input {
        width: 100%;
        background-color: #eee;
        border: none;
        padding: 10px 15px;
        font-size: 13px;
        border-radius: 8px;
        width: 100%;
        outline: none;
    }

    .input-field input::placeholder {
        color: #aaa;
        font-weight: 500;
    }

    .social-text {
        padding: 0.7rem 0;
        font-size: 1rem;
    }

    .social-media {
        display: flex;
        justify-content: center;
    }

    .social-icon {
        height: 46px;
        width: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.45rem;
        color: #333;
        border-radius: 50%;
        border: 1px solid #333;
        text-decoration: none;
        font-size: 1.1rem;
        transition: 0.3s;
    }

    .social-icon:hover {
        color: #4481eb;
        border-color: #4481eb;
    }

    .panels-container {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .container:before {
        content: "";
        position: absolute;
        height: 2000px;
        width: 2000px;
        top: -8.5%;
        right: 48%;
        transform: translateY(-50%);
        background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
        transition: 1.8s ease-in-out;
        border-radius: 50%;
        z-index: 6;
    }

    .image {
        width: 100%;
        transition: transform 1.1s ease-in-out;
        transition-delay: 0.4s;
    }

    .panel {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-around;
        text-align: center;
        z-index: 6;
    }

    .left-panel {
        pointer-events: all;
        padding: 3rem 17% 2rem 12%;
    }

    .right-panel {
        pointer-events: none;
        padding: 3rem 12% 2rem 17%;
    }

    .panel .content {
        color: #fff;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.6s;
    }

    .panel h3 {
        font-weight: 600;
        line-height: 1;
        font-size: 1.5rem;
    }

    .panel p {
        font-size: 0.95rem;
        padding: 0.7rem 0;
    }

    .right-panel .image,
    .right-panel .content {
        transform: translateX(800px);
    }

    /* ANIMATION */

    .container.sign-up-mode:before {
        transform: translate(100%, -50%);
        right: 52%;
    }

    .container.sign-up-mode .left-panel .image,
    .container.sign-up-mode .left-panel .content {
        transform: translateX(-800px);
    }

    .container.sign-up-mode .signin-signup {
        left: 25%;
    }

    .container.sign-up-mode form.sign-up-form {
        opacity: 1;
        z-index: 2;
    }

    .container.sign-up-mode form.sign-in-form {
        opacity: 0;
        z-index: 1;
    }

    .container.sign-up-mode .right-panel .image,
    .container.sign-up-mode .right-panel .content {
        transform: translateX(0%);
    }

    .container.sign-up-mode .left-panel {
        pointer-events: none;
    }

    .container.sign-up-mode .right-panel {
        pointer-events: all;
    }

    @media (max-width: 870px) {
        .container {
            height: 100%;
        }
        .signin-signup {
            width: 100%;
            top: 90%;
            transform: translate(-50%, -100%);
            transition: 1s 0.8s ease-in-out;
            overflow: auto;
        }

        .signin-signup,
        .container.sign-up-mode .signin-signup {
            left: 50%;
        }

        .panels-container {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 2fr 1fr;
        }

        .panel {
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            padding: 2.5rem 8%;
            grid-column: 1 / 2;
        }

        .right-panel {
            grid-row: 3 / 4;
        }

        .left-panel {
            grid-row: 1 / 2;
        }

        .image {
            width: 200px;
            transition: transform 0.9s ease-in-out;
            transition-delay: 0.6s;
        }

        .panel .content {
            padding-right: 15%;
            transition: transform 0.9s ease-in-out;
            transition-delay: 0.8s;
        }

        .panel h3 {
            font-size: 1.2rem;
        }

        .panel p {
            font-size: 0.7rem;
            padding: 0.5rem 0;
        }

        .btn.transparent {
            width: 110px;
            height: 35px;
            font-size: 0.7rem;
        }

        .container:before {
            width: 1500px;
            height: 1500px;
            transform: translateX(-50%);
            left: 30%;
            bottom: 68%;
            right: initial;
            top: initial;
            transition: 2s ease-in-out;
        }

        .container.sign-up-mode:before {
            transform: translate(-50%, 100%);
            bottom: 32%;
            right: initial;
        }

        .container.sign-up-mode .left-panel .image,
        .container.sign-up-mode .left-panel .content {
            transform: translateY(-300px);
        }

        .container.sign-up-mode .right-panel .image,
        .container.sign-up-mode .right-panel .content {
            transform: translateY(0px);
        }

        .right-panel .image,
        .right-panel .content {
            transform: translateY(300px);
        }

        .container.sign-up-mode .signin-signup {
            top: 5%;
            transform: translate(-50%, 0);
        }
    }

    @media (max-width: 570px) {
        .image {
            display: none;
        }
        .forms-container {
            height: 100%;
        }
        .signin-signup {
            height: 100%;
            width: 100%;
            top: 100%;
        }

        .title {
            text-align: center;
            font-size: 1.5rem;
            color: #444;
            margin-bottom: 10px;
        }
        form {
            display: block;
        }

        .panel .content {
            padding: 0.5rem 1rem;
        }
        .container {
            padding: 1.5rem;
        }

        .container:before {
            bottom: 71%;
            left: 50%;
        }

        /* ////////// */
        .container.sign-up-mode:before {
            bottom: 28%;
            left: 50%;
        }
        .sign-in-form {
            display: flex;
            flex-direction: column;
            margin-top: 170px;
            overflow: auto;
        }
        .sign-in-form p {
            font-size: small;
        }

        form {
            padding: 0rem 2rem;
        }
    }

    @media (max-height: 568px) and (max-width: 320px) {
        form {
            margin: auto auto;
            height: fit-content;
            padding: 4px;
            bottom: 1%;
            position: absolute;
            width: 100%;
        }
        .panel {
            padding: 0;
        }
        .input-field {
            margin: 2px;
        }
        input {
            padding: 2px;
        }
        .v-btn.v-btn--density-default {
            height: fit-content;
            padding: 7px;
        }
    }
</style> -->

<!-- outro -->
<style scoped>
    .container {
        position: relative;
        width: 100%;
        background-color: #fff;
        min-height: 90vh;
        overflow: hidden;
    }

    .forms-container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .signin-signup {
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        left: 75%;
        width: 50%;
        transition: 1s 0.7s ease-in-out;
        display: grid;
        grid-template-columns: 1fr;
        z-index: 5;
    }

    form {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0rem 5rem;
        transition: all 0.2s 0.7s;
        overflow: hidden;
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }

    form.sign-up-form {
        opacity: 0;
        z-index: 1;
    }

    form.sign-in-form {
        z-index: 2;
    }

    .title {
        font-size: 2.2rem;
        color: #444;
        margin-bottom: 10px;
    }

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

    .social-text {
        padding: 0.7rem 0;
        font-size: 1rem;
    }

    .social-media {
        display: flex;
        justify-content: center;
    }

    .social-icon {
        height: 46px;
        width: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0.45rem;
        color: #333;
        border-radius: 50%;
        border: 1px solid #333;
        text-decoration: none;
        font-size: 1.1rem;
        transition: 0.3s;
    }

    .social-icon:hover {
        color: #4481eb;
        border-color: #4481eb;
    }

    .btn {
        width: 150px;
        background-color: #5995fd;
        border: none;
        outline: none;
        height: 49px;
        border-radius: 49px;
        color: #fff;
        text-transform: uppercase;
        font-weight: 600;
        margin: 10px 0;
        cursor: pointer;
        transition: 0.5s;
    }

    .btn:hover {
        background-color: #4d84e2;
    }
    .panels-container {
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .container:before {
        content: "";
        position: absolute;
        height: 2000px;
        width: 2000px;
        top: -10%;
        right: 48%;
        transform: translateY(-50%);
        background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
        transition: 1.8s ease-in-out;
        border-radius: 50%;
        z-index: 6;
    }

    .image {
        width: 100%;
        transition: transform 1.1s ease-in-out;
        transition-delay: 0.4s;
    }

    .panel {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-around;
        text-align: center;
        z-index: 6;
    }

    .left-panel {
        pointer-events: all;
        padding: 3rem 17% 2rem 12%;
    }

    .right-panel {
        pointer-events: none;
        padding: 3rem 12% 2rem 17%;
    }

    .panel .content {
        color: #fff;
        transition: transform 0.9s ease-in-out;
        transition-delay: 0.6s;
    }

    .panel h3 {
        font-weight: 600;
        line-height: 1;
        font-size: 1.5rem;
    }

    .panel p {
        font-size: 0.95rem;
        padding: 0.7rem 0;
    }

    .btn.transparent {
        margin: 0;
        background: none;
        border: 2px solid #fff;
        width: 130px;
        height: 41px;
        font-weight: 600;
        font-size: 0.8rem;
    }

    .right-panel .image,
    .right-panel .content {
        transform: translateX(800px);
    }

    /* ANIMATION */

    .container.sign-up-mode:before {
        transform: translate(100%, -50%);
        right: 52%;
    }

    .container.sign-up-mode .left-panel .image,
    .container.sign-up-mode .left-panel .content {
        transform: translateX(-800px);
    }

    .container.sign-up-mode .signin-signup {
        left: 25%;
    }

    .container.sign-up-mode form.sign-up-form {
        opacity: 1;
        z-index: 2;
    }

    .container.sign-up-mode form.sign-in-form {
        opacity: 0;
        z-index: 1;
    }

    .container.sign-up-mode .right-panel .image,
    .container.sign-up-mode .right-panel .content {
        transform: translateX(0%);
    }

    .container.sign-up-mode .left-panel {
        pointer-events: none;
    }

    .container.sign-up-mode .right-panel {
        pointer-events: all;
    }

    @media (max-width: 870px) {
        .container {
            min-height: 600px;
            height: 100vh;
        }
        .signin-signup {
            width: 100%;
            top: 95%;
            transform: translate(-50%, -100%);
            transition: 1s 0.8s ease-in-out;
        }

        .signin-signup,
        .container.sign-up-mode .signin-signup {
            left: 50%;
        }

        .panels-container {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 2fr 1fr;
        }

        .panel {
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            padding: 2.5rem 8%;
            grid-column: 1 / 2;
        }

        .right-panel {
            grid-row: 3 / 4;
        }

        .left-panel {
            grid-row: 1 / 2;
        }

        .image {
            width: 200px;
            transition: transform 0.9s ease-in-out;
            transition-delay: 0.6s;
        }

        .panel .content {
            padding-right: 15%;
            transition: transform 0.9s ease-in-out;
            transition-delay: 0.8s;
        }

        .panel h3 {
            font-size: 1.2rem;
        }

        .panel p {
            font-size: 0.7rem;
            padding: 0.5rem 0;
        }

        .btn.transparent {
            width: 110px;
            height: 35px;
            font-size: 0.7rem;
        }

        .container:before {
            width: 1500px;
            height: 1500px;
            transform: translateX(-50%);
            left: 30%;
            bottom: 68%;
            right: initial;
            top: initial;
            transition: 2s ease-in-out;
        }

        .container.sign-up-mode:before {
            transform: translate(-50%, 100%);
            bottom: 32%;
            right: initial;
        }

        .container.sign-up-mode .left-panel .image,
        .container.sign-up-mode .left-panel .content {
            transform: translateY(-300px);
        }

        .container.sign-up-mode .right-panel .image,
        .container.sign-up-mode .right-panel .content {
            transform: translateY(0px);
        }

        .right-panel .image,
        .right-panel .content {
            transform: translateY(300px);
        }

        .container.sign-up-mode .signin-signup {
            top: 5%;
            transform: translate(-50%, 0);
        }
    }

    @media (max-width: 570px) {
        form {
            padding: 0 1.5rem;
        }
        .title {
            font-size: 1.5rem;
            color: #444;
            margin-bottom: 5px;
        }

        .image {
            display: none;
        }
        .panel .content {
            padding: 0.5rem 1rem;
        }
        .container {
            padding: 1.5rem;
        }

        .container:before {
            bottom: 60%;
            left: 50%;
        }

        .container.sign-up-mode:before {
            bottom: 28%;
            left: 50%;
        }
    }
</style>
