<template>
    <HeaderPart />
    <HelloWorld />
</template>

<script>
    import { defineComponent } from "vue";

    // Components
    import HelloWorld from "../components/HelloWorld.vue";
    import HeaderPart from "@/components/parrtials/HeaderPart.vue";

    export default defineComponent({
        name: "HomeView",

        components: {
            HelloWorld,
            HeaderPart,
        },
    });
</script>
