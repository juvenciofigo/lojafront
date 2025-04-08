<script setup>
    var _props$class;
    import { useVModel } from "@vueuse/core";
    import { cn } from "@/lib/utils";

    var props = defineProps({
        defaultValue: { type: [String, Number], required: false },
        modelValue: { type: [String, Number], required: false },
        class: { type: null, required: false },
    });

    var emits = defineEmits(["update:modelValue"]);

    var modelValue = useVModel(props, "modelValue", emits, {
        passive: true,
        defaultValue: props.defaultValue,
    });
</script>

<template>
    <input
        v-model="modelValue"
        :class="
            cn(
                'flex w-full rounded-md border border-input bg-background px-2 py-[5px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:outline outline outline-1 disabled:cursor-not-allowed disabled:opacity-50',
                props.class ?? ''
            )
        " />
</template>
