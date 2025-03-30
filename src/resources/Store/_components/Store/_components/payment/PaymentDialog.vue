<script setup>
    import { ElMessageBox, ElLoading } from "element-plus";
    import { watch, computed } from "vue";
    import { useStore } from "vuex";
    import { formatCurrency } from "@/util/functions";
    import notification from "@/util/notifications";
    // import notification from "@/util/notifications";

    const store = useStore();
    const overlay = computed(() => store.state.payments.paymentDialog);

    const total = computed(() => store.state.payments.amoutPayment);

    function fechar() {
        store.commit("payments/SET_PAYMENT_DIALOG");
        store.commit("payments/SET_ID_ORDER", null);
        store.commit("payments/SET_AMOUT_PAYMENT", 0);
        notification({ title: "Aviso", type: "warning", message: "Pagamento não relalizado" });
    }

    async function confirmePayment(value) {
        const res = await store.dispatch("payments/mpesapay", { client_number: `258${value}` });
        if (res === false) {
            return true;
        }
    }

    watch(
        () => overlay.value,
        (open) => {
            if (open) {
                ElMessageBox.prompt(`Por favor, insira seu número de telefone `, `Pagamento por Mpesa de ${formatCurrency(total.value)}`, {
                    confirmButtonText: "Enviar",
                    cancelButtonText: "Cancelar",
                    inputPattern: /^8[45]\d{7}$/,
                    inputErrorMessage: "Número inválido. Deve começar com 84 ou 85 e ter 9 dígitos.",
                    inputPlaceholder: "84/85*****",
                    showCancelButton: true,
                })
                    .then(async ({ value }) => {
                        let loadingInstance;

                        try {
                            // Exibe o indicador de carregamento
                            loadingInstance = ElLoading.service({
                                lock: true,
                                text: "Processando pagamento...",
                                background: "rgba(0, 0, 0, 0.7)",
                            });

                            // Fazer o pagamento
                            await confirmePayment(value);
                        } catch (error) {
                            console.error("Erro no pagamento:", error);
                        } finally {
                            if (loadingInstance) loadingInstance.close();
                        }
                    })
                    .catch(() => {
                        store.commit("payments/SET_PAYMENT_DIALOG");
                        fechar();
                    });
            }
        }
    );
</script>
