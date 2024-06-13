<template lang="">
    <div class="flex flex-col h-full">
        <v-navigation-drawer
            v-model="drawer"
            temporary
            touchless>
            <v-list>
                <v-list-item class="login/logout">
                    <v-list class="flex flex-col gap-2 h-max">
                        <p v-if="user">
                            <span class="whitespace-nowrap">{{ user.firstName.split(" ")[0] }} {{ user.lastName.split(" ")[0] }} </span>
                        </p>
                        <p
                            class="flex flex-row items-center h-3 text-red-400 cursor-pointer"
                            @click="store.dispatch('logout', router)">
                            <span class="block text-[px] font-normal">Sair</span>
                            <LogOut class="h-full" />
                        </p>
                    </v-list>
                    <Separator />

                    <div class="flex flex-col px-3 gap-2 mt-2">
                        <div class="ml-2 flex flex-col gap-3">
                            <router-link
                                exact-active-class=" pl-4"
                                v-for="(item, index) in items"
                                :key="index"
                                :to="{ name: item.link }">
                                <span>{{ item.name }}</span>
                            </router-link>
                        </div>
                    </div>
                </v-list-item>
            </v-list>
            <hr />

            <v-divider></v-divider>
        </v-navigation-drawer>

        <div class="header h-[50px] flex flex-row justify-between items-center border-b-[1px] p-1 lg:p-7">
            <p class="text-xs text-center hidden lg:block">Bem-vindo ao {{ storeName }}.</p>
            <div class="lg:hidden flex flex-row">
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
                    class="flex flex-row items-center gap-2 h-max w-max mx-[15px]">
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

                <Separator
                    orientation="vertical"
                    class="h-[25px]"
                    decotarive />

                <div class="profile menu items-center flex">
                    <v-menu
                        compact
                        open-on-focus
                        open-on-hover>
                        <template v-slot:activator="{ props }">
                            <button
                                color="indigo"
                                v-bind="props">
                                <div class="hidden lg:flex flex-row justify-center items-end gap-1 cursor-pointer">
                                    <User />
                                    <p v-if="isAuthenticated === true">
                                        <span class="whitespace-nowrap">{{ user.firstName.split(" ")[0] }} {{ user.lastName.split(" ")[0] }}</span>
                                    </p>
                                    <ChevronDown />
                                </div>
                            </button>
                        </template>

                        <v-card min-width="300">
                            <v-list>
                                <v-list-item
                                    class="login/logout vListItem cursor-pointer"
                                    @click="store.dispatch('logout', router)">
                                    <div class="flex flex-row items-center gap-2 h-max mx-[15px]">
                                        <p
                                            class="lg:hidden"
                                            v-if="user">
                                            {{ user.lastName.split(" ")[0] }}
                                        </p>
                                        <span class="hidden lg:inline text-[15px] font-normal">Sair</span>
                                        <LogOut class="w-4 h-4" />
                                    </div>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>

                    <div class="flex lg:hidden gap-1">
                        <User />
                        <p v-if="isAuthenticated === true">
                            <span>{{ user.firstName.split(" ")[0] }}</span> <span class="hidden md:inline">{{ user.lastName.split(" ")[0] }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- header top -->
        <div class="menu/view flex flex-row flex-nowrap flex-1">
            <div class="menu w-64 flex-col hidden lg:flex">
                <LogoPart />
                <Separator class="mt-7" />

                <div class="flex flex-col px-3 mt-2">
                    <p class="text-xs text-muted-foreground">Menu</p>
                    <div class="flex flex-col px-2 gap-2 mt-2">
                        <router-link
                            exact-active-class="bg-yellow-300 pl-5"
                            class="pl-3 hover:bg-yellow-300 duration-200"
                            v-for="(item, index) in items"
                            :key="index"
                            :to="{ name: item.link }">
                            <span class="whitespace-nowrap">{{ item.name }}</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <Separator
                orientation="vertical"
                class="mt-7 w-[2px] self-end" />

            <router-view class="w-full"></router-view>
        </div>
        <SignaturePart />
    </div>
</template>
<script setup>
    // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { LogOut, ChevronDown, Menu, User } from "lucide-vue-next";
    import SignaturePart from "@/components/partials/SignaturePart.vue";
    import { Separator } from "@/components/ui/separator";
    import LogoPart from "@/components/partials/LogoPart.vue";
    import { Button } from "@/components/ui/button";

    import { onBeforeMount, ref, computed } from "vue";
    import { useStore } from "vuex";
    import { useRoute, useRouter } from "vue-router";

    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const storeName = store.state.storeName;
    const drawer = ref(false);
    const isAuthenticated = computed(() => store.getters.isAuthenticated("authToken"));
    const user = computed(() => JSON.parse(localStorage.getItem("userData")));

    const items = [
        { name: "Visão geral", link: "profile" },
        { name: "Pedidos", link: "selfOrders" },
        { name: "Pagamentos", link: "selfPayments" },
        { name: "Endereço de entrega", link: "selfAddresses" },
    ];

    onBeforeMount(async () => {
        if (user.value.id !== route.params.user) {
            router.push({ name: `myProfile`, params: { user: user.value.id } });
        }
        await store.dispatch("getUser", route.params.user);
    });

    const calculatePriceTotal = (cartPrices) => {
        return cartPrices.reduce((total, product) => total + product, 0);
    };

    const priceTotal = computed(() => {
        return calculatePriceTotal(store.getters.cartPrice);
    });

    // Função para formatar valores monetários
    const formatCurrency = (value) => {
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };
</script>
<style lang=""></style>
