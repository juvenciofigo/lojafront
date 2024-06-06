<template lang="">
    <div>carinho</div>
</template>
<script setup>
    import { onBeforeMount } from "vue";
    import { useStore } from "vuex";

    const store = useStore();

    onBeforeMount(async () => {
        await store.dispatch("allCarts");
    });
</script>
