<!-- <template lang="">
    <div>
        <h1 class="text-xl">Meus pagamentos</h1>
        <PaymentsComp />
    </div>
</template>
<script setup>
    import PaymentsComp from "@/resources/_components/PaymentsComp.vue";
</script> -->

<template>
    <div v-if="product">
        <!-- Seletores Dinâmicos -->
        <select
            v-if="coresDisponiveis.length"
            v-model="selectedCor"
            @change="resetDependentSelections('cor')">
            <option value="">Selecione a Cor</option>
            <option
                v-for="cor in coresDisponiveis"
                :key="cor"
                :value="cor">
                {{ cor }}
            </option>
        </select>

        <select
            v-if="modelosDisponiveis.length"
            v-model="selectedModelo"
            @change="resetDependentSelections('modelo')"
            :disabled="!selectedCor">
            <option value="">Selecione o Modelo</option>
            <option
                v-for="modelo in modelosDisponiveis"
                :key="modelo"
                :value="modelo">
                {{ modelo }}
            </option>
        </select>

        <select
            v-if="tamanhosDisponiveis.length"
            v-model="selectedTamanho"
            :disabled="!selectedModelo">
            <option value="">Selecione o Tamanho</option>
            <option
                v-for="tamanho in tamanhosDisponiveis"
                :key="tamanho"
                :value="tamanho">
                {{ tamanho }}
            </option>
        </select>

        <!-- Botão Bloqueado até seleção completa -->
        <button
            @click="addToCart"
            :disabled="!isSelectionComplete || !variacaoEncontrada"
            :class="{ 'disabled-button': !variacaoEncontrada }">
            {{ variacaoEncontrada ? "Adicionar ao Carrinho" : "Indisponível" }}
        </button>

        <!-- Mensagens de Erro -->
        <p
            v-if="isSelectionComplete && !variacaoEncontrada"
            class="error">
            Combinação indisponível!
        </p>
    </div>
</template>

<script setup>
    import { computed, ref, watchEffect } from "vue";

    const product = ref(null);

    // Simulação de carregamento de dados (pode ser substituído por uma requisição à API)
    watchEffect(() => {
        product.value = {
            name: "Tênis Esportivo",
            variations: [
                {
                    attributes: { cor: "preto", modelo: "Runner", tamanho: "40" },
                    stock: 5,
                    sku: "TENIS-PRETO-RUNNER-40",
                },
                {
                    attributes: { cor: "preto", modelo: "Runner", tamanho: "42" },
                    stock: 0, // Indisponível
                    sku: "TENIS-PRETO-RUNNER-42",
                },
                {
                    attributes: { cor: "branco", modelo: "Walker", tamanho: "39" },
                    stock: 3,
                    sku: "TENIS-BRANCO-WALKER-39",
                },
            ],
        };
    });

    const selectedCor = ref("");
    const selectedModelo = ref("");
    const selectedTamanho = ref("");

    // Opções disponíveis com base nas seleções
    const coresDisponiveis = computed(() => {
        return product.value ? [...new Set(product.value.variations.map((v) => v.attributes.cor))] : [];
    });

    const modelosDisponiveis = computed(() => {
        if (!selectedCor.value || !product.value) return [];
        return [...new Set(product.value.variations.filter((v) => v.attributes.cor === selectedCor.value).map((v) => v.attributes.modelo))];
    });

    const tamanhosDisponiveis = computed(() => {
        if (!selectedModelo.value || !product.value) return [];
        return [
            ...new Set(product.value.variations.filter((v) => v.attributes.cor === selectedCor.value && v.attributes.modelo === selectedModelo.value && v.stock > 0).map((v) => v.attributes.tamanho)),
        ];
    });

    // Verifica se a combinação existe e tem estoque
    const variacaoEncontrada = computed(() => {
        return product.value
            ? product.value.variations.find(
                  (v) => v.attributes.cor === selectedCor.value && v.attributes.modelo === selectedModelo.value && v.attributes.tamanho === selectedTamanho.value && v.stock > 0
              )
            : null;
    });

    const isSelectionComplete = computed(() => {
        return selectedCor.value && selectedModelo.value && selectedTamanho.value;
    });

    // Reset de seleções dependentes
    const resetDependentSelections = (changedAttribute) => {
        if (changedAttribute === "cor") {
            selectedModelo.value = "";
            selectedTamanho.value = "";
        } else if (changedAttribute === "modelo") {
            selectedTamanho.value = "";
        }
    };

    const addToCart = () => {
        if (!variacaoEncontrada.value) return;

        console.log("Adicionando ao carrinho:", {
            product: product.value.name,
            sku: variacaoEncontrada.value.sku,
        });

        // Aqui você enviaria os dados para o backend via API
    };
</script>

<style>
    .disabled-button {
        background: #ccc;
        cursor: not-allowed;
    }
</style>
