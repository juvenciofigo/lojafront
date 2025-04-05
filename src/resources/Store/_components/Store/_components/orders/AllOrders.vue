<template lang="">
    <AllOldersComp
        :storeaction="`getOldersCustomer`"
        :route="`profile-orders`"
        @deleteButton="handleDeleteButton"
        :pageloadLoading="pageloadLoading">
    </AllOldersComp>
</template>
<script setup>
    import AllOldersComp from "@/resources/_components/AllOrdersComp.vue";
    import { ref } from "vue";
    import { useStore } from "vuex";

    const pageloadLoading = ref(false);
    const store = useStore();

    async function handleDeleteButton(payload) {
        pageloadLoading.value = true;
        await store.dispatch("orders/deleteOrderClient", payload);
        pageloadLoading.value = false;
    }
</script>
