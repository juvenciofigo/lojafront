<template>
    <div>
        <el-result  icon="error" sub-title="Página não encontrada">
            <template #title>
                <div class="text-9xl">404</div>
            </template>
            <template #extra>
                <router-link to="/">
                    <el-button link type="primary"> Página Inicial</el-button>
                </router-link>
            </template>
        </el-result>
    </div>
</template>

<script setup></script>
