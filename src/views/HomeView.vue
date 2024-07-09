<template >
    <div class="flex flex-col h-full">
        <HeaderPart class="header"/>
        <router-view class="flex-1"></router-view>
        <SignaturePart class="footer"/>
    </div>
</template>

<script setup>
    import HeaderPart from "@/components/partials/HeaderPart.vue";
    import SignaturePart from "@/components/partials/SignaturePart.vue";
</script>
