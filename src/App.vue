<template>
    <div :class="[themeMode ? 'dark' : '', 'pt-1 overflow-hidden text-text13 bg-background_2 text-text_2']">
        <!--  main -->
        <div class="overflow-hidden main-vier">
            <router-view class="principal-viewr" />
        </div>
        <!-- Paymnet -->
        <PaymentDialog />
        <!-- Auth -->
        <el-dialog
            :close-on-press-escape="false"
            :lock-scroll="true"
            v-model="loginOverlay"
            width="100%"
            class="bg-transparent"
            :show-close="false"
            align-center>
            <LoginView
                @dialogLogClose="dialogLogClose"
                class="w-full" />
        </el-dialog>

        <LoadPage />
    </div>
</template>

<script setup>
    import { computed } from "vue";
    import { useStore } from "vuex";
    import LoadPage from "./components/partials/LoadPage.vue";
    import PaymentDialog from "@/resources/Store/_components/Store/_components/payment/PaymentDialog.vue";
    import LoginView from "./resources/_components/LoginView.vue";
    const store = useStore();

    const loginOverlay = computed(() => store.state.auth.loginOverlay);
    const themeMode = computed(() => store.state.themeMode);

    function dialogLogClose() {
        store.commit("auth/SET_LOGIN_OVERLAY", false);
    }
</script>
<style scoped>
    .v-card-item,
    .v-card-actions {
        padding: 0 !important;
    }
    .main-vier {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
    }
    .principal-viewr {
        overflow: hidden;
        width: 100%;
    }
    @media screen and (min-width: 1350px) {
        .principal-viewr {
            width: 1350px;
        }
    }
</style>
<style>
    .error-message {
        /* margin: 5px 0 0 0; */
        padding: 5px 0 10px 5px;
        width: 100%;
        height: 15px;
        font-size: small;
        line-height: 13px;
        color: red;
        display: flex;
        align-items: center;
    }

    .input-field {
        display: flex;
        flex-direction: column;
        gap: 5px;
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
    .v-input__control {
        background-color: white;
        border-radius: 4px;
    }
    .input-field input::placeholder {
        color: #aaa;
        font-weight: 500;
    }
    /* Estilizando a barra de rolagem */
    ::-webkit-scrollbar {
        /* Altura da barra de rolagem */
        height: 5px;
        width: 5px;
    }

    /* Cor do track (fundo da barra de rolagem) */
    ::-webkit-scrollbar-track {
        background: var(--details);
        border-radius: 10px;
    }

    /* Cor da thumb (a parte que se move da barra de rolagem) */
    ::-webkit-scrollbar-thumb {
        background: var(--details_2);
        border-radius: 10px;
        /* border: 2px solid #f1f1f1; */
    }
    /* Espaçamento entre thumb e track */

    /* Cor da thumb ao passar o mouse */
    ::-webkit-scrollbar-thumb:hover {
        background-color: #757676;
        /*  */
    }

    .item-list-category {
        padding: 6px 0;
        font-size: 13px;
        line-height: 15px;
        width: 100%;
    }

    .item-list-category:hover {
        color: #0062bd;
        outline: 1px solid #0062bd;
    }

    .custom-backtop {
        width: max-content;
        background-color: #409eff;
        color: white;
        text-align: center;
        font-weight: 300;
        padding: 2px;
        font-size: medium;
        border-radius: 5px;
    }
    .el-backtop {
        height: max-content !important;
        width: max-content !important;
        border-radius: 0% !important;
    }
</style>
