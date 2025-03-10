<template lang="">
    <div class="flex flex-col">
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
                                <span class="text-muted-foreground text-xs">Ver perfil</span>
                            </div>
                        </router-link>
                        <p
                            class="flex flex-row items-center h-3 text-red-400 cursor-pointer text-start"
                            @click="store.dispatch('logout', router)">
                            <span class="block text-xs font-normal">Sair</span>
                            <LogOut class="h-full" />
                        </p>
                    </div>
                </div>
                <hr class="my-1" />
                <p class="text-sm mb-1 text-muted-foreground">Categorias</p>

                <template v-if="categories && categories.length > 0">
                    <nav class="flex flex-col gap-1 text-xs">
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

        <nav class="desktop header-1 flex flex-row justify-between items-center p-2 bg-white">
            <div class="text-xs text-center hidden lg:block">
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
                        <el-dropdown-menu>
                            <el-dropdown-item :command="{ name: 'profile', params: { user: user.id } }"> Meu perfil </el-dropdown-item>

                            <el-dropdown-item class="login/logout">
                                <div
                                    @click="store.dispatch('logout', router)"
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
                        <lord-icon class="w-5 md:w-10"
                            src="https://cdn.lordicon.com/odavpkmb.json"
                            trigger="hover"
                            >
                            
                        </lord-icon>
                        <div class="">
                            <p class="font-medium text-[8px] md:text-[12px]">Carrinho de compras</p>
                            <p class="text-[6px] md:text-[10px]">{{ formatCurrency(priceTotal) }}</p>
                        </div>
                    </router-link>

                    <div
                        v-if="!isAuthenticated"
                        @click="login()"
                        class="cursor-pointer text-base text-end ml-2 text-[#2196F3]">
                        <!-- <LogIn class="w-4 h-4" /> -->
                        <span class="">Entrar</span>
                        <!-- <User /> -->
                    </div>
                </div>
            </div>
        </nav>

        <!-- end header-1 -->
        <Separator
            orientation="horizontal"
            class="bg-[#2196F3]"
            decorative />

        <!-- start header-2 -->
        <nav class="header-2 lg:h-[70px] h-[50px] flex flex-row gap-4 items-center bg-white">
            <div class="py-2 px-3 lg:block rounded-md hidden duration-700 hover:-translate-y-1">
                <LogoPart />
            </div>

            <div class="search flex-1 flex flex-row md:gap-[10%] justify-end">
                <div class="ml-3 w-full md:m-0 border-[#2196F3] flex flex-1 max-w-[700px] flex-row">
                    <el-input
                        v-model="textSearch"
                        style="max-width: 600px"
                        placeholder="Pesquise pelo nome do produto"
                        class="input-with-select">
                        <template #prepend>
                            <el-select
                                clearable
                                v-model="selectedCategory"
                                placeholder="Categoria"
                                style="width: 115px">
                                <el-option
                                    v-for="category in categories"
                                    :key="category._id"
                                    :value="category.categoryName"
                                    :label="category.categoryName" />
                            </el-select>
                        </template>
                        <template #append>
                            <el-button
                                v-on:click="search"
                                :icon="Search" />
                        </template>
                    </el-input>
                </div>
            </div>

            <div class="flex flex-col gap-2 lg:flex-row lg:gap-5">
                <router-link
                    v-for="link in Links"
                    :key="link"
                    :to="link"
                    class="text-[#333333] hover:scale-110 text-xs font-medium duration-700 hover:text-[#2196F3]">
                    {{ link }}
                </router-link>
            </div>
        </nav>
        <!-- end header-2 -->
    </div>
</template>

<script setup>
    import { onMounted, computed, ref, onBeforeUnmount } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    import { ArrowDown } from "@element-plus/icons-vue";
    import { Search } from "lucide-vue-next";
    import { Separator } from "@/components/ui/separator";
    import { Button } from "@/components/ui/button";
    import LogoPart from "./LogoPart.vue";

    const store = useStore();
    const router = useRouter();

    const loadingPriceUpdate = ref(computed(() => store.getters.loadingPriceUpdate));

    const drawer = ref(false);
    const categories = computed(() => store.state.categories);
    const priceTotal = computed(() => store.getters.cartPrice);
    const selectedCategory = ref(null);
    const textSearch = ref(null);
    const storeName = store.state.storeName;
    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));
    const user = computed(() => JSON.parse(localStorage.getItem("userData")));

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1279) {
            drawer.value = false;
        }
    });

    const navigate = (route) => {
        if (route) {
            router.push(route);
        }
    };

    function login() {
        store.commit("SET_LOGIN_OVERLAY", true);
    }

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

    function search() {
        if (textSearch.value == null) return;

        const query = {
            search: textSearch.value,
        };

        if (selectedCategory.value !== null) {
            query.category = selectedCategory.value;
        }
        router.push({
            name: "allProductsClient",
            query: query,
        });
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

    onBeforeUnmount(() => {
        store.commit("CLEAR_CATEGORIES");
    });

    function novoVisitante() {
        if (!localStorage.getItem("registoDeVisita")) {
            localStorage.setItem("registoDeVisita", "true");
            store.dispatch("novoVisitante");
        }
    }
    onMounted(async () => {
        novoVisitante();
        await store.dispatch("displayCartPrices", isAuthenticated.value);
        await store.dispatch("getAllCategory");
    });
</script>
<style scoped>
    .el-dropdown + .el-dropdown {
        margin-left: 15px;
    }
    .el-dropdown-link {
        cursor: pointer;
        display: flex;
        align-items: center;
    }
</style>
<style>
    .with-loader .circular {
        width: 20px !important;
    }
    .with-loader .el-loading-spinner {
        top: 0 !important;
    }
</style>
