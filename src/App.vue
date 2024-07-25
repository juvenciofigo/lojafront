<template>
    <v-app class="dark bg-white overflow-hidden">
        <!--  main -->
        <v-main class="overflow-hidden h-full">
            <router-view />
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
<style>
    .v-card-item,
    .v-card-actions {
        padding: 0 !important;
    }
</style>
