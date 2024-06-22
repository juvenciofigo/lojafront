<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">{{ product.productName }}</h1>
        <div class="mb-4">
            <p>{{ product.productDescription }}</p>
            <p class="text-lg font-semibold">Base Price: {{ product.productPrice }} $</p>
            <p class="text-lg font-semibold">Total Price: {{ totalPrice }} $</p>
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Choose Color:</label>
            <select
                v-model="selectedColor"
                @change="updateVariation"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                <option
                    v-for="color in colors"
                    :key="color"
                    :value="color">
                    {{ color }}
                </option>
            </select>
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Choose Size:</label>
            <select
                v-model="selectedSize"
                @change="updateVariation"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                <option
                    v-for="size in sizes"
                    :key="size"
                    :value="size">
                    {{ size }}
                </option>
            </select>
        </div>
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700">Choose Model:</label>
            <select
                v-model="selectedModel"
                @change="updateVariation"
                class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                <option
                    v-for="model in models"
                    :key="model"
                    :value="model">
                    {{ model }}
                </option>
            </select>
        </div>
        <button
            @click="addToCart"
            class="bg-blue-500 text-white px-4 py-2 rounded-md">
            Add to Cart
        </button>
    </div>
</template>

<script>
    import { ref, reactive, computed } from "vue";

    export default {
        setup() {
            const product = reactive({
                productName: "Sample Product",
                productDescription: "This is a sample product description.",
                productPrice: 100,
                productVariations: [
                    {
                        variationType: "Color",
                        variationValue: "Red",
                        sku: "RED123",
                        variationPrice: 10, // Additional price
                        variationStock: true,
                        variationImage: ["red1.jpg", "red2.jpg"],
                    },
                    {
                        variationType: "Color",
                        variationValue: "Blue",
                        sku: "BLUE123",
                        variationPrice: 15, // Additional price
                        variationStock: true,
                        variationImage: ["blue1.jpg", "blue2.jpg"],
                    },
                    {
                        variationType: "Size",
                        variationValue: "M",
                        sku: "M123",
                        variationPrice: 0, // No additional price
                        variationStock: true,
                        variationImage: ["m1.jpg", "m2.jpg"],
                    },
                    {
                        variationType: "Size",
                        variationValue: "L",
                        sku: "L123",
                        variationPrice: 5, // Additional price
                        variationStock: true,
                        variationImage: ["l1.jpg", "l2.jpg"],
                    },
                    {
                        variationType: "Model",
                        variationValue: "Model A",
                        sku: "MA123",
                        variationPrice: 20, // Additional price
                        variationStock: true,
                        variationImage: ["ma1.jpg", "ma2.jpg"],
                    },
                    {
                        variationType: "Model",
                        variationValue: "Model B",
                        sku: "MB123",
                        variationPrice: 25, // Additional price
                        variationStock: true,
                        variationImage: ["mb1.jpg", "mb2.jpg"],
                    },
                ],
            });

            const colors = ref(["Red", "Blue"]);
            const sizes = ref(["M", "L"]);
            const models = ref(["Model A", "Model B"]);

            const selectedColor = ref(colors.value[0]);
            const selectedSize = ref(sizes.value[0]);
            const selectedModel = ref(models.value[0]);

            const totalPrice = computed(() => {
                let additionalPrice = 0;
                const selectedVariations = product.productVariations.filter(
                    (v) =>
                        (v.variationType === "Color" && v.variationValue === selectedColor.value) ||
                        (v.variationType === "Size" && v.variationValue === selectedSize.value) ||
                        (v.variationType === "Model" && v.variationValue === selectedModel.value)
                );

                selectedVariations.forEach((variation) => {
                    additionalPrice += variation.variationPrice || 0;
                });

                return product.productPrice + additionalPrice;
            });

            const updateVariation = () => {
                // This will trigger computed property recalculation
            };

            const addToCart = () => {
                // Logic to add the selected variation to the cart
                console.log(`Added ${selectedColor.value} - ${selectedSize.value} - ${selectedModel.value} to cart`);
            };

            return {
                product,
                colors,
                sizes,
                models,
                selectedColor,
                selectedSize,
                selectedModel,
                totalPrice,
                updateVariation,
                addToCart,
            };
        },
    };
</script>

<style scoped>
    /* Add custom styles here if needed */
</style>
