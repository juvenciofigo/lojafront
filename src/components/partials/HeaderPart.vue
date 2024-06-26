<template lang="">
    <div class="flex flex-col">
        <v-navigation-drawer
            v-model="drawer"
            temporary
            touchless>
            <v-divider></v-divider>

            <v-list>
                <v-list-item
                    class="login/logout cursor-pointer"
                    v-if="isAuthenticated === false"
                    @click="login()">
                    <div class="flex flex-row items-center gap-2 h-max">
                        <LogIn class="w-4 h-4" />
                        <span class="xl:inline text-[15px] font-normal">Entrar</span>
                    </div>
                </v-list-item>

                <v-list-item
                    class="login/logout"
                    v-else>
                    <v-list class="flex flex-col gap-2 h-max">
                        <router-link
                            v-if="user"
                            class="cursor-pointer"
                            :to="{ name: `profile`, params: { user: user.id } }">
                            <div class="flex flex-row justify-between">
                                <span>{{ user.firstName.split(" ")[0] }} {{ user.lastName.split(" ")[0] }} </span>
                                <span class="text-muted-foreground text-xs">Ver perfil</span>
                            </div>
                        </router-link>
                        <p
                            class="flex flex-row items-center h-3 text-red-400 cursor-pointer"
                            @click="store.dispatch('logout', router)">
                            <span class="block text-[px] font-normal">Sair</span>
                            <LogOut class="h-full" />
                        </p>
                    </v-list>
                </v-list-item>

                <v-list-item
                    class="orders cursor-pointer"
                    v-if="isAuthenticated === true">
                    <router-link to="/">Meus pedidos</router-link>
                </v-list-item>
            </v-list>
            <hr />
            <v-list-item title="Categorias"></v-list-item>

            <v-divider></v-divider>

            <v-list density="compact">
                <v-list-item
                    @click="filterProduct()"
                    title="Todos Produtos">
                </v-list-item>
                <v-list-item
                    v-for="category in categories"
                    :key="category._id"
                    @click="filterProduct(category._id)"
                    :title="category.categoryName"
                    :value="category._id">
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <div class="header-1 h-[50px] flex flex-row justify-between items-center p-1 xl:p-7 bg-white">
            <p class="text-xs text-center hidden xl:block">Bem-vindo ao {{ storeName }}.</p>
            <div class="xl:hidden flex flex-row">
                <Button
                    @click.stop="drawer = !drawer"
                    variant="gost">
                    <Menu class="h-7.5 w-7.5" />
                </Button>
                <LogoPart />
            </div>

            <div class="items-center flex flex-row">
                <router-link
                    to="/carrinho"
                    class="hover:after:bg-red-500 flex flex-row items-center gap-2 h-max w-max mx-[15px]">
                    <span class="text-xs md:text-base">{{ formatCurrency(priceTotal) }} </span>
                    <Button
                        variant="Ghost"
                        class="flex gap-2 h-max">
                        <lord-icon
                            src="https://cdn.lordicon.com/odavpkmb.json"
                            trigger="hover"
                            style="width: 25px; height: 25px">
                        </lord-icon>
                    </Button>
                </router-link>

                <div class="flex">
                    <v-menu
                        open-on-focus
                        open-on-hover>
                        <template v-slot:activator="{ props }">
                            <button
                                color="indigo"
                                v-bind="props">
                                <div class="hidden group xl:flex flex-row justify-center items-end gap-1 cursor-pointer">
                                    <User />
                                    <p v-if="isAuthenticated === true">
                                        <span>{{ user.firstName.split(" ")[0] }} {{ user.lastName.split(" ")[0] }}</span>
                                    </p>
                                    <ChevronDown class="group-hover:rotate-180 duration-300" />
                                </div>
                            </button>
                        </template>

                        <v-card min-width="300">
                            <v-list>
                                <v-list-item
                                    class="orders vListItem cursor-pointer"
                                    :to="{ name: `profile`, params: { user: user.id } }"
                                    v-if="isAuthenticated === true">
                                    Meu perfil
                                </v-list-item>
                                <v-list-item
                                    class="orders vListItem cursor-pointer"
                                    v-if="isAuthenticated === true">
                                    <router-link to="/">Meus pedidos</router-link>
                                </v-list-item>

                                <v-list-item
                                    class="login/logout cursor-pointer vListItem"
                                    v-if="isAuthenticated === false"
                                    @click="login()">
                                    <div class="flex flex-row items-center gap-2 h-max mx-[15px]">
                                        <LogIn class="w-4 h-4" />
                                        <span class="hidden xl:inline text-[15px] font-normal">Entrar</span>
                                    </div>
                                </v-list-item>

                                <v-list-item
                                    class="login/logout vListItem cursor-pointer"
                                    @click="store.dispatch('logout', router)"
                                    v-else>
                                    <div class="flex flex-row items-center gap-2 h-max mx-[15px]">
                                        <p
                                            class="xl:hidden"
                                            v-if="user">
                                            {{ user.lastName.split(" ")[0] }}
                                        </p>
                                        <span class="hidden xl:inline text-[15px] font-normal">Sair</span>
                                        <LogOut class="w-4 h-4" />
                                    </div>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>
                </div>
            </div>
        </div>
        <!-- end header-1 -->
        <Separator
            orientation="horizontal"
            class="bg-yellow-300"
            decotarive />
        <!-- star header-2 -->
        <div class="header-2 xl:h-[100px] h-[50px] flex flex-row gap-4 items-center bg-white">
            <div class="py-2 px-3 xl:block rounded-md hidden">
                <LogoPart class="" />
            </div>

            <div class="search flex-1 flex flex-row md:gap-[10%] justify-end">
                <div class="border-2 ml-3 w-full md:m-0 border-yellow-300 flex flex-1 max-w-[700px] flex-row rounded-[50px]">
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
                            type="button"
                            class="w-max bg-yellow-300 rounded-r-[50px] flex gap-2 h-full px-[15px]">
                            <Search
                        /></Button>
                    </div>
                </div>
            </div>
        </div>
        <Separator
            orientation="horizontal"
            class="bg-yellow-300"
            decotarive />
        <!-- end header-2 -->
    </div>
</template>
<script setup>
    import { onMounted, computed, ref } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    import { Search, Check, LogIn, LogOut, ChevronDown, ChevronUp, Menu, User } from "lucide-vue-next";
    import { Separator } from "@/components/ui/separator";
    import { Button } from "@/components/ui/button";

    import { Input } from "@/components/ui/input";

    const drawer = ref(false);

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
        const query = {
            category: category,
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
    onMounted(async () => {
        await store.dispatch("displayCartPrices", isAuthenticated.value);
        await store.dispatch("getAllCategory");
    });
</script>
<style scoped>
    .vListItem:hover {
        background-color: rgb(253 224 71);
        transition-duration: 0.4s;
    }
</style>
