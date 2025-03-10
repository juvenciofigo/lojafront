<template lang="">
    <div class="flex flex-row h-full gap-2 lg:p-2">
        <div class="navigation lg:hidden">
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
                    <div
                        class="login/logout cursor-pointer"
                        v-if="isAuthenticated === false"
                        @click="login()">
                        <div class="flex flex-row items-center gap-2 h-max">
                            <LogIn class="w-4 h-4" />
                            <span class="lg:inline text-[15px] font-normal">Entrar</span>
                        </div>
                    </div>

                    <div
                        class="login/logout"
                        v-else>
                        <div class="flex flex-row justify-between gap-2 h-max">
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
                                <span class="block text-sm font-normal">Sair</span>
                                <LogOut class="h-full" />
                            </p>
                        </div>
                    </div>
                </div>
                <hr />

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
            </el-drawer>
        </div>
        <!-- end navigation -->

        <div class="menu flex-col hidden lg:flex gap-1 rounded-md">
            <div class="bg-white py-4 rounded-md">
                <LogoPart class="" />
            </div>

            <div class="flex flex-col p-3 flex-1 bg-white rounded-md">
                <p class="text-sm text-muted-foreground">Menu</p>
                <div class="flex flex-col px-2 gap-2 mt-2">
                    <router-link
                        exact-active-class="bg-blue-400 pl-5"
                        class="pl-3 hover:bg-blue-300 duration-500"
                        v-for="(item, index) in items"
                        :key="index"
                        :to="{ name: item.link }">
                        <span class="whitespace-nowrap">{{ item.name }}</span>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- end menu -->

        <div class="view flex-1 flex flex-col gap-2">
            <div class="header h-[50px] rounded-md bg-white flex-row flex justify-between items-center px-4">
                <div class="flex flex-col lg:items-center lg:justify-center">
                    <Menu
                        class="h-7.5 w-7.5 lg:hidden"
                        @click.stop="drawer = !drawer" />

                    <div class="route flex items-center lg:px-5 lg:text-sm text-muted-foreground">
                        <template
                            v-for="(route, index) in breadcrumb"
                            :key="index">
                            <span class="capitalize"> {{ route }} > </span>
                        </template>
                    </div>
                </div>

                <div class="flex flex-row items-end gap-1">
                    <p>{{ user.firstName.split(" ").at(0) }}</p>
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/radix-vue.png"
                            alt="@radix-vue" />
                        <AvatarFallback>{{ user.firstName.split(" ").at(0) }}</AvatarFallback>
                    </Avatar>
                    <button
                        @click="store.dispatch('logout', router)"
                        class="flex border p-1 rounded-md flex-row items-center gap-2 h-max w-max">
                        <LogOut class="w-4 h-4" />
                        <span class="text-[15px] font-normal">Sair</span>
                    </button>
                </div>
            </div>
            <!-- end header -->
            <router-view class="lg:max-h-[calc(100vh-74px)] overflow-auto"></router-view>
        </div>
        <!-- end view -->
    </div>
</template>

<script setup>
    import { computed, ref } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    import LogoPart from "@/components/partials/LogoPart.vue";
    import { Menu, LogOut, LogIn } from "lucide-vue-next";
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

    const store = useStore();
    const router = useRouter();
    const user = computed(() => JSON.parse(localStorage.getItem("userData")));
    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));
    const drawer = ref(false);

    const items = [
        { name: "Dahsboard", link: "dashboard" },
        { name: "Produtos", link: "productsAdmin" },
        { name: "Pedidos", link: "allOrders" },
        { name: "Clientes", link: "allCustomers" },
        { name: "Carrinhos", link: "carts" },
        { name: "Compras", link: "sellers" },
    ];
    const breadcrumb = computed(() => {
        const paths = router.currentRoute.value.path.split("/").filter((path) => path !== "");
        return paths.slice(0, 2);
    });
    window.addEventListener("resize", () => {
        if (window.innerWidth > 1279) {
            drawer.value = false;
        }
    });
</script>
