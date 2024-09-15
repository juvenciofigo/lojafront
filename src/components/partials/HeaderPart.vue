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

        <nav class="header-1 h-[40px] flex flex-row justify-between items-center p-1 lg:p-2 bg-white">
            <p class="text-xs text-center hidden lg:block">Bem-vindo ao {{ storeName }}</p>
            <div class="lg:hidden flex flex-row">
                <Button
                    @click.stop="drawer = !drawer"
                    variant="gost">
                    <Menu class="h-7.5 w-7.5" />
                </Button>
                <LogoPart />
            </div>

            <el-menu
                class="el-menu-demo-header"
                mode="horizontal"
                :ellipsis="false">
                <el-menu-item index="0"
                    ><router-link
                        to="/carrinho"
                        class="flex flex-row items-center gap-1">
                        <span class="text-xs md:text-base">{{ formatCurrency(priceTotal) }} </span>

                        <lord-icon
                            src="https://cdn.lordicon.com/odavpkmb.json"
                            trigger="hover"
                            style="width: 25px; height: 25px">
                        </lord-icon> </router-link
                ></el-menu-item>
                <el-sub-menu
                    index="1"
                    :show-timeout="100">
                    <template #title>
                        <div class="hidden group lg:flex flex-row items-center gap-1 cursor-pointer">
                            <p v-if="isAuthenticated">
                                <span>
                                    {{ user?.firstName?.split(" ")?.[0] || "" }}
                                    {{ user?.lastName?.split(" ")?.slice(-1)?.[0] || "" }}
                                </span>
                            </p>
                            <User v-else />
                        </div>
                    </template>
                    <el-menu-item
                        index="1-1"
                        class="orders"
                        v-if="isAuthenticated">
                        <router-link :to="{ name: 'profile', params: { user: user.id } }"> Meu perfil</router-link>
                    </el-menu-item>

                    <el-menu-item
                        index="1-3"
                        class="login/logout"
                        v-if="!isAuthenticated"
                        @click="login()">
                        <div class="flex flex-row items-center gap-2 h-max mx-[15px]">
                            <LogIn class="w-4 h-4" />
                            <span class="hidden lg:inline">Entrar</span>
                        </div></el-menu-item
                    >
                    <el-menu-item
                        index="1-4"
                        class="login/logout"
                        @click="store.dispatch('logout', router)"
                        v-else>
                        <div class="flex flex-row items-center gap-2 h-max mx-[15px]">
                            <p
                                class="lg:hidden"
                                v-if="user">
                                {{ user?.firstName?.split(" ")?.[0] || "" }}
                                {{ user?.lastName?.split(" ")?.slice(-1)?.[0] || "" }}
                            </p>
                            <span class="hidden lg:inline">Sair</span>
                            <LogOut class="w-4 h-4" />
                        </div>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
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
                <div class="border-2 ml-3 w-full md:m-0 border-[#2196F3] flex flex-1 max-w-[700px] flex-row rounded-[50px]">
                    <Input
                        class="flex-1 w-full rounded-l-[50px]"
                        autocomplete="off"
                        type="text"
                        placeholder="Pesquise pelo nome do produto" />

                    <div class="flex flex-row">
                        <SelectRoot
                            v-model="category"
                            class="bg-black">
                            <SelectTrigger
                                class="flex items-center justify-between w-32 px-[15px] text-[13px] gap-[5px]"
                                aria-label="Customise options">
                                <SelectValue
                                    class="whitespace-nowrap"
                                    placeholder="Por categoria" />
                                <ChevronDown />
                            </SelectTrigger>

                            <SelectPortal>
                                <SelectContent
                                    class="bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-[100]"
                                    :side-offset="5">
                                    <SelectScrollUpButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                                        <ChevronUp class="h-3.5 w-3.5" />
                                    </SelectScrollUpButton>

                                    <SelectViewport class="p-[5px]">
                                        <SelectGroup>
                                            <SelectItem
                                                v-for="category in categories"
                                                :key="category._id"
                                                class="text-[13px] leading-none flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none"
                                                :value="category._id">
                                                <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                                    <Check class="h-3.5 w-3.5" />
                                                </SelectItemIndicator>
                                                <SelectItemText>
                                                    {{ category.categoryName }}
                                                </SelectItemText>
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectViewport>

                                    <SelectScrollDownButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                                        <ChevronDown class="h-3.5 w-3.5" />
                                    </SelectScrollDownButton>
                                </SelectContent>
                            </SelectPortal>
                        </SelectRoot>

                        <Button
                            variant="ghost"
                            class="w-max bg-[#2196F3] rounded-r-[50px] flex gap-2 h-full px-[15px]">
                            <Search
                        /></Button>
                    </div>
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

    import { Search, Check, LogIn, LogOut, ChevronDown, ChevronUp, Menu, User } from "lucide-vue-next";
    import { Separator } from "@/components/ui/separator";
    import { Button } from "@/components/ui/button";

    import { Input } from "@/components/ui/input";

    const drawer = ref(false);

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1279) {
            drawer.value = false;
        }
    });

    import {
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectItemIndicator,
        SelectItemText,
        SelectPortal,
        SelectRoot,
        SelectScrollDownButton,
        SelectScrollUpButton,
        SelectTrigger,
        SelectValue,
        SelectViewport,
    } from "radix-vue";

    import LogoPart from "./LogoPart.vue";
    const store = useStore();
    const router = useRouter();

    const categories = computed(() => store.state.categories);
    const priceTotal = computed(() => store.getters.cartPrice);
    const category = ref();

    function login() {
        store.commit("SET_LOGIN_OVERLAY", true);
    }

    const storeName = store.state.storeName;
    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));

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

    const user = computed(() => JSON.parse(localStorage.getItem("userData")));

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
    .el-menu-demo-header {
        background-color: unset;
        border: unset;
        height: 100%;
    }
    .el-menu-demo-header .is-active {
        border: unset;
        color: unset !important;
    }
    .el-menu-demo-header .el-menu-item {
        height: unset;
        border: unset;
        padding: unset;
    }
</style>
