<template lang="">
    <div
        v-if="cartProducts && cartProducts.length > 0"
        class="">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="text-center flex-1">Product</TableHead>
                    <TableHead class="text-center">Preço unit.</TableHead>
                    <TableHead class="text-center">Quant.</TableHead>
                    <TableHead class="text-center">Subtotal</TableHead>
                    <TableHead
                        class="text-center"
                        :class="actionButton"
                        >Ações</TableHead
                    >
                </TableRow>
            </TableHeader>
            <TableBody
                v-for="product in cartProducts"
                :key="product.productId">
                <TableRow :class="tableRowHeight">
                    <TableCell class="text-center">
                        <button
                            @click="goTo(product.productId)"
                            class="flex flex-row flex-wrap justify-center items-center text-lg gap-2">
                            <img
                                :src="product.picture"
                                alt="Imagem do Produto"
                                class="min-h-10 max-h-24 border"
                                :class="image" />
                            {{ product.productName }}
                        </button>
                    </TableCell>
                    <TableCell class="text-center">{{ formatCurrency(product.productPrice) }}</TableCell>
                    <TableCell class="text-center">{{ formatCurrency(product.quantity) }} </TableCell>
                    <TableCell class="text-center">{{ formatCurrency(product.subtotal) }} </TableCell>
                    <TableCell
                        class="text-center"
                        :class="actionButton">
                        <button class="bg-slate-300 p-[3px] rounded-md">
                            <Trash2
                                @click="removeProduct(product.productId)"
                                color="red"
                                size="18" />
                        </button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
    <div
        v-else
        class="text-center">
        <p>Carinho vazio</p>
    </div>
</template>
<script setup>
    import { defineProps, ref,computed } from "vue";
    import { useRouter } from "vue-router";
    import { useStore } from "vuex";

    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
    import { Trash2 } from "lucide-vue-next";

    const router = useRouter();
    const store = useStore();

    defineProps({
        cartProducts: Array,
        image: String,
        tableRowHeight: String,
        actionButton: String,
    });

    function goTo(product) {
        router.push({ name: "detailsClient", params: { id: product } });
    }

    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));
    async function removeProduct(product) {
        await store.dispatch("removeProductCart", { isAuthenticated: isAuthenticated.value, product });
    }

    // Função para formatar valores monetários
    const formatCurrency = (value) => {
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };
</script>
