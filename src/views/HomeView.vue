<template>
    <div class="overflow-auto flex flex-col h-full view">
        <HeaderComp class="header sticky top-0 z-10" />
        <section class="flex-1">
            <router-view></router-view>
        </section>
        <SignaturePart class="footer" />
        <el-backtop
            target=".view"
            :right="30"
            :bottom="50">
            <el-icon><Top /></el-icon>
        </el-backtop>
    </div>
</template>

<script setup>
    import HeaderComp from "@/resources/_components/HeaderComp.vue";
    import SignaturePart from "@/components/partials/FoooterComp.vue";
    import { Top } from "@element-plus/icons-vue";
</script>
