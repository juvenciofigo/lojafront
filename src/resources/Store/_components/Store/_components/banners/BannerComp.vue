<template>
    <div class="text-center w-full">
        <el-carousel
            :height="'auto'"
            direction="vertical"
            motion-blur>
            <el-carousel-item
                v-for="item in items"
                :key="item"
                class="h-auto">
                <img
                    v-if="imageLoaded"
                    :src="item.image"
                    @load="onImageLoad"
                    class="object-contain w-full h-auto" />
                <div
                    v-else
                    class="w-full h-auto bg-gray-200 animate-pulse"></div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>
    import { ref } from "vue";

    const items = [{ image: "images/baners/banner1.png" }, { image: "images/baners/banner2.png" }];

    const imageLoaded = ref(false);

    function onImageLoad() {
        imageLoaded.value = true;
    }
</script>
