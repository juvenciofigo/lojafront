<template lang="">
    <header>
        <HeaderTop>
            <template #left>
                <div class="lg:hidden flex flex-col h-max">
                    <LogoPart />
                </div>
            </template>
            <template #right>
                <div class="flex flex-row gap-3">
                    <div  class="flex flex-row items-center">
                        <Sunny class="h-8"/>
                        <el-switch
                            size="small"
                            @change="swithTheme()"
                            v-model="themeMode"
                            inline-prompt
                            :active-icon="Sunny"
                            :inactive-icon="Moon" />
                    </div>
                    <router-link
                        v-loading="loadingPriceUpdate"
                        :to="{ name: 'cart-view' }"
                        class="flex flex-row items-center gap-1">
                        <lord-icon
                            colors="primary:#3080e8,secondary:#ffff"
                            class="w-6 md:w-10"
                            src="https://cdn.lordicon.com/odavpkmb.json"
                            trigger="hover">
                        </lord-icon>
                        <div class="">
                            <p class="font-medium text-[10px] md:text-[12px]">Carrinho de compras</p>
                            <p class="text-[8px] md:text-[10px]">{{ formatCurrency(priceTotal) }}</p>
                        </div>
                    </router-link>
                </div>
            </template>
        </HeaderTop>

        <Separator
            orientation="horizontal"
            class="bg-details"
            decorative />
        <HeaderBottom />
        <Separator
            orientation="horizontal"
            class="bg-accent_2 h-1"
            decorative />
    </header>
</template>
<script setup>
    import { computed } from "vue";
    import { useStore } from "vuex";
    import { Sunny, Moon } from "@element-plus/icons-vue";
    import HeaderBottom from "@/components/partials/HeaderBottom.vue";
    import HeaderTop from "@/components/partials/HeaderTop.vue";
    import { Separator } from "@/components/ui/separator";

    import { formatCurrency } from "@/util/functions";

    const store = useStore();
    const loadingPriceUpdate = computed(() => store.getters.loadingPriceUpdate);
    const priceTotal = computed(() => store.state.carts.cartPrice);

    const themeMode = computed(() => store.state.themeMode);
    const swithTheme = () => {
        store.dispatch("swithTheme");
    };
</script>
<style lang=""></style>
