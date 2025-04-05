<template lang="">
    <div class="flex flex-col h-full gap-2 lg:p-2 relative">
        <HeaderTop class="">
            <!-- esquerda -->
            <template #left>
                <LogoPart class="mb-2" />

                <div class="md:hidden">
                    <el-button
                        size="small"
                        @click="isCollapse = !isCollapse">
                        <el-icon> Menu </el-icon>
                    </el-button>
                </div>
            </template>

            <!-- direita -->
            <template #right>
                <template
                    v-for="(route, index) in breadcrumb"
                    :key="index">
                    <span class="capitalize"> {{ route }} > </span>
                </template>

                <el-breadcrumb separator="/">
                    <el-breadcrumb-item
                        v-for="(route, index) in breadcrumb"
                        :key="index">
                        <a href="/dashboard">{{ route }}</a>
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </template>
        </HeaderTop>

        <div class="flex flex-row">
            <div class="flex flex-col">
                <span class="hidden md:block">
                    <el-button
                        @click="isCollapse = !isCollapse"
                        class="duration-300 w-full">
                        <el-icon :class="['transition-transform duration-300', isCollapse ? 'rotate-180' : 'rotate-0']">
                            <ArrowLeft />
                        </el-icon>
                    </el-button>
                    <el-menu
                        class="el-menu-vertical-demo"
                        :collapse="isCollapse">
                        <el-menu-item
                            v-for="(item, index) in items"
                            :key="index"
                            :index="String(index)">
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
            <div :class="[isCollapse ? 'hidden' : '', `absolute menu-mobile z-50`]">
                <el-menu
                    class="el-menu-vertical-demo md:hidden"
                    :ellipsis="false">
                    <el-menu-item
                        v-for="(item, index) in items"
                        :key="index"
                        :index="String(index)">
                        <router-link
                            :to="{ name: item.link }"
                            exact-active-class="text-blue-400">
                            <el-icon><component :is="item.icon" /></el-icon>
                            <span
                                @click="() => (isCollapse = false)"
                                :class="['whitespace-nowrap']"
                                >{{ item.name }}</span
                            >
                        </router-link>
                    </el-menu-item>
                </el-menu>
            </div>
            <router-view class=""></router-view>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref } from "vue";
    import { useRouter } from "vue-router";
    import LogoPart from "@/components/partials/LogoPart.vue";
    import { ShoppingCart, User, Goods, ShoppingBag, TakeawayBox, Grid, ArrowLeft } from "@element-plus/icons-vue";

    const items = [
        { name: "Dahsboard", link: "admin-home", icon: Grid },
        { name: "Produtos", link: "admin-products-list", icon: ShoppingBag },
        { name: "Pedidos", link: "admin-orders", icon: TakeawayBox },
        { name: "Clientes", link: "admin-customers", icon: User },
        { name: "Carrinhos", link: "admin-carts", icon: ShoppingCart },
        { name: "Compras", link: "admin-purchases", icon: Goods },
    ];

    const isCollapse = ref(false);
    const router = useRouter();
    const breadcrumb = computed(() => {
        const paths = router.currentRoute.value.path.split("/").filter((path) => path !== "");
        console.log("corente", router.currentRoute.value);

        return paths.slice(0, 3);
    });
</script>

<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }
</style>
