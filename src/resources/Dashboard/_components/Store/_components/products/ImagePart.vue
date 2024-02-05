<template>
    <div>
        <img v-if="product.productImage && product.productImage.length > 0" :src="product.productImage[0]" class="object-cover" alt="Imagem do Produto" />
    </div>
</template>

<script setup>
    import { useRoute } from "vue-router";
    import { ref, computed, onMounted } from "vue";
    import { useStore } from "vuex";

    const route = useRoute();
    const store = useStore();

    const product = computed(() => store.state.product);

    function getImageSrc() {
        const index = route.params.index;

        if (index >= 0 && index < product.value.productImage.length) {
            return product.value.productImage[index];
        }
    }
</script>
