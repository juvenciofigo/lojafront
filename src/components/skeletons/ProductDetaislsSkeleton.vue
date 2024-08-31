<template lang="">
    <div class="flex flex-col lg:flex-row p-1 gap-1 flex-1 h-max">
        <!-- Seção de imagens do produto -->
        <div class="images bg-white rounded-md w-full p-2 lg:w-[360px] flex flex-col gap-3 items-center">
            <div class="image self-center max-w-[450px] lg:w-full">
                <div class="bg-slate-100 rounded-md">
                    <v-skeleton-loader type="image"> </v-skeleton-loader>
                </div>
            </div>
            <div class="changeImage flex flex-row p-1 justify-center gap-2">
                <v-skeleton-loader type="image"> </v-skeleton-loader>
            </div>
        </div>

        <!-- Seção de detalhes do produto -->
        <div class="flex flex-col flex-1 gap-2 lg:overflow-auto lg:max-h-[calc(100vh-82px)]">
            <div class="Descriptions flex-1 flex flex-col gap-1 bg-white rounded-md p-2 md:p-4">
                <div>
                    <v-skeleton-loader type="subtitle"> </v-skeleton-loader>
                </div>
                <div>
                    <v-skeleton-loader type="subtitle"> </v-skeleton-loader>
                </div>
                <div class="text-lg">
                    <p>
                        <v-skeleton-loader type="subtitle"> </v-skeleton-loader>
                        <v-skeleton-loader type="subtitle"> </v-skeleton-loader>
                    </p>
                </div>

                <!-- Seção de seleção de variações -->
                <div class="button flex flex-col gap-3">
                    <div class="color">
                        <v-skeleton-loader type="subtitle"> </v-skeleton-loader>
                        <div>
                            <v-skeleton-loader type="chip"> </v-skeleton-loader>
                        </div>
                    </div>
                    <div class="sizes">
                        <v-skeleton-loader type="subtitle"> </v-skeleton-loader>
                        <v-skeleton-loader type="chip"> </v-skeleton-loader>
                    </div>
                    <div class="color">
                        <v-skeleton-loader type="subtitle"> </v-skeleton-loader>
                        <div>
                            <v-skeleton-loader type="chip"> </v-skeleton-loader>
                        </div>
                    </div>
                    <div class="sizes">
                        <v-skeleton-loader type="subtitle"> </v-skeleton-loader>
                        <v-skeleton-loader type="chip"> </v-skeleton-loader>
                    </div>

                    <!-- Input para quantidade -->
                    <div class="flex flex-row gap-3">
                        <v-skeleton-loader type="subtitle"> </v-skeleton-loader>
                    </div>

                    <!-- Botões de ação -->
                    <div class="flex-row gap-2 flex">
                        <v-skeleton-loader type="button"> </v-skeleton-loader>
                        <v-skeleton-loader type="button"> </v-skeleton-loader>
                        <v-skeleton-loader type="button"> </v-skeleton-loader>
                        <v-skeleton-loader type="button"> </v-skeleton-loader>
                    </div>
                </div>
                <!-- Fim da seção de seleção de variações -->

                <!-- Descrição do produto -->
                <div>
                    <v-skeleton-loader type="text"> </v-skeleton-loader>
                </div>
            </div>

            <!-- Especificações do produto -->
            <div class="Especificatios bg-white rounded-md p-2 md:p-4">
                <v-skeleton-loader type="subtitle"> </v-skeleton-loader>
                <div>
                    <v-skeleton-loader type="text"> </v-skeleton-loader>
                </div>
            </div>

            <!-- Avaliações do produto -->
            <div class="Avaliations bg-white rounded-md p-2 md:p-4">
                <v-skeleton-loader type="subtitle"> </v-skeleton-loader>
                <div class="flex flex-col gap-4">
                    <v-skeleton-loader type="text"> </v-skeleton-loader>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup></script>
