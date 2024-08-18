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
                <el-image
                    :src="item.url"
                    lazy>
                    <template #placeholder>
                        <div class="w-full h-48 bg-gray-200 flex items-center justify-center">
                            <i class="el-icon-loading"></i>
                        </div>
                    </template>
                    <template #error>
                        <div class="w-full h-48 bg-gray-200 flex items-center justify-center text-red-500">
                            <i class="el-icon-picture-outline"></i>
                            <span>Imagem não pôde ser carregada</span>
                        </div>
                    </template>
                </el-image>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>
    const items = [{ url: "images/baners/banner1.png" }, { url: "images/baners/banner2.png" }];
</script>
