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
            <KeepAlive>
                <ShippingInfoStep
                    v-if="active === 0"
                    :addressSkeleton="addressRes" />
            </KeepAlive>
            <ConfirmationStep v-if="active === 1" />
        </div>

        <div class="mt-2 mr-2 flex flex-row justify-end gap-3">
            <div>
                <el-button
                    size="small"
                    :disabled="active === 0 || loading || !addressRes"
                    @click="previous"
                    >Anterior</el-button
                >
                <el-button
                    size="small"
                    :disabled="active === 1 || !addressRes"
                    @click="next"
                    >Próximo</el-button
                >
            </div>

            <span :class="active !== 1 ? 'hidden' : ''">
                <el-button
                    size="small"
                    :disabled="active !== 1"
                    :loading="loading || loadingPriceUpdate || !addressRes"
                    @click="createOrder()">
                    Fazer Pagamento
                </el-button>
            </span>
        </div>
    </div>
    <CompleteProfile />
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

    import CompleteProfile from "@/resources/_components/CompleteProfile.vue";

    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const steps = ["Informações de Envio", "Confirmação"];
    const addressRes = ref(false);
    const loadingPriceUpdate = computed(() => store.getters.loadingPriceUpdate);
    const cart = computed(() => store.state.carts.cart);
    const isAuthenticated = computed(() => store.getters.isAuthenticated("authToken"));
    const selectedAddres = computed(() => store.state.addresses.selectAddress);

    // before Unmount
    onBeforeUnmount(() => {
        store.commit("carts/CLEAR_CARTPRODUCTS");
        store.commit("addresses/CLEAR_ADDRESSES");
        store.commit("addresses/CLEAR_ADDRESS");
    });

    // on Mount
    onBeforeMount(async () => {
        try {
            const routeQuery = route.query.productsFrom;

            if (!routeQuery) {
                handleRedirect();
                return;
            }

            if (routeQuery === "cartProducts") {
                await handleCartProducts();
                return;
            }

            if (routeQuery === "payNow") {
                await handlePayNow();
                return;
            }

            handleRedirect();
        } catch (error) {
            console.error("Error during component initialization:", error);
            handleRedirect();
        }
    });

    // Funções auxiliares
    const handleCartProducts = async () => {
        await store.dispatch("carts/displayCartProducts", isAuthenticated.value);

        if (!cart.value?.items?.length) {
            handleRedirect();
            return;
        }

        await handleUserAddresses();
    };

    const handlePayNow = async () => {
        const productData = {
            product: {
                id: route.query.product,
                quantity: route.query.quantity,
            },
        };

        await store.dispatch("orders/buyNow", productData);
        await handleUserAddresses();
    };

    const handleUserAddresses = async () => {
        if (isAuthenticated.value) {
            await store.dispatch("addresses/fetchAddresses");
            addressRes.value = true;
        }
    };

    const handleRedirect = () => {
        router.push({ name: "home" });
    };

    // Finalizar o pedido
    const loading = ref(false);

    async function createOrder() {
        loading.value = true;
        if (!selectedAddres.value) {
            ElNotification.error({
                title: "Erro",
                message: "Preencha o endereço de envio",
                position: "top-left",
            });
            active.value = 0;
            loading.value = false;
            return;
        }
        const res = await store.dispatch("orders/createOrder", {
            selectedAddres: toRaw(selectedAddres.value._id),
            cart: cart.value.cartId,
        });

        if (!res || res === false) {
            loading.value = false;
            return;
        } else {
            const user = JSON.parse(localStorage.getItem("userData"));
            store.commit("carts/CLEAR_CART_PRICE");
            store.commit("payments/SET_ID_ORDER", res.order._id);
            store.commit("payments/SET_AMOUT_PAYMENT", res.order.totalPrice);
            store.commit("payments/SET_PAYMENT_DIALOG");
            router.push({ name: "profile-orders", params: { user: `${user.id}` } });
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
