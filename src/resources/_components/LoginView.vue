<template lang="">
    <div class="flex flex-row h-100">
        <div class="flex-1"></div>

        <div class="max-w-[400px] w-screen flex flex-col justify-between bg-slate-300">
            <div class="flex flex-col flex-1">
                <LogoPart />

                <Separator orientation="horizontal" class="w-[85%] self-center my-4 mb-6" decotarive />

                <p class="text-blue-600 text-2xl self-center">Bem-vindo de volta!</p>

                <div class="px-7 mt-10">
                    <form @submit="onSubmit">
                        <FormField v-slot="{ componentField }" name="username">
                            <div class="flex flex-col gap-6">
                                <FormItem>
                                    <FormLabel>Email:</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="exemplo@email.com" v-bind="" />
                                    </FormControl>
                                    <!-- <FormDescription> This is your public display name. </FormDescription> -->
                                    <FormMessage />
                                </FormItem>
                                <FormItem>
                                    <FormLabel>Senha:</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Password" v-bind="" />
                                    </FormControl>
                                    <!-- <FormDescription> This is your public display name. </FormDescription> -->
                                    <FormMessage />
                                </FormItem>
                            </div>
                        </FormField>

                        <Button variant="outline" class="w-full mt-[20px]" type="submit"> Entrar </Button>
                    </form>
                    <Button variant="outline" class="w-full mt-[20px]"> <router-link to="/dashboard">Dahsboard</router-link> </Button>

                    <p class="px-2 mt-[25px]">
                        <span>Esqueceu a senha? </span>
                        <span class="underline">
                            <router-link to="/register"><span class="whitespace-nowrap"> Recuperar senha!</span></router-link>
                        </span>
                    </p>

                    <p class="px-2 mt-[25px]">
                        <span>Ainda não se tem uma conta? </span>
                        <span class="underline">
                            <router-link to="/register"><span class="whitespace-nowrap"> Cria conta!</span></router-link>
                        </span>
                    </p>


                </div>
            </div>

            <SignaturePart class="pb-2" />
        </div>
    </div>
</template>
<script>
    import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

    import { useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";

    //components
    import LogoPart from "@/components/parrtials/LogoPart.vue";
    import SignaturePart from "@/components/parrtials/SignaturePart.vue";

    export default {
        components: {
            FormControl,
            FormDescription,
            FormField,
            FormItem,
            FormLabel,
            FormMessage,

            //components
            LogoPart,
            SignaturePart,
        },
    };
</script>
<style lang=""></style>
