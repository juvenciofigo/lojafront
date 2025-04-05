<template lang="">
    <header>
        <HeaderTop>
            <template #left>
                <div class="lg:hidden flex flex-col h-max">
                    <LogoPart />
                </div>
            </template>

            <template #right>
                <router-link
                    v-loading="loadingPriceUpdate"
                    :to="{name:'cart-view'}"
                    class="flex flex-row items-center gap-1">
                    <lord-icon
                        class="w-6 md:w-10"
                        src="https://cdn.lordicon.com/odavpkmb.json"
                        trigger="hover">
                    </lord-icon>
                    <div class="">
                        <p class="font-medium text-[10px] md:text-[12px]">Carrinho de compras</p>
                        <p class="text-[8px] md:text-[10px]">{{ formatCurrency(priceTotal) }}</p>
                    </div>
                </router-link>
            </template>
        </HeaderTop>
        <Separator
            orientation="horizontal"
            class="bg-[#2196F3]"
            decorative />
        <HeaderBottom />
    </header>
</template>
<script setup>
    import { computed } from "vue";
    import { useStore } from "vuex";

    import { formatCurrency } from "@/util/functions";

    const store = useStore();
    const loadingPriceUpdate = computed(() => store.getters.loadingPriceUpdate);
    const priceTotal = computed(() => store.state.carts.cartPrice);

    import HeaderBottom from "@/components/partials/HeaderBottom.vue";
    import HeaderTop from "@/components/partials/HeaderTop.vue";
    import { Separator } from "@/components/ui/separator";
</script>
<style lang=""></style>