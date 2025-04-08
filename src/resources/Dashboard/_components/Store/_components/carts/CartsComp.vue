<template>
    <el-form :model="form">
        <div
            v-for="(item, index) in form.deliveryEstimate"
            :key="index"
            class="mb-2 flex items-center gap-2">
            <el-select
                size="small"
                v-model="item.estimatedTime"
                placeholder="Tempo de entrega"
                style="width: 150px">
                <el-option
                    label="Imediata"
                    value="Imediata" />
                <el-option
                    label="7 dias"
                    value="7 dias" />
                <el-option
                    label="30 dias"
                    value="30 dias" />
            </el-select>

            <el-input-number
                :controls="false"
                size="small"
                v-model="item.additionalCost"
                :min="0"
                :step="10"
                placeholder="Custo adicional"
                style="width: 100px" />

            <el-button
                size="small"
                type="danger"
                :icon="Delete"
                circle
                @click="removeEstimate(index)" />
        </div>

        <el-button
            size="small"
            type="primary"
            @click="addEstimate">
            <el-icon><Plus /></el-icon> Adicionar Estimativa
        </el-button>
    </el-form>
</template>

<script setup>
    import { ref } from "vue";
    import { Plus, Delete } from "@element-plus/icons-vue";

    const form = ref({
        deliveryEstimate: [],
    });

    const addEstimate = () => {
        form.value.deliveryEstimate.push({ estimatedTime: "", additionalCost: 0 });
    };

    const removeEstimate = (index) => {
        form.value.deliveryEstimate.splice(index, 1);
    };
</script>

<style scoped>
    /* Estilização opcional */
</style>
