<template>
    <div class="bg-white shadow-md rounded p-6">
        <form @submit.prevent="submitVariation">
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="colors">
                    Cores:
                </label>
                <input
                    v-model="newColor"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Adicionar cor"
                    @keyup.enter="addColor" />
                <div class="mt-2">
                    <span
                        v-for="(color, index) in variation.colors"
                        :key="index"
                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >{{ color }}
                        <button
                            @click.prevent="removeColor(index)"
                            class="text-red-500 ml-1">
                            x
                        </button></span
                    >
                </div>
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="sizes"
                    >Tamanhos:</label
                >
                <input
                    v-model="newSize"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Adicionar tamanho"
                    @keyup.enter="addSize" />
                <div class="mt-2">
                    <span
                        v-for="(size, index) in variation.sizes"
                        :key="index"
                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >{{ size }}
                        <button
                            @click.prevent="removeSize(index)"
                            class="text-red-500 ml-1">
                            x
                        </button></span
                    >
                </div>
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="materials"
                    >Materiais:</label
                >
                <input
                    v-model="newMaterial"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Adicionar material"
                    @keyup.enter="addMaterial" />
                <div class="mt-2">
                    <span
                        v-for="(material, index) in variation.materials"
                        :key="index"
                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >{{ material }}
                        <button
                            @click.prevent="removeMaterial(index)"
                            class="text-red-500 ml-1">
                            x
                        </button></span
                    >
                </div>
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="models"
                    >Modelos:</label
                >
                <input
                    v-model="newModel"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Adicionar modelo"
                    @keyup.enter="addModel" />
                <div class="mt-2">
                    <span
                        v-for="(model, index) in variation.models"
                        :key="index"
                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >{{ model }}
                        <button
                            @click.prevent="removeModel(index)"
                            class="text-red-500 ml-1">
                            x
                        </button></span
                    >
                </div>
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="additionalPrice"
                    >Preço Adicional:</label
                >
                <input
                    v-model.number="variation.additionalPrice"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="Preço adicional" />
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="stock"
                    >Estoque:</label
                >
                <input
                    v-model.number="variation.stock"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="Quantidade em estoque" />
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="sku"
                    >SKU:</label
                >
                <input
                    v-model="variation.sku"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="SKU" />
            </div>

            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="image"
                    >URL da Imagem:</label
                >
                <input
                    v-model="variation.image"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="URL da imagem" />
            </div>

            <div class="flex items-center justify-between">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Criar Variação
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import axios from "axios";
    import { useRoute } from "vue-router";
    import { ref } from "vue";

    const route = useRoute();

    const newColor = ref("");
    const newSize = ref("");
    const newMaterial = ref("");
    const newModel = ref("");
    const variation = ref({
        colors: [],
        sizes: [],
        materials: [],
        models: [],
        additionalPrice: 0,
        stock: 0,
        sku: "",
        image: "",
    });

    
    function addColor() {
        if (newColor.value && !variation.value.colors.includes(newColor.value)) {
            variation.value.colors.push(newColor.value);
            newColor.value = "";
        }
    }

    function removeColor(index) {
        variation.value.colors.splice(index, 1);
    }

    function addSize() {
        if (newSize.value && !variation.value.sizes.includes(newSize.value)) {
            variation.value.sizes.push(newSize.value);
            newSize.value = "";
        }
    }

    function removeSize(index) {
        variation.value.sizes.splice(index, 1);
    }

    function addMaterial() {
        if (newMaterial.value && !variation.value.materials.includes(newMaterial.value)) {
            variation.value.materials.push(newMaterial.value);
            newMaterial.value = "";
        }
    }

    function removeMaterial(index) {
        variation.value.materials.splice(index, 1);
    }

    function addModel() {
        if (newModel.value && !variation.value.models.includes(newModel.value)) {
            variation.value.models.push(newModel.value);
            newModel.value = "";
        }
    }

    function removeModel(index) {
        variation.value.models.splice(index, 1);
    }

    async function submitVariation() {
        try {
            // Supondo que o ID do produto seja passado como uma propriedade (prop)
            const productId = route.params.productId; // ou passe como uma prop
            const response = await axios.post(`/api/products/${productId}/variations`, variation.value);
            // Limpar o formulário após a submissão
            variation.value = {
                colors: [],
                sizes: [],
                materials: [],
                models: [],
                additionalPrice: 0,
                stock: 0,
                sku: "",
                image: "",
            };
        } catch (error) {
            console.error("Erro ao criar variação:", error);
        }
    }
</script>
