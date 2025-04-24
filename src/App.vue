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
        background-color: red;
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

    .el-backtop {
        background-color: var(--accent_2) !important;
        color: var(--text_2) !important;
        z-index: 20 !important;
    }

    .tabela {
        background: var(--foreground_2) !important;
        color: var(--text_2) !important;
    }
    .el-input {
        --el-input-text-color: var(--el-text-color-regular);
        --el-input-border-color: var(--details_2) !important;
    }
    .el-input__wrapper {
        background-color: var(--details) !important;
    }
    .el-input__inner {
        color: var(--text_2) !important;
    }
    .el-select__wrapper {
        background: var(--details) !important;
    }
    .el-select {
        --el-select-input-color: var(--details) !important;
    }

    .el-popper.is-light,
    .el-popper.is-light > .el-popper__arrow:before {
        background: #5cadd6 !important;
        border: none !important;
    }
    .el-select-dropdown__item.is-hovering {
        background-color: var(--details) !important;
    }
    .el-select-dropdown__item {
        color: var(--text_2) !important;
    }
    .el-select__wrapper {
        box-shadow: 0 0 0 1px var(--details_2) inset !important;
    }

    .el-dropdown-menu {
        background-color: #5cadd6 !important;
    }

    .el-dropdown-menu__item {
        color: black !important;
    }
    .el-button {
        height: 20px !important;
    }
    .el-upload--picture-card {
        background-color: var(--details_2) !important;
        height: unset !important;
        border: 0 !important;
    }
    .el-upload-dragger {
        border: 0 !important;
        background-color: transparent !important;
    }
    .el-upload-list__item {
        background-color: unset !important;
        border: unset !important;
        margin: 8px 8px !important;
    }
    .el-upload-list--picture-card {
        display: flex !important;
        align-content: center !important;
    }
</style>
