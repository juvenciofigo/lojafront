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
                v-model="dialogLog"
                width="auto">
                <v-card>
                    <template v-slot:actions>
                        <LoginView />
                    </template>
                    <v-btn
                        class="ms-auto"
                        text="Ok"
                        @click="dialogLogClose">
                    </v-btn>
                </v-card>
            </v-dialog>

            <router-view />
        </v-main>
    </v-app>
</template>

<script setup>
    import { computed, ref } from "vue";
    import { useStore } from "vuex";
    import LoginView from "./resources/_components/LoginView.vue";

    const store = useStore();
    const snackbar = computed(() => store.state.snackbar);
    const snackbarText = computed(() => store.state.snackbarText);
    const snackbarColor = computed(() => store.state.snackbarColor);
    const dialogLog = ref(computed(() => store.state.dialogLog));

    function dialogLogClose() {
        store.commit("dialogLog");
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
