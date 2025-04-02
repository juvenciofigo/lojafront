<template lang="">
    <!-- Header-1 -->
    <nav class="desHheader-1 flex flex-row justify-between items-center px-1 py-0 lg:p-2 bg-white">
        <div class="text-center hidden lg:block">
            <span>Bem-vindo ao {{ storeName }}</span>
        </div>

        <div class="lg:hidden flex flex-col h-max">
            <LogoPart />
        </div>

        <div class="flex flex-col md:flex-row items-center gap-1">
            <el-dropdown
                v-if="isAuthenticated"
                @command="navigate"
                size="small"
                class="">
                <div class="">
                    <p>
                        <span>
                            {{ user?.firstName?.split(" ")?.[0] || "" }}
                            {{ user?.lastName?.split(" ")?.slice(-1)?.[0] || "" }}
                        </span>
                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </p>
                </div>

                <template
                    #dropdown
                    v-if="isAuthenticated">
                    <el-dropdown-menu class="">
                        <el-dropdown-item :command="{ name: 'profile', params: { user: user.id } }"> Meu perfil </el-dropdown-item>

                        <el-dropdown-item class="login/logout">
                            <div
                                @click="logout()"
                                class="login/logout flex flex-row items-center gap-2 h-max min-w-[150px]">
                                <p
                                    class="lg:hidden"
                                    v-if="user">
                                    {{ user?.firstName?.split(" ")?.[0] || "" }}
                                    {{ user?.lastName?.split(" ")?.slice(-1)?.[0] || "" }}
                                </p>
                                <span class="text-[10px] text-red-500">Sair</span>
                                <LogOut class="w-4 h-4" />
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

            <div>
                <router-link
                    v-loading="loadingPriceUpdate"
                    to="/carrinho"
                    class="flex flex-row items-center gap-1">
                    <lord-icon
                        class="w-6 md:w-10"
                        src="https://cdn.lordicon.com/odavpkmb.json"
                        trigger="hover">
                    </lord-icon>
                    <div class="">
                        <p class="font-medium text-[10px] md:text-[12px]">Carrinho de compras</p>
                        <p class="text-[8px] md:text-[10px]">{{ formatCurrency(priceTotal) }}</p>
                    </div>
                </router-link>

                <div
                    v-if="!isAuthenticated"
                    @click="login()"
                    class="cursor-pointer text-end ml-2 text-[#2196F3]">
                    <span class="">Entrar</span>
                </div>
            </div>
        </div>
    </nav>
    <!-- end Header-1 -->
</template>
<script setup>
    import { computed, ref, onBeforeMount } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import { ArrowDown } from "@element-plus/icons-vue";
    import { formatCurrency } from "@/util/functions";
    import { LogOut } from "lucide-vue-next";

    const store = useStore();
    const router = useRouter();
    const isAuthenticated = computed(() => store.getters.isAuthenticated("authToken"));

    const loadingPriceUpdate = computed(() => store.getters.loadingPriceUpdate);
    const priceTotal = computed(() => store.state.carts.cartPrice);
    const storeName = store.state.storeName;
    const user = computed(() => JSON.parse(localStorage.getItem("userData")));
    const drawer = ref(false);

    const navigate = (route) => {
        if (route) {
            router.push(route);
        }
    };
    function login() {
        if (!isAuthenticated.value) {
            store.commit("auth/SET_LOGIN_OVERLAY", true);
        }
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1279) {
            drawer.value = false;
        }
    });

    function logout() {
        if (isAuthenticated.value) {
            store.dispatch("auth/logout", router);
        }
    }

    function novoVisitante() {
        if (!localStorage.getItem("registoDeVisita")) {
            localStorage.setItem("registoDeVisita", "true");
            store.dispatch("auth/novoVisitante");
        }
    }
    onBeforeMount(async () => {
        await store.dispatch("carts/displayCartPrices", isAuthenticated.value);
        novoVisitante();
    });
</script>
<style>
    .mobile .el-drawer__header {
        margin: 0 !important;
        padding: 0 !important;
    }
</style>
