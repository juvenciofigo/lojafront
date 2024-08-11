<script setup>
    import _objectSpread from "@/../node_modules/@babel/runtime/helpers/esm/objectSpread2.js";
    import { CollapsibleRoot, useEmitAsProps } from "radix-vue";

    var props = defineProps({
        defaultOpen: { type: Boolean, required: false },
        open: { type: Boolean, required: false },
        disabled: { type: Boolean, required: false },
        asChild: { type: Boolean, required: false },
        as: { type: null, required: false },
    });
    var emits = defineEmits(["update:open"]);
</script>

<template>
    <CollapsibleRoot
        v-slot="{ open }"
        v-bind="{ ...props, ...useEmitAsProps(emits) }">
        <slot :open="open" />
    </CollapsibleRoot>
</template>
