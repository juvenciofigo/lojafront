<template>
    <v-app class="dark bg-slate-50 overflow-hidden">
        <!--  main -->
        <v-main class="main-vier overflow-hidden">
            <router-view class="principal-viewr" />
        </v-main>

        <!-- Paymnet -->
        <PaymentDialog />

        <v-snackbar
            v-model="snackbar"
            :color="snackbarColor">
            {{ snackbarText }}
            <template v-slot:actions>
                <v-btn
                    variant="text"
                    @click="closeSnackbar">
                    Fechar
                </v-btn>
            </template>
        </v-snackbar>

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
    import { computed } from "vue";
    import { useStore } from "vuex";
    import LoadPage from "./components/partials/LoadPage.vue";
    import PaymentDialog from "@/resources/Store/_components/Store/_components/payment/PaymentDialog.vue";
    import LoginView from "./resources/_components/LoginView.vue";
    const store = useStore();
    const snackbar = computed(() => store.getters.snackbar);
    const snackbarText = computed(() => store.getters.snackbarText);
    const snackbarColor = computed(() => store.getters.snackbarColor);
    const loginOverlay = computed(() => store.getters.loginOverlay);

    function dialogLogClose() {
        store.commit("SET_LOGIN_OVERLAY", false);
    }
    const closeSnackbar = () => {
        store.commit("updateSnackbar", { show: false, text: "" });
    };
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
