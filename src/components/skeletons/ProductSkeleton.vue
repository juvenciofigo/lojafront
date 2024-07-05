<template>
    <div class="rounded-md h-[180px] max-w-[350px] md:w-[250px] md:h-[360px] w-full justify-between flex md:flex-col bg-white p-2">
        <v-skeleton-loader
            type="image"
            class="flex-1">
        </v-skeleton-loader>
        <v-skeleton-loader
            type="paragraph"
            class=""></v-skeleton-loader>
    </div>
</template>
<script>
    export default {
        data: () => ({
            cards: [
                {
                    title: "Homemade Dulce de Leche Ice Cream with Chocolate Chips",
                    subtitle: "Happy Foods",
                    src: "https://cdn.vuetifyjs.com/docs/images/graphics/dulce-ice-cream.png",
                },
                {
                    title: "Salted Caramel Swirl Ice Cream",
                    subtitle: "Stone Kitchen",
                    src: "https://cdn.vuetifyjs.com/docs/images/graphics/salted-caramel-ice-cream.png",
                },
                {
                    title: "Peanut Butter No-Churn Ice Cream",
                    subtitle: "The Sweeter Side",
                    src: "https://cdn.vuetifyjs.com/docs/images/graphics/peanut-butter-ice-cream.png",
                },
            ],
        }),
    };
</script>
