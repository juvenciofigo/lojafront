<template lang="">
    <div class="flex flex-col md:flex-col w-full justify-center md:flex-nowrap gap-4">
        <el-row class="bg-white">
            <!--  -->
            <el-col :span="6">
                <el-statistic
                    title="Usuários"
                    :value="results.usersCount" />
            </el-col>
            <!--  -->
            <el-col :span="6">
                <el-statistic
                    title="Pedidos"
                    :value="results.ordersCount">
                </el-statistic>
            </el-col>
            <!--  -->
            <el-col :span="6">
                <el-statistic
                    title="Clientes"
                    :value="results.customersCount" />
            </el-col>
            <!--  -->
            <el-col :span="6">
                <el-statistic
                    title="Visitas"
                    :value="results.visitsCount">
                </el-statistic>
            </el-col>
            <!--  -->
        </el-row>

        <div class="flex-1 bg-white p-2 rounded-md">
            <ChartComp />
        </div>
    </div>
</template>
<script setup>
    import { ref, onBeforeMount } from "vue";
    import { useStore } from "vuex";
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
<style scoped>
    .el-col {
        text-align: center;
    }
</style>
