<template>
    <div class="text-center min-h-[140px] sm:min-h-[300px] lg:min-h-96 w-full">
        <div class="hidden sm:block">
            <el-carousel
                :height="'auto'"
                direction="vertical"
                motion-blur>
                <el-carousel-item
                    v-for="(item, index) in items"
                    :key="index"
                    class="h-auto">
                    <template #default>
                        <div class="relative">
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
                            <router-link
                                class="absolute bottom-[50%] left-[50%]"
                                v-if="item.productId"
                                :to="{ name: 'product-details', params: { id: `${item.productId}` } }">
                                <el-button
                                    >
                                    Ver Mais...</el-button
                                >
                            </router-link>
                        </div>
                    </template>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="block sm:hidden">
            <el-carousel
                :height="'auto'"
                direction="vertical"
                motion-blur>
                <el-carousel-item
                    v-for="(item, index) in itemsMobile"
                    :key="index"
                    class="h-auto">
                    <template #default>
                        <div class="relative">
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
                            <router-link
                                class="absolute bottom-[20px] left-[50%]"
                                v-if="item.productId"
                                :to="{ name: 'product-details', params: { id: `${item.productId}` } }">
                                <el-button
                                    plain
                                    type="primary">
                                    Ver Mais...</el-button
                                >
                            </router-link>
                        </div>
                    </template>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script setup>
    const items = [
        { url: "images/baners/Banner-calca-treino.png", productId: "68115fe02b85d6a0fa26aa44" },
        { url: "images/baners/Banner-calca-treino.png", productId: "68115fe02b85d6a0fa26aa44" },
    ];
    const itemsMobile = [
        { url: "images/baners/calca-treino-mobile.jpg", productId: "68115fe02b85d6a0fa26aa44" },
        { url: "images/baners/calca-treino-mobile.jpg", productId: "68115fe02b85d6a0fa26aa44" },
    ];
</script>
