<template lang="">
    <div class="menu/view flex flex-row flex-nowrap flex-1 gap-1 m-1 h-full">
        <div class="flex flex-col">
            <span class="hidden md:block">
                <div
                    @click="isCollapse = !isCollapse"
                    class="duration-300 transition-all w-full bg-details h-10 flex justify-center items-center gap-2 cursor-pointer">
                    <span :class="['transition-all duration-1000', isCollapse ? 'hidden' : 'rotate-0']">Contrair</span>
                    <el-icon :class="['transition-transform duration-300', isCollapse ? 'rotate-180' : 'rotate-0']">
                        <ArrowLeft />
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

        <router-view class="flex-1"></router-view>
    </div>
</template>
<script setup>
    import { onBeforeMount, computed, ref } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { UserFilled, List, CreditCard, Location, ArrowLeft } from "@element-plus/icons-vue";

    const route = useRoute();
    const router = useRouter();
    const user = computed(() => JSON.parse(localStorage.getItem("userData")));
    const isCollapse = ref(false);
    const items = [
        { name: "Visão geral", link: "profile", icon: UserFilled },
        { name: "Pedidos", link: "profile-orders", icon: List },
        { name: "Pagamentos", link: "profile-payments", icon: CreditCard },
        { name: "Endereços de entrega", link: "profile-addresses", icon: Location },
    ];

    onBeforeMount(() => {
        if (user.value.id !== route.params.user) {
            router.push({ name: `profile-overview`, params: { user: user.value.id } });
        }
    });
</script>
<style>
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
</style>
