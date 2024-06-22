<!-- <template>
    <div class="bg-white shadow-md rounded p-6">
        <form @submit.prevent="submitVariation">
            <div class="mb-4">
                <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="attributes"
                    >Atributos:</label
                >
                <div
                    v-for="(attribute, index) in variation.attributes"
                    :key="index"
                    class="mb-2 flex items-center">
                    <input
                        v-model="attribute.name"
                        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                        type="text"
                        placeholder="Nome do Atributo" />
                    <input
                        v-model="attribute.value"
                        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                        type="text"
                        placeholder="Valor do Atributo" />
                    <button
                        @click.prevent="removeAttribute(index)"
                        class="text-red-500">
                        x
                    </button>
                </div>
                <button
                    @click.prevent="addAttribute"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Adicionar Atributo
                </button>
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

    const variation = ref({
        product: route.params.id, // Substitua isso pelo ID do produto correto
        attributes: [],
        additionalPrice: 0,
        stock: 0,
        sku: "",
        image: "",
    });

    function addAttribute() {
        variation.value.attributes.push({ name: "", value: "" });
        console.log(route.params.id);
    }
    function removeAttribute(index) {
        variation.value.attributes.splice(index, 1);
    }
    async function submitVariation() {
        try {
            // Supondo que o ID do produto seja passado como uma propriedade (prop)
            const productId = route.params.productId; // ou passe como uma prop
            console.log(variation.value);
            const response = await axios.post(`/api/products/${productId}/variations`, variation.value);
            console.log("Variação criada com sucesso:", response.data);
            // Limpar o formulário após a submissão
            variation.value = {
                product: "",
                attributes: [],
                additionalPrice: 0,
                stock: 0,
                sku: "",
                image: "",
            };
        } catch (error) {
            console.error("Erro ao criar variação:", error);
        }
    }
</script> -->
