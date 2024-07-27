<template>
    <div>
        <form
            @submit="updateImage"
            enctype="multipart/form-data">
            <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="picture">Picture</Label>
                <input
                    @change="add"
                    multiple
                    id="picture"
                    type="file" />
            </div>
            <Button>Salvar</Button>
        </form>
    </div>
</template>

<script setup>
    import { useStore } from "vuex";
    import { ref } from "vue";
    import { useRoute } from "vue-router";
    import { Button } from "@/components/ui/button";

    const store = useStore();
    const route = useRoute();
    const imagens = ref([]);
    const productId = route.params.id;

    function add(event) {
        const file = event.target.files;

        if (!file) return;
        for (let i = 0; i < file.length; i++) {
            imagens.value.push(file[i]);
        }
    }

    async function updateImage(event) {
        event.preventDefault();
        if (imagens.value.length === 0) {
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < imagens.value.length; i++) {
            formData.append("files", imagens.value[i]);
        }
        store.dispatch("updateImage", { productId, formData });
    }
</script>
