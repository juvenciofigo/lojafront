<template lang="">
    <div class="chart-container relative w-[99%] h-[300px] bg-white xl:h-[400px] max-w-[800px] mx-auto mt-5">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>
<script setup>
    import { ref, onMounted, computed, watchEffect } from "vue";
    import { useStore } from "vuex";
    import Chart from "chart.js/auto";
    const store = useStore();

    const Data = computed(() => store.state.dataStatistic);
    const UsersByMonth = ref([]);
    const OrdersByMonth = ref([]);
    const chartCanvas = ref(null);
    let chartInstance = null;

    function formatDataForChart(data) {
        const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
        const labels = data.map((item) => months[item._id - 1]);
        const values = data.map((item) => item.total);

        return { labels, values };
    }

    function initializeChart() {
        const data = {
            labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            datasets: [
                {
                    label: "Compras por mês",
                    data: [],
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
                {
                    label: "Usuário por mês",
                    data: [],
                    backgroundColor: "rgba(225, 0, 0, 0.2)",
                    borderColor: "rgba(225, 0, 0, 0.5)",
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };

        chartInstance = new Chart(chartCanvas.value, {
            type: "bar",
            data,
            options,
        });
    }

    async function updateChart() {
        if (chartInstance) {
            const { labels, values } = await formatDataForChart(OrdersByMonth.value);
            chartInstance.data.labels = labels;
            chartInstance.data.datasets[0].data = values;
            const data = await formatDataForChart(UsersByMonth.value);
            chartInstance.data.datasets[1].data = data.values;
            chartInstance.update();
        }
    }

    onMounted(async () => {
        initializeChart();
    });
    watchEffect(() => {
        UsersByMonth.value = Data.value.UsersByMonth;
        OrdersByMonth.value = Data.value.OrdersByMonth;
        updateChart();
    });
</script>
<style lang=""></style>
