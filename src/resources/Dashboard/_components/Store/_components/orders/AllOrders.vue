<template lang="">
    <AllOldersComp
        class="p-2"
        :storeaction="`getAllOrders`"
        :route="`allOrders`">
        
    </AllOldersComp>
</template>
<script setup>
    import AllOldersComp from "@/resources/_components/AllOrdersComp.vue";
</script>
