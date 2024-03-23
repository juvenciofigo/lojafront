<template lang="">
    <h1 class="text-2xl lg:text-5xl flex flex-row p-2 font-black text-center leading-[55px]">
        <router-link
            class=""
            to="/">
            <span>{{ storeName }}</span>
            <span class="text-xl lg:text-4xl">.</span>
        </router-link>
    </h1>
</template>
<script setup>
    import { useStore } from "vuex";
    const store = useStore();
    const storeName = store.state.storeName;
</script>
