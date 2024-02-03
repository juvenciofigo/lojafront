<template lang="">
    <div class="flex flex-row h-full">
        <div class="w-64 flex flex-col">
            <LogoPart />

            <Separator class="mt-7" />
            <div class="flex flex-col px-3 mt-2">
                <p class="text-xs">Menu</p>
                <div class="flex flex-col px-3 gap-2 mt-2">
                    <router-link to="/dashboard" class="flex flex-row items-center">
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
                            <router-link class="h-[35px] flex flex-row items-center" :to="{ name: 'produtos' }">
                                <Shirt class="w-4 h-4 mr-2" />
                                <span>Produtos</span>
                            </router-link>

                            <router-link class="h-[35px] flex flex-row items-center" :to="{ name: 'pedidos' }">
                                <ListOrdered class="w-4 h-4 mr-2" />
                                <span>Pedidos</span>
                            </router-link>

                            <router-link class="h-[35px] flex flex-row items-center" :to="{ name: 'clientes' }">
                                <PersonStanding class="w-4 h-4 mr-2" />
                                <span>Clientes</span>
                            </router-link>

                            <router-link class="h-[35px] flex flex-row items-center" :to="{ name: 'carinhos' }">
                                <ShoppingCart class="w-4 h-4 mr-2" />
                                <span>Carinhos</span>
                            </router-link>

                            <router-link class="h-[35px] flex flex-row items-center" :to="{ name: 'compras' }">
                                <ShoppingBasket class="w-4 h-4 mr-2" />
                                <span>Compras</span>
                            </router-link>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
        </div>

        <Separator orientation="vertical" class="mt-7 w-[2px] self-end" />

        <div class="flex-1 flex flex-col gap-1 bg-slate-100">
            <div class="h-[50px] bg-white"></div>
            <div class="h-[47px] flex items-center px-5 bg-white">( DASHBOARD )</div>

            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, onActivated, computed, ref } from "vue";
    import { useStore, mapState } from "vuex";
    import LogoPart from "@/components/parrtials/LogoPart.vue";
    import axios from "axios";

    const store = useStore();
    const open = ref(false);
    const isOpen = ref(false);

    const suaPropriedade = store.state.dashStore;
    console.log(suaPropriedade.loja[0]);


</script>
<style lang=""></style>
