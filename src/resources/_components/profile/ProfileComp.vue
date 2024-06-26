<template lang="">
    <div class="flex flex-col h-full bg-slate-100">
        <v-navigation-drawer
            v-model="drawer"
            temporary
            touchless>
            <v-list>
                <v-list-item class="login/logout">
                    <v-list class="flex flex-col gap-2 h-max">
                        <p v-if="userDetails">
                            <span class="whitespace-nowrap">{{ userDetails.firstName.split(" ")[0] }} {{ userDetails.lastName.split(" ")[0] }} </span>
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

        <div class="header h-[50px] flex flex-row justify-between items-center p-1 xl:p-7 bg-white">
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

                <div class="profile menu items-center flex">
                    <v-menu
                        compact
                        open-on-focus
                        open-on-hover>
                        <template v-slot:activator="{ props }">
                            <button
                                color="indigo"
                                v-bind="props">
                                <div class="hidden group xl:flex flex-row justify-center items-end gap-1 cursor-pointer">
                                    <User />
                                    <p v-if="isAuthenticated === true">
                                        <span class="whitespace-nowrap">{{ user.firstName }} {{ user.lastName }}</span>
                                    </p>
                                    <ChevronDown class="group-hover:rotate-180 duration-300" />
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
                                            class="xl:hidden"
                                            v-if="user">
                                            {{ user.lastName }}
                                        </p>
                                        <span class="hidden xl:inline text-[15px] font-normal">Sair</span>
                                        <LogOut class="w-4 h-4" />
                                    </div>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>

                    <div class="flex xl:hidden gap-1">
                        <User />
                        <p v-if="userDetails">
                            <span>{{ userDetails.firstName }}</span> <span class="hidden md:inline">{{ userDetails.lastName }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!--end header top -->

        <div class="menu/view flex flex-row flex-nowrap flex-1 gap-4 m-4">
            <div class="menu w-64 flex-col hidden xl:flex gap-2 rounded-md">
                <div class="bg-white py-2 rounded-md">
                    <LogoPart class="" />
                </div>

                <div class="flex flex-col px-3 mt-2 flex-1 bg-white">
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

            <router-view class="flex-1 bg-white rounded-md"></router-view>
        </div>
        <SignaturePart />
    </div>
</template>
<script setup>
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
    const userDetails = computed(() => store.getters.userDetails);

    const items = [
        { name: "Visão geral", link: "profile" },
        { name: "Pedidos", link: "selfOrders" },
        { name: "Pagamentos", link: "selfPayments" },
        { name: "Endereço de entrega", link: "selfAddresses" },
    ];

    onBeforeMount(() => {
        if (user.value.id !== route.params.user) {
            router.push({ name: `myProfile`, params: { user: user.value.id } });
        }
        store.dispatch("mySelfUserDetails", route.params.user);
    });

    const calculatePriceTotal = (cartPrices) => {
        return cartPrices.reduce((total, product) => total + product, 0);
    };

    const priceTotal = computed(() => {
        return calculatePriceTotal(store.getters.cartPrice);
    });

    // Função para formatar valores monetários
    const formatCurrency = (value) => {
        if (typeof value !== "number" || isNaN(value)) {
            return "MZN 0.00";
        }
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };
</script>
<style lang=""></style>
