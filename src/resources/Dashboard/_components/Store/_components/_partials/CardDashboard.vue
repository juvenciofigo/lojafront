<template lang="">
    <div class="Users w-full md:w-[240px] rounded-md p-4 flex bg-wh flex-row bg-white">
        <div class="flex-1 flex justify-around gap-3 flex-col text-blue-400">
            <p class="text-xl text-muted-foreground font-semibold">{{ nameCard }}</p>
            <p class="text-2xl font-semibold">
                <span v-if="result">{{ result }}</span>
                <span v-else>
                    <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate>
                    </v-progress-circular
                ></span>
            </p>
            <div>
                <router-link
                    v-if="link"
                    :to="{ name: `${link}` }"
                    class="underline hover:text-blue-400 text-blue-600">
                    Ver todos
                </router-link>
            </div>
        </div>
        <div class="flex flex-col justify-between">
            <p>{{ percent }}</p>
            <slot name="icon"></slot>
        </div>
    </div>
</template>
<script setup>
    import { defineProps } from "vue";
    defineProps({
        nameCard: {
            type: String,
            required: true,
        },
        result: {
            type: Number,
            required: false,
        },
        link: {
            type: String,
            required: false,
        },
        percent: {
            type: String,
            required: false,
        },
    });
</script>
