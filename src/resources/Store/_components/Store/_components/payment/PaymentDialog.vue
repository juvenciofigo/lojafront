<template>
    <v-overlay
        persistent
        :model-value="overlay"
        class="align-center justify-center">
        <button
            @click="fechar"
            class="bg-slate-300 rounded-full p-[1px]">
            <X class="text-red-500" />
        </button>
        <paymentMpesa />
    </v-overlay>
</template>
<script setup>
    import { computed, ref, onBeforeUnmount } from "vue";
    import { useStore } from "vuex";
    import paymentMpesa from "./paymentMpesa.vue";
    import { X } from "lucide-vue-next";

    const store = useStore();
    const overlay = ref(computed(() => store.getters.payment));

    function fechar() {
        store.commit("SET_PAYMENT");
        store.commit("SET_ID_ORDER", null);
        store.commit("updateSnackbar", { text: "Pagamento não relalizado", snackbarType: "warning" });
        store.commit("SET_AMOUTPAYMENT", 0);
    }

    onBeforeUnmount(() => {
        store.commit("SET_ID_ORDER", null);
        store.commit("SET_AMOUTPAYMENT", 0);
    });
</script>
