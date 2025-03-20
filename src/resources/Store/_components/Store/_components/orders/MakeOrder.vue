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

        <div class="mt-2 flex flex-row justify-end gap-3">
            <div>
                <el-button
                    :disabled="active === 1 || !addressRes"
                    @click="next"
                    >Próximo</el-button
                >
                <el-button
                    :disabled="active === 0 || loading || !addressRes"
                    @click="previous"
                    >Anterior</el-button
                >
            </div>

            <span :class="active !== 1 ? 'hidden' : ''">
                <el-button
                    :disabled="active !== 1"
                    :loading="loading || loadingPriceUpdate || !addressRes"
                    @click="createOrder()">
                    Fazer Pagamento
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
    import { ElNotification } from "element-plus";

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const steps = ["Informações de Envio", "Confirmação"];
    const addressRes = ref(false);
    const loadingPriceUpdate = computed(() => store.getters.loadingPriceUpdate);
    const cart = computed(() => store.state.carts.cart);
    const isAuthenticated = computed(() => store.getters.isAuthenticated("authToken"));

    // before Unmount
    onBeforeUnmount(() => {
        store.commit("carts/CLEAR_CARTPRODUCTS");
        store.commit("addresses/CLEAR_ADDRESSES");
        store.commit("addresses/CLEAR_ADDRESS");
        store.commit("addresses/CLEAR_PROVIDE_ADDRESS");
    });

    // on Mount
    onBeforeMount(async () => {
        const from = route.query.productsFrom;
        if (from) {
            if (from === "cartProducts") {
                await store.dispatch("carts/displayCartProducts", isAuthenticated.value);

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
                await store.dispatch("orders/buyNow", { product: { id: route.query.product, quantity: route.query.quantity } });

                if (isAuthenticated.value === true) {
                    userAddresses();
                }
                return;
            }
        }

        router.push({ name: "home" });
    });

    const userAddresses = async () => {
        await store.dispatch("addresses/fetchAddresses");
        addressRes.value = true;
    };

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

    async function createOrder() {
        loading.value = true;
        if (!selectAddress.value) {
            ElNotification.error({
                title: "Erro",
                message: "Preencha o endereço de envio",
            });
            active.value = 0;
            loading.value = false;
            return;
        }

        if (!confirmationData.value) {
            window.location.reload();
            return;
        }

        const res = await store.dispatch("orders/createOrder", {
            selectAddress: toRaw(selectAddress.value),
            cart: cart.value.cartId,
        });

        console.log(res);

        if (!res || res === false) {
            loading.value = false;
            return;
        } else {
            const user = JSON.parse(localStorage.getItem("userData"));
            store.commit("carts/CLEAR_CART_PRICE");
            store.commit("payments/SET_ID_ORDER", res.order._id);
            store.commit("payments/SET_AMOUT_PAYMENT", res.order.totalPrice);
            store.commit("payments/SET_PAYMENT_DIALOG");
            router.push({ name: "selfOrders", params: { user: `${user.id}` } });
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
