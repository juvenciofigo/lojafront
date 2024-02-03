<template lang="">
    <div class="px-8">
        <div class="h-[50px] flex flex-row justify-between items-center mr-10 border-b-[1px]">
            <div><p class="text-xs">Bem-vindo ao SHOP.</p></div>

            <div class="items-center flex flex-row">
                <Separator orientation="vertical" class="h-[25px]" decotarive />
                <router-link to="" class="flex flex-row items-center gap-2 h-max w-max mx-[15px]">
                    <ShoppingBag class="w-4 h-4" />
                    <span class="text-[15px] font-normal">Loja</span>
                </router-link>

                <Separator orientation="vertical" class="h-[25px]" decotarive />
                <router-link to="" class="flex flex-row items-center gap-2 h-max w-max mx-[15px]">
                    <Book class="w-4 h-4" />

                    <span class="text-[15px] font-normal">Sobre nós</span>
                </router-link>

                <Separator orientation="vertical" class="h-[25px]" decotarive />

                <router-link to="/login" class="flex flex-row items-center gap-2 h-max w-max mx-[15px]">
                    <LogIn class="w-4 h-4" />
                    <span class="text-[15px] font-normal">Entrar</span>
                </router-link>

                <Separator orientation="vertical" class="h-[25px]" decotarive />
                <router-link to="/dashboard" class="flex flex-row items-center gap-2 h-max w-max mx-[15px]">
                    <LogOut class="w-4 h-4" />
                    <span class="text-[15px] font-normal">Dahsboard</span>
                </router-link>

                <Separator orientation="vertical" class="h-[25px]" decotarive />
                <router-link to="" class="flex flex-row items-center gap-2 h-max w-max mx-[15px]">
                    <LogOut class="w-4 h-4" />
                    <span class="text-[15px] font-normal">Sair</span>
                </router-link>
            </div>
        </div>

        <div class="h-[100px] flex flex-row gap-4 items-center">
            <div class="px-3 h-max flex flex-row items-center">
                <LogoPart />
                <Button variant="gost" class="">
                    <v-icon style="font-size: 40px">menu</v-icon>
                </Button>
            </div>

            <div class="flex-1 flex flex-row">
                <form action="#" class="border-2 border-yellow-300 flex flex-1 flex-row mr-20 rounded-[50px]">
                    <Input class="flex-1 rounded-l-[50px] border-0" autocomplete="off" id="" type="text" placeholder="Pesquise pelo nome do produto" />
                    <div class="flex flex-row">
                        <Popover>
                            <PopoverTrigger as-child>
                                <!-- <Button variant="Ghost" role="combobox" :aria-expanded="open" class="w-[200px] justify-between">
                                    {{ value ? frameworks.find((framework) => framework.value === value)?.label : "Selecione uma categoria" }} -->
                                <Button variant="Ghost" role="combobox" class="w-[200px] justify-between">
                                    "Selecione uma categoria"

                                    <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-[200px] p-0">
                                <Command v-model="value">
                                    <CommandInput placeholder="Search framework..." />
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandList>
                                        <CommandGroup>
                                            <CommandItem v-for="framework in frameworks" :key="framework.value" :value="framework" @select="open = false">
                                                <Check :class="cn('mr-2 h-4 w-4', value === framework.value ? 'opacity-100' : 'opacity-0')" />
                                                {{ framework.label }}
                                            </CommandItem>
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>

                        <Button variant="ghost" type="submit" class="w-max bg-yellow-300 rounded-r-[50px] ml-4 flex gap-2 h-max px-[15px]"> <Search /></Button>
                    </div>
                </form>

                <div class="flex flex-row items-center">
                    <Button variant="Ghost" class="flex gap-2 h-max"> <Heart class="w-4 h-4" /></Button>
                    <Button variant="Ghost" class="flex gap-2 h-max"> <UserRound class="w-4 h-4" /></Button>
                    <Button variant="Ghost" class="flex gap-2 h-max"> <ShoppingBag class="w-4 h-4" /> 0,00 MZN </Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { Heart } from "lucide-vue-next";
    import { ShoppingBag } from "lucide-vue-next";
    import { Search } from "lucide-vue-next";
    import { ChevronsUpDown } from "lucide-vue-next";
    import { Check } from "lucide-vue-next";
    import { LogIn } from "lucide-vue-next";
    import { Book } from "lucide-vue-next";
    import { LogOut } from "lucide-vue-next";

    // components
    import LogoPart from "./LogoPart.vue";
    export default {
        components: {
            Heart,
            ShoppingBag,
            Search,
            ChevronsUpDown,
            Check,
            LogIn,
            Book,
            LogOut,
            // components
            LogoPart,
        },
        data() {
            return {};
        },
    };
</script>
<style lang=""></style>
