<template lang="">
    <!-- Header-1 -->
    <nav class="desHheader-1 flex flex-row justify-between items-center p-2 lg:p-1 bg-foreground_2">
        <!-- esquerda -->
        <div>
            <div class="text-center hidden lg:block">
                <span>Bem-vindo ao {{ storeName }}</span>
            </div>

            <slot name="left"> </slot>
        </div>

        <!-- direita -->
        <div class="flex flex-col md:flex-row items-end gap-1 justify-between md:items-center h-full text-text_2">
            <el-dropdown
                popper-class="bg-red-500"
                v-if="isAuthenticated"
                @command="navigate"
                size="small"
                class="">
                <div class="text-text_2">
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
                        <el-dropdown-item>
                            <div>
                                <span>Tema:</span>
                                <el-switch
                                    size="small"
                                    @change="swithTheme()"
                                    v-model="themeMode"
                                    style="margin-left: 24px"
                                    inline-prompt
                                    :active-icon="Sunny"
                                    :inactive-icon="Moon" />
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>

            <div class="">
                <slot name="right"></slot>
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
    import { ArrowDown, Sunny, Moon } from "@element-plus/icons-vue";
    import { LogOut } from "lucide-vue-next";

    const store = useStore();
    const router = useRouter();
    const isAuthenticated = computed(() => store.getters.isAuthenticated("authToken"));

    const storeName = store.state.storeName;
    const user = computed(() => JSON.parse(localStorage.getItem("userData")));
    const drawer = ref(false);
    const themeMode = computed(() => store.state.themeMode);
    const swithTheme = () => {
        store.dispatch("swithTheme");
    };

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
<style scoped>
    .mobile .el-drawer__header {
        margin: 0 !important;
        padding: 0 !important;
    }
</style>
