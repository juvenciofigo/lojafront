<template lang="">
    <div class="lg:px-8">
        <div class="h-[50px] flex flex-row justify-between items-center border-b-[1px]">
            <div>
                <p class="text-xs text-center hidden lg:block">Bem-vindo ao {{ storeName }}.</p>
                <div class="lg:hidden flex flex-row">
                    <Button
                        @click.stop="drawer = !drawer"
                        variant="gost">
                        <Menu class="h-7.5 w-7.5" />
                    </Button>
                    <LogoPart />
                </div>
            </div>

            <v-navigation-drawer
                v-model="drawer"
                temporary
                touchless>
                <v-list-item title="Categorias"></v-list-item>

                <v-divider></v-divider>

                <v-list density="compact">
                    <v-list-item
                        @click="filterProduct()"
                        title="Todos Produtos">
                    </v-list-item>
                    <v-list-item
                        v-for="(category, index) in categories"
                        :key="category._id"
                        @click="filterProduct(category._id)"
                        :title="category.categoryName"
                        :value="category._id">
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <div class="items-center flex flex-row">
                <button
                    @click="cartProducts"
                    class="flex flex-row items-center gap-2 h-max w-max mx-[15px]">
                    <ShoppingBag class="w-4 h-4" />
                    <span class="hidden lg:inline text-[15px] font-normal">Loja</span>
                </button>

                <Separator
                    orientation="vertical"
                    class="h-[25px]"
                    decotarive />
                <router-link
                    to=""
                    class="flex flex-row items-center gap-2 h-max w-max mx-[15px]">
                    <Book class="w-4 h-4" />

                    <span class="hidden lg:inline text-[15px] font-normal">Sobre nós</span>
                </router-link>

                <div
                    v-if="user"
                    class="hidden lg:flex flex-row items-end gap-1">
                    <Avatar class="hidden lg:block">
                        <AvatarFallback>{{ user.name.split(" ")[0] }}</AvatarFallback>

                        <AvatarImage
                            src="https://github.com/radix-vue.png"
                            alt="@radix-vue" />
                    </Avatar>
                    <p>{{ user.name.split(" ")[0] }}</p>
                </div>

                <router-link
                    v-if="isAuthenticated === false"
                    to="/login"
                    class="flex flex-row items-center gap-2 h-max w-max mx-[15px]">
                    <LogIn class="w-4 h-4" />
                    <span class="hidden lg:inline text-[15px] font-normal">Entrar</span>
                </router-link>
                <button
                    v-else
                    @click="store.dispatch('logout', router)"
                    class="flex flex-row items-center gap-2 h-max w-max mx-[15px]">
                    <p
                        class="lg:hidden"
                        v-if="user">
                        {{ user.name.split(" ")[0] }}
                    </p>
                    <span class="hidden lg:inline text-[15px] font-normal">Sair</span>
                    <LogOut class="w-4 h-4" />
                </button>
            </div>
        </div>

        <div class="lg:h-[100px] h-[50px] flex flex-row gap-4 items-center">
            <div class="px-3 h-max lg:flex flex-row items-center hidden">
                <LogoPart />
            </div>

            <div class="search flex-1 lg:flex flex-row hidden">
                <div class="border-2 border-yellow-300 flex flex-1 flex-row mr-20 rounded-[50px]">
                    <Input
                        class="flex-1 rounded-l-[50px]"
                        autocomplete="off"
                        type="text"
                        placeholder="Pesquise pelo nome do produto" />

                    <div class="flex flex-row">
                        <SelectRoot class="bg-black">
                            <SelectTrigger
                                class="flex items-center justify-between w-32 px-[15px] text-[13px] gap-[5px]"
                                aria-label="Customise options">
                                <SelectValue
                                    class="whitespace-nowrap"
                                    placeholder="Por categoria" />
                                <ChevronDown />
                            </SelectTrigger>

                            <SelectPortal>
                                <SelectContent
                                    class="bg-white rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-[100]"
                                    :side-offset="5">
                                    <SelectScrollUpButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                                        <ChevronUp class="h-3.5 w-3.5" />
                                    </SelectScrollUpButton>

                                    <SelectViewport class="p-[5px]">
                                        <SelectGroup>
                                            <SelectItem
                                                v-for="(category, index) in categories"
                                                :key="category._id"
                                                class="text-[13px] leading-none flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none"
                                                :value="category._id">
                                                <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                                    <Check class="h-3.5 w-3.5" />
                                                </SelectItemIndicator>
                                                <SelectItemText>
                                                    {{ category.categoryName }}
                                                </SelectItemText>
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectViewport>

                                    <SelectScrollDownButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
                                        <ChevronDown class="h-3.5 w-3.5" />
                                    </SelectScrollDownButton>
                                </SelectContent>
                            </SelectPortal>
                        </SelectRoot>

                        <Button
                            variant="ghost"
                            type="button"
                            class="w-max bg-yellow-300 rounded-r-[50px] flex gap-2 h-full px-[15px]">
                            <Search
                        /></Button>
                    </div>
                </div>

                <div class="flex flex-row items-center">
                    <Button
                        variant="Ghost"
                        class="flex gap-2 h-max">
                        <Heart class="w-4 h-4"
                    /></Button>
                    <Button
                        variant="Ghost"
                        class="flex gap-2 h-max">
                        <UserRound class="w-4 h-4"
                    /></Button>
                    <Button
                        variant="Ghost"
                        class="flex gap-2 h-max"
                        @click="cartProducts">
                        <ShoppingBag class="w-4 h-4" />
                        <span>{{ formatCurrency(priceTotal) }} </span>
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { onMounted, computed, ref } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";

    import { Heart } from "lucide-vue-next";
    import { ShoppingBag } from "lucide-vue-next";
    import { ChevronsUpDown } from "lucide-vue-next";
    import { Check } from "lucide-vue-next";
    import { LogIn } from "lucide-vue-next";
    import { Book } from "lucide-vue-next";
    import { LogOut } from "lucide-vue-next";
    import { ChevronDown } from "lucide-vue-next";
    import { ChevronUp } from "lucide-vue-next";
    import { Menu } from "lucide-vue-next";
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { Separator } from "@/components/ui/separator";

    const drawer = ref(null);

    import {
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectItemIndicator,
        SelectItemText,
        SelectLabel,
        SelectPortal,
        SelectRoot,
        SelectScrollDownButton,
        SelectScrollUpButton,
        SelectSeparator,
        SelectTrigger,
        SelectValue,
        SelectViewport,
    } from "radix-vue";

    import LogoPart from "./LogoPart.vue";
    const store = useStore();
    const router = useRouter();

    const categories = computed(() => store.state.categories);

    const formatCurrency = (value) => {
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
           
        });
    };
    

    const priceTotal = computed(() => {
        return calculatePriceTotal(store.getters.cartProducts);
    });

    const storeName = store.state.storeName;
    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));

    function cartProducts() {
        router.push({
            name: "cart",
        });
    }

    function filterProduct(category) {
        const query = {
            category: category,
        };

        router.push({
            name: "allProductsClient",
            query: query,
        });
    }
    // Função para calcular o preço total de produtos
    const calculatePriceTotal = (cartProducts) => {
        return cartProducts.reduce((total, product) => total + product.subtotal, 0);
    };

    const user = computed(() => JSON.parse(localStorage.getItem("userData")));

    onMounted(async () => {
        await store.dispatch("displayTempCartPrices", isAuthenticated.value);
        await store.dispatch("getAllCategory");
    });
</script>
