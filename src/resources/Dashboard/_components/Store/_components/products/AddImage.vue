<template>
    <div>
        <form
            @submit.prevent
            enctype="multipart/form-data">
            <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="picture">Picture</Label>
                <input
                    @change="add"
                    multiple
                    id="picture"
                    type="file" />
            </div>
            <el-button
                @click="
                    () => {
                        loading = true;
                        updateImage();
                    }
                "
                :loading="loading"
                >Enviar</el-button
            >
        </form>
    </div>
</template>

<script setup>
    import { useStore } from "vuex";
    import { ref, toRaw } from "vue";
    import { useRoute } from "vue-router";

    const store = useStore();
    const route = useRoute();
    const images = ref([]);
    const loading = ref(false);
    const productId = route.params.id;

    function add(event) {
        const file = event.target.files;

        if (!file) return;
        for (let i = 0; i < file.length; i++) {
            images.value.push(file[i]);
        }
    }

    async function updateImage() {
        console.log(toRaw(images.value));
        
        if (images.value.length === 0) {
            loading.value = false;
            return;
        }
        const formData = new FormData();

        for (let i = 0; i < images.value.length; i++) {
            formData.append("files", images.value[i]);
        }

        await store.dispatch("updateImage", { productId, formData });
        loading.value = false;
        images.value = [];
    }
</script>
<style scoped>
    button {
        background-color: #175bd8;
        color: #fff;
        font-size: 12px;
        padding: 10px 25px;
        border-radius: 8px;
        font-weight: 600;
        text-transform: uppercase;
        margin-top: 10px;
    }
</style>
