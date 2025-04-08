<template>
    <div class="min-h-[140px] w-full text-center sm:min-h-[300px] lg:min-h-96">
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
                        <div class="flex h-48 w-full items-center justify-center bg-gray-200 text-red-500">
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
