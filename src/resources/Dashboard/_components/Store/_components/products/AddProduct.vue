<template lang="">
    <div class="flex relative flex-col flex-1 gap-1 m-2 rounded-md p-4 bg-white">
        <div>
            <h1 class="text-lg font-semibold">Informações Básicas</h1>
            <p class="text-xs indent-2">Preencha as nformações abaixo</p>
        </div>
        <div>
            <form @submit="onSubmit">
                <div>
                    <div>
                        <div>
                            <FormField v-slot="{ componentField }" name="Titulo do produto">
                                <FormItem>
                                    <FormLabel>T'titutulo do produto</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="shadcn" v-bind="componentField" />
                                    </FormControl>
                                    <FormDescription> Titulo </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                            <FormField v-slot="{ componentField }" name="Descrição">
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tommy Hilfiger men striped pink sweatshirt. Crafted with cotton. Material composition is 100% organic cotton. \n Full Sleeve \n Cotton \n All Sizes available \n 4 Different Color"
                                            class="resize-none"
                                            v-bind="componentField" />
                                    </FormControl>
                                    <FormDescription> Descricao</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            </FormField>
                        </div>
                        <div>
                            <div>
                                <h2>Publicar</h2>
                                <Select>
                                    <SelectTrigger class="">
                                        <SelectValue placeholder="Select a fruit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value="apple"> Apple </SelectItem>
                                            <SelectItem value="banana"> Banana </SelectItem>
                                            <SelectItem value="blueberry"> Blueberry </SelectItem>
                                            <SelectItem value="grapes"> Grapes </SelectItem>
                                            <SelectItem value="pineapple"> Pineapple </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div class="border-slate-100">
                                <h2>Categorias</h2>
                                <Select>
                                    <SelectTrigger class="">
                                        <SelectValue placeholder="Selecione uma categoria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value="apple"> Apple </SelectItem>
                                            <SelectItem value="banana"> Banana </SelectItem>
                                            <SelectItem value="blueberry"> Blueberry </SelectItem>
                                            <SelectItem value="grapes"> Grapes </SelectItem>
                                            <SelectItem value="pineapple"> Pineapple </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <Button type="submit"> Submit </Button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>
    import { useForm } from "vee-validate";
    import { toTypedSchema } from "@vee-validate/zod";
    import * as z from "zod";
    import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
    import { Textarea } from "@/components/ui/textarea";
</script>
{ "productName":"VW GTI", "productDescription":"Jantes especiais", "productPrice":2000, "productCategory":"65b1471ef3f544284c9c54f7", "sku":"555454a5f55" }
