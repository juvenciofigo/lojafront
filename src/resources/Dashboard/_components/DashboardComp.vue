<template lang="">
    <div class="flex flex-col">
        <div class="flex flex-col md:flex-row w-full justify-center md:flex-nowrap gap-4">
            <div class="flex flex-col lg:ml-7 justify-around">
                <CardDashboard
                    class="Usuários"
                    :nameCard="`Usuários`"
                    :result="results.usersCount"
                    :percent="`10%`">
                    <template #icon>
                        <Users class="w-[40px] h-[40px] text-blue-400" />
                    </template>
                </CardDashboard>
                <!--end Users -->
                <CardDashboard
                    class="Ordes"
                    :nameCard="`Pedidos`"
                    :result="results.ordersCount"
                    :link="`allOrders`"
                    :percent="`10%`">
                    <template #icon>
                        <HandCoins class="w-[40px] h-[40px] text-blue-400" />
                    </template>
                </CardDashboard>
                <!--end Orders -->
                <CardDashboard
                    class="Customers"
                    :nameCard="`Clientes`"
                    :result="results.customersCount"
                    :link="`allCustomers`"
                    :percent="`10%`">
                    <template #icon>
                        <HandCoins class="w-[40px] h-[40px] text-blue-400" />
                    </template>
                </CardDashboard>
                <!--end Customers -->
                <CardDashboard
                    class="Customers"
                    :nameCard="`Visitas`"
                    :result="results.visitsCount"
                    :percent="`10%`">
                    <template #icon>
                        <HandCoins class="w-[40px] h-[40px] text-blue-400" />
                    </template>
                </CardDashboard>
                <!--end Visits -->
            </div>
            <div class="flex-1 bg-white p-2 rounded-md">
                <ChartComp />
            </div>
        </div>
        <!-- end Chart -->

        <!-- end Recent Orders -->
    </div>
</template>
<script setup>
    import { ref, onBeforeMount } from "vue";
    import { useStore } from "vuex";
    import { Users, HandCoins } from "lucide-vue-next";
    import CardDashboard from "@/resources/Dashboard/_components/Store/_components/_partials/CardDashboard.vue";
    import ChartComp from "@/resources/Dashboard/_components/Store/_components/_partials/ChartComp.vue";

    const store = useStore();
    const results = ref({});
    const recentOrders = ref([]);

    onBeforeMount(async () => {
        await store.dispatch("estatistic/DataByMonth");
        store.dispatch("estatistic/recentOrders").then((data) => {
            recentOrders.value = data;
        });
        store.dispatch("estatistic/estatistic").then((data) => {
            results.value = data;
        });
    });
</script>
