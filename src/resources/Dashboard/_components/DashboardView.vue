<template lang="">
    <div class="flex flex-row h-full">
        <div class="w-64 flex-col hidden lg:flex">
            <LogoPart />

            <Separator class="mt-7" />
            <div class="flex flex-col px-3 mt-2">
                <p class="text-xs">Menu</p>
                <div class="flex flex-col px-3 gap-2 mt-2">
                    <router-link
                        exact-active-class="border-2"
                        :to="{ name: 'dashboard' }"
                        class="flex flex-row items-center">
                        <LayoutDashboard class="w-4 h-4 mr-2" />
                        Dahsboard
                    </router-link>
                    <Collapsible v-model:open="isOpen">
                        <CollapsibleTrigger class="w-full pr-4 justify-between items-center flex flex-row mt-2">
                            <div class="flex flex-row items-center">
                                <FolderKanban class="w-4 h-4 mr-2" />
                                <span>Loja</span>
                            </div>
                            <ChevronDown class="w-4 h-4 self-end" />
                        </CollapsibleTrigger>
                        <CollapsibleContent class="flex-1 flex flex-col gap-2 ml-9 mt-2">
                            <router-link
                                active-class=" pl-4"
                                class="h-[35px] flex flex-row items-center"
                                :to="{ name: 'produtos' }">
                                <Shirt class="w-4 h-4 mr-2" />
                                <span>Produtos</span>
                            </router-link>

                            <router-link
                                active-class=" pl-4"
                                class="h-[35px] flex flex-row items-center"
                                :to="{ name: 'allOrders' }">
                                <ListOrdered class="w-4 h-4 mr-2" />
                                <span>Pedidos</span>
                            </router-link>

                            <router-link
                                active-class=" pl-4"
                                class="h-[35px] flex flex-row items-center"
                                :to="{ name: 'allCustomers' }">
                                <PersonStanding class="w-4 h-4 mr-2" />
                                <span>Clientes</span>
                            </router-link>

                            <router-link
                                active-class=" pl-4"
                                class="h-[35px] flex flex-row items-center"
                                :to="{ name: 'carinhos' }">
                                <ShoppingCart class="w-4 h-4 mr-2" />
                                <span>Carinhos</span>
                            </router-link>

                            <router-link
                                active-class=" pl-4"
                                class="h-[35px] flex flex-row items-center"
                                :to="{ name: 'compras' }">
                                <ShoppingBasket class="w-4 h-4 mr-2" />
                                <span>Compras</span>
                            </router-link>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
        </div>

        <Separator
            orientation="vertical"
            class="mt-7 w-[2px] self-end" />

        <div class="flex-1 flex flex-col gap-[2px] bg-slate-100">
            <div class="h-[50px] bg-white flex-row flex justify-between items-center px-4">
                <div>
                    <Menu class="h-7.5 w-7.5" />
                    <div></div>
                </div>
                <div class="flex flex-row items-end gap-1">
                    <p>{{ user.name.split(" ")[0] }}</p>
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/radix-vue.png"
                            alt="@radix-vue" />
                        <AvatarFallback>{{ user.name.split(" ")[0] }}</AvatarFallback>
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
                    <span class="text-blue-500">
                        <router-link
                            :to="{ name: route }"
                            class="capitalize">
                            {{ route }}
                        </router-link>
                        >
                    </span>
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

    const store = useStore();
    const router = useRouter();
    const isOpen = ref(false);
    const user = computed(() => JSON.parse(localStorage.getItem("userData")));

    const breadcrumb = computed(() => {
        const paths = router.currentRoute.value.path.split("/").filter((path) => path !== "");
        return paths.slice(0, 2);
    });
</script>

<style lang=""></style>
