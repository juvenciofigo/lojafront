<script setup>
    import _objectWithoutProperties from "@/../node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js";
    var _excluded = ["class"];
    import { computed } from "vue";
    import { ToastTitle } from "radix-vue";
    import { cn } from "@/lib/utils";

    var props = defineProps({
        asChild: { type: Boolean, required: false },
        as: { type: null, required: false },
        class: { type: null, required: false },
    });

    var delegatedProps = computed(function () {
        var _ = props["class"],
            delegated = _objectWithoutProperties(props, _excluded);

        return delegated;
    });
</script>

<template>
    <ToastTitle
        v-bind="delegatedProps"
        :class="cn('text-sm font-semibold', props.class)">
        <slot />
    </ToastTitle>
</template>
