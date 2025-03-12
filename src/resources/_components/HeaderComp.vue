<template lang="">
    <header>
        <HeaderTop />
        <Separator
            orientation="horizontal"
            class="bg-[#2196F3]"
            decorative />
        <HeaderBottom />
    </header>
</template>
<script setup>
    import HeaderBottom from "@/components/partials/HeaderBottom.vue";
    import HeaderTop from "@/components/partials/HeaderTop.vue";
    import { Separator } from "@/components/ui/separator";
</script>
<style lang=""></style>
