<template lang="">
    <!-- Header-1 -->
    <nav class="lg:hidden">
        <el-drawer
            :size="300"
            v-model="drawer"
            :close-on-click-modal="true"
            direction="ltr">
            <template #header>
                <div class="flex flex-col justify-center items-center">
                    <LogoPart />
                </div>
            </template>

            <div>
                <div
                    class="login/logout cursor-pointer"
                    v-if="!isAuthenticated"
                    @click="login()">
                    <div class="flex flex-row items-center gap-2 h-max">
                        <LogIn class="w-4 h-4" />
                        <span class="lg:inline font-normal">Entrar</span>
                    </div>
                </div>

                <div
                    class="login/logout flex flex-row justify-between items-center"
                    v-else>
                    <router-link
                        v-if="user"
                        class="cursor-pointer"
                        :to="{ name: 'profile', params: { user: user.id } }">
                        <div class="flex flex-col justify-between text-sm whitespace-nowrap">
                            <span>
                                {{ user?.firstName?.split(" ")?.[0] || "" }}
                                {{ user?.lastName?.split(" ")?.slice(-1)?.[0] || "" }}
                            </span>
                            <span class="text-muted-foreground">Ver perfil</span>
                        </div>
                    </router-link>
                    <p
                        class="flex flex-row items-center h-3 text-red-400 cursor-pointer text-start"
                        @click="logout()">
                        <span class="block font-normal">Sair</span>
                        <LogOut class="h-full" />
                    </p>
                </div>
            </div>
            <hr class="my-1" />
            <p class="text-sm mb-1 text-muted-foreground">Categorias</p>

            <template v-if="categories && categories.length > 0">
                <nav class="flex flex-col gap-1">
                    <el-tag
                        size="small"
                        class="cursor-pointer w-full">
                        <router-link :to="{ name: 'allProductsClient' }">Todos produtos</router-link>
                    </el-tag>
                    <el-tag
                        class="cursor-pointer w-full"
                        size="small"
                        v-for="category in categories"
                        :key="category._id"
                        @click="filterProduct(category)">
                        {{ category.categoryName }}
                    </el-tag>
                </nav>
            </template>
        </el-drawer>
    </nav>

    <nav class="desHheader-1 flex flex-row justify-between items-center p-2 bg-white">
        <div class="text-center hidden lg:block">
            <span>Bem-vindo ao {{ storeName }}</span>
        </div>

        <div class="lg:hidden flex flex-row">
            <Button
                @click.stop="drawer = !drawer"
                variant="gost">
                <Menu class="h-7.5 w-7.5" />
            </Button>
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
                                class="login/logout flex flex-row items-center gap-2 h-max">
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
    import { computed, ref, onMounted } from "vue";
    import { ArrowDown } from "@element-plus/icons-vue";
    import { Button } from "@/components/ui/button";

    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    const store = useStore();
    const router = useRouter();
    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));

    const loadingPriceUpdate = ref(computed(() => store.getters.loadingPriceUpdate));
    const priceTotal = computed(() => store.getters.cartPrice);
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
            store.commit("SET_LOGIN_OVERLAY", true);
        }
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1279) {
            drawer.value = false;
        }
    });

    function filterProduct(category) {
        drawer.value = false;

        const query = {
            _id: category._id,
            category: category.categoryName,
        };

        router.push({
            name: "allProductsClient",
            query: query,
        });
    }

    function logout() {
        if (isAuthenticated.value) {
            store.dispatch("logout", router);
        }
    }
    
    const formatCurrency = (value) => {
        if (typeof value !== "number" || isNaN(value)) {
            return "MZN 0.00";
        }
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };

    function novoVisitante() {
        if (!localStorage.getItem("registoDeVisita")) {
            localStorage.setItem("registoDeVisita", "true");
            store.dispatch("novoVisitante");
        }
    }

    onMounted(async () => {
        await store.dispatch("displayCartPrices", isAuthenticated.value);
        novoVisitante();
    });
</script>
<style lang=""></style>
