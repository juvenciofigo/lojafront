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
    import axios from "axios";

    // Declaração dos dados reativos
    const store = useStore();
    const route = useRoute();
    const imagens = ref([]);
    const productId = route.params.id;

    function add(event) {
        const file = event.target.files;

        if (!file) return; // Verifica se um arquivo foi selecionado
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
        // try {
        //     const headers = {
        //         "Content-Type": "multipart/form-data",
        //         Authorization:
        //             "Ecommerce eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI2YjM5ZWQzZGE3ZWU2NDhkNDA2NzYiLCJlbWFpbCI6Imp1dmVuY2lvYWRtaW5AdGVzdC5jb20iLCJuYW1lIjoianV2ZW5pb0FkbWluIiwiZGF0ZUV4cCI6MTcwODU0MjQ3NS43NzUsImlhdCI6MTcwNzI0NjQ3NX0.BgAYJnMzZBvlgwFgWBNur60AcqRxD2gEsfU6009B63I",
        //     };
        //     const res = await axios.put(`http://localhost:3000/product/image/${route.params.id}`, formData, { headers });

        //     if (res.data) {
        //         const products = res.data;
        //         store.commit("updateSnackbar", { show: true, text: "Produto atualizado", color: "green" });
        //         window.history.back();
        //     }
        // } catch (error) {
        //     console.error("Error:", error);
        //     store.commit("updateSnackbar", { show: true, text: "Erro ao atualizar", color: "red" });
        // }
    }
</script>
