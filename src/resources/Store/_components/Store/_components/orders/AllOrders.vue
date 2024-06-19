<template lang="">
    <AllOldersComp
        :storeaction="`getOldersCustomer`"
        :route="`selfOrders`">
        <template #doPay>
            <button class="bg-green-500 text-green-100 active:text-green-500 duration-500 active:bg-green-100 text-xs p-1 rounded-md w-max">Fazer Pagamento</button>
        </template>
    </AllOldersComp>
</template>
<script setup>
    import AllOldersComp from "@/resources/_components/AllOrdersComp.vue";
</script>
<style lang=""></style>
