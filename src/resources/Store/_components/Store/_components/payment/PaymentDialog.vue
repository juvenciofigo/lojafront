<script setup>
    import { ElMessageBox, ElMessage, ElLoading } from "element-plus";
    import { watch, ref, computed } from "vue";
    import { useStore } from "vuex";
    const store = useStore();
    const overlay = ref(computed(() => store.getters.payment));

    const total = computed(() => store.getters.amoutPayment);

    function fechar() {
        store.commit("SET_PAYMENT");
        store.commit("SET_ID_ORDER", null);
        store.commit("updateSnackbar", { text: "Pagamento não relalizado", snackbarType: "warning" });
        store.commit("SET_AMOUTPAYMENT", 0);
    }

    async function confirmePayment(value) {
        const res = await store.dispatch("mpesapay", { client_number: `258${value}` });
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
                            console.log("erro 1");
                            loadingInstance.close();
                        } finally {
                            console.log("finally");
                            loadingInstance.close();
                        }
                    })
                    .catch(() => {
                        ElMessage.warning("Operação cancelada pelo usuário.");
                        console.log("erro 2");
                        fechar();
                    });
            }
        }
    );

    const formatCurrency = (value) => {
        if (typeof value !== "number" || isNaN(value)) {
            return "MZN 0.00";
        }
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };
</script>
