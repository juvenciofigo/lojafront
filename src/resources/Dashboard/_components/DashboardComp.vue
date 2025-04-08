<template lang="">
    <div class="flex w-full flex-col justify-center gap-4 md:flex-col md:flex-nowrap">
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

        <div class="flex-1 rounded-md bg-white p-2">
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
