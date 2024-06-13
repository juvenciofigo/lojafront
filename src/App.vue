<template>
    <v-app>
        <v-main>
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

            <v-dialog
                persistent
                v-model="registerOverlay"
                width="auto">
                <button
                    class="ms-auto"
                    @click="dialogLogClose">
                    <X color="red" />
                </button>
                <RegisterView />
            </v-dialog>
            <v-dialog
                persistent
                v-model="loginOverlay"
                width="auto">
                <button
                    class="ms-auto"
                    @click="dialogLogClose">
                    <X color="red" />
                </button>
                <LoginView />
            </v-dialog>
            <LoadPage />
            <PaymentDialog />
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup>
    import { computed, ref } from "vue";
    import { useStore } from "vuex";
    import LoadPage from "./components/partials/LoadPage.vue";
    import PaymentDialog from "@/resources/Store/_components/Store/_components/payment/PaymentDialog.vue";
    import RegisterView from "./resources/_components/RegisterView.vue";
    import LoginView from "./resources/_components/LoginView.vue";
    import { X } from "lucide-vue-next";

    const store = useStore();
    const snackbar = computed(() => store.getters.snackbar);
    const snackbarText = computed(() => store.getters.snackbarText);
    const snackbarColor = computed(() => store.getters.snackbarColor);
    const loginOverlay = ref(computed(() => store.getters.loginOverlay));
    const registerOverlay = ref(computed(() => store.getters.registerOverlay));

    function dialogLogClose() {
        store.commit("SET_LOGIN_OVERLAY", false);
        store.commit("SET_REGISTER_OVERLAY", false);
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
