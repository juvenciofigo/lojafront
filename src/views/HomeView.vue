<template>
    <div class="flex flex-col h-full">
        <HeaderComp class="header" />
        <section class="flex-1">
            <router-view></router-view>
        </section>
        <SignaturePart class="footer" />
    </div>
</template>

<script setup>
    import HeaderComp from "@/resources/_components/HeaderComp.vue";
    import SignaturePart from "@/components/partials/FoooterComp.vue";
</script>
