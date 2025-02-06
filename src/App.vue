<template>
    <v-app class="dark bg-slate-50 overflow-hidden">
        <!--  main -->
        <v-main class="main-vier overflow-hidden">
            <router-view class="principal-viewr" />
        </v-main>

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
    </v-app>
</template>

<script setup>
    import { computed, watch } from "vue";
    import { useStore } from "vuex";
    import { ElMessage } from "element-plus";
    import LoadPage from "./components/partials/LoadPage.vue";
    import PaymentDialog from "@/resources/Store/_components/Store/_components/payment/PaymentDialog.vue";
    import LoginView from "./resources/_components/LoginView.vue";
    const store = useStore();

    const loginOverlay = computed(() => store.getters.loginOverlay);
    
    const snackbarText = computed(() => store.getters.snackbarText);
    const snackbarType = computed(() => store.getters.snackbarType);

    watch(
        () => snackbarText.value,
        (text) => {
            if (text != "") {
                ElMessage({
                    message: snackbarText,
                    type: snackbarType.value,
                });
            }
        }
    );

    function dialogLogClose() {
        store.commit("SET_LOGIN_OVERLAY", false);
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
    }
    .principal-viewr {
        width: 100%;
    }
    @media screen and (min-width: 1500px) {
        .principal-viewr {
            width: 1500px;
        }
    }
</style>
<style>
    /* Estilizando a barra de rolagem */
    ::-webkit-scrollbar {
        height: 7px; /* Altura da barra de rolagem */
        width: 7px;
    }

    /* Cor do track (fundo da barra de rolagem) */
    ::-webkit-scrollbar-track {
        background: #6187b8;
        border-radius: 10px;
    }

    /* Cor da thumb (a parte que se move da barra de rolagem) */
    ::-webkit-scrollbar-thumb {
        background: #70a0df3d;

        border-radius: 10px;
        border: 2px solid #f1f1f1; /* Espaçamento entre thumb e track */
    }

    /* Cor da thumb ao passar o mouse */
    ::-webkit-scrollbar-thumb:hover {
        background-color: #1c5caf;
    }
</style>
