<template>
    <div class="text-center">
        <v-overlay
            persistent
            :model-value="overlay"
            class="align-center justify-center">
            <v-progress-circular
                color="primary"
                size="64"
                indeterminate></v-progress-circular>
        </v-overlay>
    </div>
</template>
<script setup>
    import { computed } from "vue";
    import { useStore } from "vuex";
    const store = useStore();

    const overlay = computed(() => store.getters.overlay);
</script>
