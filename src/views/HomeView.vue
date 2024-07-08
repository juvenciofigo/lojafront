<template>
    <HeaderPart />
    <router-view></router-view>
    <SignaturePart />
</template>

<script setup>
    import HeaderPart from "@/components/partials/HeaderPart.vue";
    import SignaturePart from "@/components/partials/SignaturePart.vue";
</script>
