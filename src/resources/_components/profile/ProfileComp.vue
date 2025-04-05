<template lang="">
    <div class="menu/view flex flex-row flex-nowrap flex-1 gap-1 m-1 h-full">
        
        <div class="menu w-64 flex-col hidden lg:flex gap-1 rounded-md">
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
                            {{ item.name }}
                        </el-tag>
                    </router-link>
                </nav>
            </div>
        </div>

        <router-view class="flex-1 bg-white rounded-md"></router-view>
    </div>
</template>
<script setup>
    import { onBeforeMount, computed } from "vue";
    import { useRoute, useRouter } from "vue-router";

    const route = useRoute();
    const router = useRouter();
    const user = computed(() => JSON.parse(localStorage.getItem("userData")));

    const items = [
        { name: "Visão geral", link: "profile" },
        { name: "Pedidos", link: "profile-orders" },
        { name: "Pagamentos", link: "profile-payments" },
        { name: "Endereço de entrega", link: "profile-addresses" },
    ];

    
    onBeforeMount(() => {
        if (user.value.id !== route.params.user) {
            router.push({ name: `profile-overview`, params: { user: user.value.id } });
        }
    });
</script>
