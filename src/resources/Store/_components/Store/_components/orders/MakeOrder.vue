<template>
    <div class="stepper mb-2">
        <div>
            <el-steps
                :active="active"
                align-center>
                <template
                    v-for="(step, index) in steps"
                    :key="index">
                    <el-step :title="step" />
                </template>
            </el-steps>

            <ShippingInfoStep
                v-if="active === 0"
                :addressSkeleton="addressRes"
                @address="handleDeliveryData" />
            <ConfirmationStep
                v-if="active === 1"
                @submit="handleConfirmationData" />
        </div>

        <div class="mt-2 flex flex-row justify-end">
            <el-button
                :disabled="active === 1"
                @click="next"
                >Próximo</el-button
            >

            <el-button
                :disabled="active === 0 || loading"
                @click="previous"
                >Anterior</el-button
            >

            <span :class="active !== 1 ? 'hidden' : ''">
                <el-button
                    :disabled="active !== 1"
                    :loading="loading"
                    @click="sendOrder()">
                    Finalizar Pedido
                </el-button>
            </span>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, onBeforeUnmount, onBeforeMount, toRaw } from "vue";

    const active = ref(0);

    function next() {
        if (active.value < 1) {
            active.value++;
        }
    }

    const previous = () => {
        if (active.value > 0) {
            active.value--;
        }
    };

    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";

    import ShippingInfoStep from "@/resources/Store/_components/Store/_components/orders/makeorderComp/ShippingInfoStep.vue";
    import ConfirmationStep from "@/resources/Store/_components/Store/_components/orders/makeorderComp/ConfirmationStep.vue";

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const steps = ["Informações de Envio", "Confirmação"];
    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));
    const addressRes = ref(false);

    // before Unmount
    onBeforeUnmount(() => {
        store.commit("CLEAR_CARTPRODUCTS");
        store.commit("CLEAR_ADDRESSES");
        store.commit("CLEAR_ADDRESS");
        store.commit("CLEAR_PROVIDE_ADDRESS");
    });
    const cart = ref(computed(() => toRaw(store.getters.cart)));

    // on Mount
    onBeforeMount(async () => {
        const from = route.query.productsFrom;
        if (from) {
            if (from === "cartProducts") {
                await store.dispatch("displayCartProducts", isAuthenticated.value);

                if (!cart.value.items || cart.value.items.length <= 0) {
                    router.push({ name: "home" });
                    window.location.href = "/";
                }
                if (isAuthenticated.value === true) {
                    userAddresses();
                }
                return;
            }

            if (from === "payNow") {
                await store.dispatch("buyNow", { product: { id: route.query.product, quantity: route.query.quantity } });

                if (isAuthenticated.value === true) {
                    userAddresses();
                }
                return;
            }
        }

        router.push({ name: "home" });
    });

    async function userAddresses() {
        await store.dispatch("addresses");
        addressRes.value = true;
    }

    // Finalizar o pedido
    let selectAddress = ref(null);
    const confirmationData = ref(null);

    const handleDeliveryData = (data) => {
        selectAddress.value = data;
    };
    const handleConfirmationData = (data) => {
        confirmationData.value = data;
    };
    const loading = ref(false);

    async function sendOrder() {
        loading.value = true;
        if (!selectAddress.value) {
            store.commit("updateSnackbar", {
                text: "Preencha o campo com as informações de envio",
                snackbarType: "warning",
            });
            loading.value = false;
            return;
        }

        if (!confirmationData.value) {
            window.location.reload();
            return;
        }

        const res = await store.dispatch("sendOrder", {
            selectAddress: toRaw(selectAddress.value),
            cart: cart.value.cartId,
        });

        if (!res || res === false) {
            loading.value = false;
        }
    }
</script>

<style scoped>
    .button {
        background-color: #2da848;
        color: #fff;
        font-size: 12px;
        padding: 10px 45px;
        border: 1px solid transparent;
        border-radius: 8px;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin-top: 10px;
        cursor: pointer;
    }
</style>
