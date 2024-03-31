<template>
  <v-app>
      <v-main>
          <v-snackbar v-model="snackbar" :color="snackbarColor">
              {{ snackbarText }}
              <template v-slot:actions>
                  <v-btn variant="text" @click="closeSnackbar"> Fechar </v-btn>
              </template>
          </v-snackbar>
          <router-view />
      </v-main>
  </v-app>
</template>

<script setup>
  import { computed } from "vue";
  import { useStore } from "vuex";

  const store = useStore();
  const snackbar = computed(() => store.state.snackbar);
  const snackbarText = computed(() => store.state.snackbarText);
  const snackbarColor = computed(() => store.state.snackbarColor);

  const closeSnackbar = () => {
      store.commit("updateSnackbar", { show: false, text: "" });
  };
</script>
