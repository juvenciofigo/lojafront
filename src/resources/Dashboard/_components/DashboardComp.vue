<template lang="">
    <div class="flex flex-row gap-3">
        <div class="h-[80px] rounded-md p-4 flex flex-1 bg-white">
            <div class="flex-1">
                <p class="text-xs">USUÁRIOS</p>
                <p>Valor</p>
            </div>
            <div class="flex items-center">
                <Users class="w-[48px] h-[48px] text-slate-300" />
            </div>
        </div>
        <div class="h-[80px] rounded-md p-4 flex flex-1 bg-white">
            <div class="flex-1">
                <p class="text-xs">VALOR</p>
                <p>Valor</p>
            </div>
            <div class="flex items-center">
                <HandCoins class="w-[48px] h-[48px] text-slate-300" />
            </div>
        </div>
        <div class="h-[80px] rounded-md p-4 flex flex-1 bg-white">
            <div class="flex-1">
                <p class="text-xs">PEDIDOS</p>
                <p>Valor</p>
            </div>
            <div class="flex items-center">
                <TrendingUp class="w-[48px] h-[48px] text-slate-300" />
            </div>
        </div>
        <div class="h-[80px] rounded-md p-4 flex flex-1 bg-white">
            <div class="flex-1">
                <p class="text-xs">TICKETS</p>
                <p>Valor</p>
            </div>
            <div class="flex items-center">
                <Ticket class="w-[48px] h-[48px] text-slate-300" />
            </div>
        </div>
    </div>
</template>
<script>
    import { HandCoins } from "lucide-vue-next";
    import { TrendingUp } from "lucide-vue-next";
    import { Ticket } from "lucide-vue-next";
    import { Users } from "lucide-vue-next";

    export default {
        components: {
            Users,
            HandCoins,
            TrendingUp,
            Ticket,
        },
    };
</script>
<style lang=""></style>
