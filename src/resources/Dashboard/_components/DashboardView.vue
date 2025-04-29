<template lang="">
    <div class="flex flex-col h-full gap-2 lg:px-2 relative overflow-auto view">
        <HeaderTop class="sticky top-0 z-10">
            <!-- esquerda -->
            <template #left>
                <LogoPart class="mb-2" />
                <div class="md:hidden">
                    <el-dropdown
                        size="large"
                        type="primary"
                        :persistent="false"
                        trigger="click"
                        :hide-on-click="true"
                        role="navigation"
                        popper-class="el-menu-vertical-demo ">
                        <span class="el-dropdown-link flex flex-row items-center">
                            Menu
                            <el-icon class="el-icon--right">
                                <Grid />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item
                                    v-for="(item, index) in items"
                                    :key="index">
                                    <template #default>
                                        <router-link
                                            :to="{ name: item.link }"
                                            exact-active-class="text-blue-400">
                                            <el-icon><component :is="item.icon" /></el-icon>
                                            <span class="whitespace-nowrap">{{ item.name }} </span>
                                        </router-link>
                                    </template>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </template>

            <!-- direita -->
            <template #right>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item
                        v-for="(route, index) in breadcrumb"
                        :key="index"
                        :to="route.route">
                        <span class="text-text13">{{ route.name }}</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </template>
        </HeaderTop>

        <div class="flex flex-row flex-1">
            <div class="flex flex-col bg-foreground_2">
                <span class="hidden md:block">
                    <div
                        @click="isCollapse = !isCollapse"
                        class="duration-300 transition-all w-full bg-details h-10 flex justify-center items-center gap-2 cursor-pointer">
                        <span :class="['transition-all duration-150', isCollapse ? 'hidden' : 'rotate-0']">Contrair</span>
                        <el-icon :class="['transition-transform duration-300', isCollapse ? 'rotate-180' : 'rotate-0']">
                            <el-icon><Fold /></el-icon>
                        </el-icon>
                    </div>
                    <el-menu
                        :router="true"
                        class="el-menu-vertical-demo"
                        :collapse="isCollapse">
                        <el-menu-item
                            v-for="(item, index) in items"
                            :key="index"
                            :index="String(index)"
                            :route="{ name: item.link }">
                            <router-link
                                :to="{ name: item.link }"
                                exact-active-class="text-blue-400"
                                class="hover:text-blue-300 duration-500">
                                <el-icon><component :is="item.icon" /></el-icon>
                                <span :class="[isCollapse ? 'hidden' : '', 'whitespace-nowrap']">{{ item.name }}</span>
                            </router-link>
                        </el-menu-item>
                    </el-menu>
                </span>
            </div>
            <router-view class="overflow-auto ml-2"></router-view>
        </div>
        <el-backtop
            target=".view"
            :right="30"
            :bottom="50">
            <el-icon><Top /></el-icon>
        </el-backtop>
        <FoooterComp />
    </div>
</template>

<script setup>
    import { computed, ref } from "vue";
    import { useRoute } from "vue-router";
    import LogoPart from "@/components/partials/LogoPart.vue";
    import FoooterComp from "@/components/partials/FoooterComp.vue";
    import HeaderTop from "@/components/partials/HeaderTop.vue";
    import { ShoppingCart, User, Goods, ShoppingBag, TakeawayBox, Grid, Fold, Top, Plus } from "@element-plus/icons-vue";

    const route = useRoute();

    const items = [
        { name: "Dahsboard", link: "admin-home", icon: Grid },
        { name: "Produtos", link: "admin-products-list", icon: ShoppingBag },
        { name: "Novo Produto", link: "admin-product-create", icon: Plus },
        { name: "Pedidos", link: "admin-orders", icon: TakeawayBox },
        { name: "Clientes", link: "admin-customers", icon: User },
        { name: "Carrinhos", link: "admin-carts", icon: ShoppingCart },
        { name: "Compras", link: "admin-purchases", icon: Goods },
    ];

    const isCollapse = ref(false);
    const breadcrumb = computed(() => {
        const seen = new Set();

        return route.matched
            .map((r) => {
                let trocarPath = r.path;
                for (const [chave, value] of Object.entries(route.params)) {
                    trocarPath = trocarPath.replace(`:${chave}`, value);
                }

                const el = trocarPath.split("/").filter(Boolean);
                return {
                    name: el[el.length - 1]?.toUpperCase(),
                    route: trocarPath,
                };
            })
            .filter((item) => {
                if (seen.has(item.name)) return false;
                seen.add(item.name);
                return true;
            });
    });
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }

    .el-menu {
        background-color: var(--foreground_2);
        border-right: 1px solid transparent;
        margin: 0;
        --el-menu-hover-bg-color: var(--details);
        --el-menu-item-height: 35px;
    }
    .el-menu-item {
        color: var(--text_2);
    }

    .el-breadcrumb {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        font-size: 13px;
    }
</style>
