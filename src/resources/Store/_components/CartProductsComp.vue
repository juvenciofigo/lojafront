<template lang="">
    <div
        v-if="cartProducts.cartProducts && cartProducts.cartProducts.length > 0"
        class="bg-white m-3 rounded-md p-3">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead class="text-center flex-1">Product</TableHead>
                    <TableHead class="text-center">Preço unit.</TableHead>
                    <TableHead class="text-center">Quant.</TableHead>
                    <TableHead class="text-center">Espec.</TableHead>
                    <TableHead class="text-center">Subtotal</TableHead>
                    <TableHead
                        class="text-center"
                        :class="actionButton">
                        Ações
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody
                v-for="item in cartProducts.cartProducts"
                :key="item.productId">
                <TableRow :class="tableRowHeight">
                    <TableCell class="text-center">
                        <button
                            @click="goTo(item.productId)"
                            class="flex flex-row flex-wrap justify-center items-center text-lg gap-2">
                            <img
                                :src="item.picture"
                                alt="Imagem do Produto"
                                class="min-h-10 max-h-24 border"
                                :class="image" />
                            {{ item.productName }}
                        </button>
                    </TableCell>
                    <TableCell class="text-center">{{ formatCurrency(item.productPrice) }}</TableCell>
                    <TableCell class="text-center">
                        <input
                            class="text-center"
                            type="number"
                            v-model.number="item.quantity"
                            @change="updateQuantity(item.item, item.quantity)"
                            min="1" />
                    </TableCell>
                    <TableCell class="text-center">
                        <div
                            class="color whitespace-nowrap"
                            v-if="item.variation && item.variation.color">
                            <span>{{ item.variation.color.variationType }}: </span>
                            <span>{{ item.variation.color.variationValue }}</span>
                        </div>
                        <div
                            class="model whitespace-nowrap"
                            v-if="item.variation && item.variation.model">
                            <span>{{ item.variation.model.variationType }}: </span>
                            <span>{{ item.variation.model.variationValue }}</span>
                        </div>
                        <div
                            class="size whitespace-nowrap"
                            v-if="item.variation && item.variation.size">
                            <span>{{ item.variation.size.variationType }}: </span>
                            <span>{{ item.variation.size.variationValue }}</span>
                        </div>
                        <div
                            class="material whitespace-nowrap"
                            v-if="item.variation && item.variation.material">
                            <span>{{ item.variation.material.variationType }}: </span>
                            <span>{{ item.variation.material.variationValue }}</span>
                        </div>
                    </TableCell>
                    <TableCell class="text-center">{{ formatCurrency(item.subtotal) }} </TableCell>
                    <TableCell
                        class="text-center"
                        :class="actionButton">
                        <button class="bg-slate-300 p-[3px] rounded-md">
                            <Trash2
                                @click="removeProduct(item.item)"
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
    import { defineProps, ref, computed } from "vue";
    import { useRouter } from "vue-router";
    import { useStore } from "vuex";

    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
    import { Trash2 } from "lucide-vue-next";

    const router = useRouter();
    const store = useStore();

    defineProps({
        cartProducts: Object,
        image: String,
        tableRowHeight: String,
        actionButton: String,
    });

    function goTo(product) {
        router.push({ name: "detailsClient", params: { id: product } });
    }

    const isAuthenticated = ref(computed(() => store.getters.isAuthenticated("authToken")));

    async function update() {
        await store.dispatch("displayTempCartPrices", isAuthenticated.value);
        await store.dispatch("displayTempCartProducts", isAuthenticated.value);
    }

    async function removeProduct(item) {
        await store.dispatch("removeProductCart", { isAuthenticated: isAuthenticated.value, item });
        update();
    }

    async function updateQuantity(item, quantity) {
        await store.dispatch("updateProductQuantity", { item, quantity: quantity || 1, isAuthenticated: isAuthenticated.value, store });
        update();
    }

    // Função para formatar valores monetários
    const formatCurrency = (value) => {
        return value.toLocaleString("pt-MZ", {
            style: "currency",
            currency: "MZN",
        });
    };
</script>
