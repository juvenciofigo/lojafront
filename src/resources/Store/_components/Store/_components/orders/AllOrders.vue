<template lang="">
    <AllOldersComp
        :storeaction="`getOldersCustomer`"
        :route="`selfOrders`"
        @deleteButton="handleDeleteButton">
    </AllOldersComp>
</template>
<script setup>
    import AllOldersComp from "@/resources/_components/AllOrdersComp.vue";
    import { useStore } from "vuex";

    const store = useStore();

    async function handleDeleteButton(payload) {
        store.dispatch("deleteOrderClient", payload.id);
    }
</script>
