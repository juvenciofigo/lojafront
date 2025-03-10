<template lang="">
    <div class="flex flex-col h-full bg-slate-100">
        <el-drawer
            :size="300"
            v-model="drawer"
            direction="ltr">
            <template #header>
                <div class="flex-col flex justify-center items-center">
                    <LogoPart />
                </div>
            </template>

            <div>
                <div class="login/logout flex flex-row justify-between items-center">
                    <router-link
                        v-if="user"
                        class="cursor-pointer"
                        :to="{ name: `profile`, params: { user: user.id } }">
                        <div class="flex flex-col justify-between text-sm whitespace-nowrap">
                            <span>{{ user.firstName.split(" ").at(0) }} {{ user.lastName.split(" ").at(-1) }} </span>

                            <span class="text-muted-foreground">Ver perfil</span>
                        </div>
                    </router-link>
                    <p
                        class="flex flex-row items-center h-3 text-red-400 cursor-pointer text-start"
                        @click="store.dispatch('logout', router)">
                        <span class="block font-normal">Sair</span>
                        <LogOut class="h-full" />
                    </p>
                </div>
            </div>
            <v-divider class="my-1"></v-divider>

            <nav class="flex flex-col gap-1 w-full">
                <router-link
                    exact-active-class=" pl-4 w-full"
                    v-for="(item, index) in items"
                    :key="index"
                    :to="{ name: item.link }">
                    <el-tag
                        class="cursor-pointer w-full"
                        size="small">
                        {{ item.name }}</el-tag
                    >
                </router-link>
            </nav>
        </el-drawer>

        <div class="header h-[50px] flex flex-row justify-between items-center p-1 lg:p-7 bg-white">
            <p class="text-center hidden lg:block">Bem-vindo ao {{ storeName }}.</p>
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
                    <!-- <span class=" md:">{{ formatCurrency(priceTotal) }} </span> -->
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
                                <div class="hidden group lg:flex flex-row justify-center items-end gap-1 cursor-pointer">
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
                                            class="lg:hidden"
                                            v-if="user">
                                            {{ user.lastName }}
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
                        <p v-if="userDetails">
                            <span>{{ userDetails.firstName }}</span> <span class="hidden md:inline">{{ userDetails.lastName }}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!--end header top -->

        <div class="menu/view flex flex-row flex-nowrap flex-1 gap-1 m-1">
            <div class="menu w-64 flex-col hidden lg:flex gap-1 rounded-md">
                <div class="bg-white py-2 rounded-md">
                    <LogoPart class="" />
                </div>

                <div class="flex flex-col p-1 flex-1 bg-white">
                    <p class="text-muted-foreground">Menu</p>

                    <nav class="flex flex-col gap-1 w-full">
                        <router-link
                            class="duration-300"
                            exact-active-class=" px-4 w-full"
                            v-for="(item, index) in items"
                            :key="index"
                            :to="{ name: item.link }">
                            <el-tag
                                class="cursor-pointer w-full"
                                size="small">
                                {{ item.name }}</el-tag
                            >
                        </router-link>
                    </nav>
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

    // const calculatePriceTotal = (cartPrices) => {
    //     return cartPrices.reduce((total, product) => total + product, 0);
    // };

    // const priceTotal = computed(() => {
    //     return calculatePriceTotal(store.getters.cartPrice);
    // });

    // Função para formatar valores monetários
    // const formatCurrency = (value) => {
    //     if (typeof value !== "number" || isNaN(value)) {
    //         return "MZN 0.00";
    //     }
    //     return value.toLocaleString("pt-MZ", {
    //         style: "currency",
    //         currency: "MZN",
    //     });
    // };
</script>
