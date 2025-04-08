<template>
    <div class="text-center min-h-[140px] sm:min-h-[300px] lg:min-h-96 w-full">
        <el-carousel
            :height="'auto'"
            direction="vertical"
            motion-blur>
            <el-carousel-item
                v-for="(item, index) in items"
                :key="index"
                class="h-auto">
                <el-image
                    :src="item.url"
                    :alt="`Descrição do Banner ${index + 1}`"
                    lazy>
                    <template #placeholder>
                        <el-skeleton-item
                            variant="image"
                            style="width: 100%; height: 100%" />
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
    const items = [{ url: "images/baners/banner1.webp" }, { url: "images/baners/banner2.webp" }];
</script>
