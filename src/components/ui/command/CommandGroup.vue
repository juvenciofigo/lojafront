<script setup>
    var _$attrs$class;
    import { ComboboxGroup, ComboboxLabel } from "radix-vue";
    import { cn } from "@/lib/utils";

    var props = defineProps({
        asChild: { type: Boolean, required: false },
        as: { type: null, required: false },
        heading: { type: String, required: false },
    });
</script>

<template>
    <ComboboxGroup
        v-bind="props"
        :class="cn('overflow-hidden p-1 text-foreground', $attrs.class ?? '')">
        <ComboboxLabel
            v-if="heading"
            class="px-2 py-1.5 font-medium text-muted-foreground">
            {{ heading }}
        </ComboboxLabel>
        <slot />
    </ComboboxGroup>
</template>
