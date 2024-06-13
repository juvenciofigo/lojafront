<template lang="">
    <div class="flex flex-row h-full">
        <div class="lg:hidden">
            <v-navigation-drawer
                v-model="drawer"
                temporary
                touchless>
                <v-divider></v-divider>
                <v-list
                    v-for="(item, index) in items"
                    :key="index">
                    <div class="pl-4">
                        <router-link
                            active-class=" pl-4"
                            class="h-[35px] flex flex-row items-center"
                            :to="{ name: item.link }">
                            <span>{{ item.name }}</span>
                        </router-link>
                    </div>
                </v-list>
                <hr />
                <v-divider></v-divider>
            </v-navigation-drawer>
        </div>

        <div class="w-64 flex-col hidden lg:flex">
            <LogoPart />

            <Separator class="mt-7" />
            <div class="flex flex-col px-3 mt-2">
                <p class="text-xs">Menu</p>
                <div class="flex flex-col px-3 gap-2 mt-2">
                    <router-link
                        exact-active-class="border-2"
                        :to="{ name: `dashboard` }"
                        class="flex flex-row items-center">
                        <LayoutDashboard class="w-4 h-4 mr-2" />
                        Dahsboard
                    </router-link>
                    <hr />
                    <div class="flex flex-col">
                        <div class="flex mb-4 flex-row items-center">
                            <FolderKanban class="w-4 h-4 mr-2" />
                            <span>Loja</span>
                        </div>

                        <div class="ml-2 flex flex-col gap-3">
                            <router-link
                                active-class=" pl-4"
                                v-for="(item, index) in items"
                                :key="index"
                                :to="{ name: item.link }">
                                <span>{{ item.name }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Separator
            orientation="vertical"
            class="mt-7 w-[2px] self-end" />

        <div class="flex-1 flex flex-col gap-[2px] bg-slate-100">
            <div class="h-[50px] bg-white flex-row flex justify-between items-center px-4">
                <div
                    @click.stop="drawer = !drawer"
                    class="">
                    <Menu class="h-7.5 w-7.5" />
                    <div></div>
                </div>
                <div class="flex flex-row items-end gap-1">
                    <p>{{ user.firstName.split(" ")[0] }}</p>
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/radix-vue.png"
                            alt="@radix-vue" />
                        <AvatarFallback>{{ user.firstName.split(" ")[0] }}</AvatarFallback>
                    </Avatar>
                    <button
                        @click="store.dispatch('logout', router)"
                        class="flex border p-1 rounded-md flex-row items-center gap-2 h-max w-max">
                        <LogOut class="w-4 h-4" />
                        <span class="text-[15px] font-normal">Sair</span>
                    </button>
                </div>
            </div>

            <div class="route h-[47px] pb-2 flex items-center px-5 bg-white">
                <template
                    v-for="(route, index) in breadcrumb"
                    :key="index">
                    <span class="text-blue-500 capitalize"> {{ route }} > </span>
                </template>
            </div>

            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    import LogoPart from "@/components/partials/LogoPart.vue";

    import { Menu } from "lucide-vue-next";
    import { LogOut } from "lucide-vue-next";
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { Separator } from "@/components/ui/separator";

    const store = useStore();
    const router = useRouter();
    const user = computed(() => JSON.parse(localStorage.getItem("userData")));
    const drawer = ref(false);

    const items = [
        { name: "Produtos", link: "produtos" },
        { name: "Pedidos", link: "allOrders" },
        { name: "Clientes", link: "allCustomers" },
        { name: "Carrinhos", link: "carts" },
        { name: "Compras", link: "sellers" },
    ];
    const breadcrumb = computed(() => {
        const paths = router.currentRoute.value.path.split("/").filter((path) => path !== "");
        return paths.slice(0, 2);
    });
</script>

<style lang=""></style>
