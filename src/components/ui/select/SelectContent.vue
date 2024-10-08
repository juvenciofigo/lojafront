<script setup>
    import _objectSpread from "@/../node_modules/@babel/runtime/helpers/esm/objectSpread2.js";
    import _objectWithoutProperties from "@/../node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js";
    var _excluded = ["class"];
    import { computed } from "vue";
    import { SelectContent, SelectPortal, SelectViewport, useForwardPropsEmits } from "radix-vue";
    import { SelectScrollDownButton, SelectScrollUpButton } from ".";
    import { cn } from "@/lib/utils";

    defineOptions({
        inheritAttrs: false,
    });

    var props = defineProps({
        forceMount: { type: Boolean, required: false },
        position: { type: String, required: false, default: "popper" },
        side: { type: null, required: false },
        sideOffset: { type: Number, required: false },
        align: { type: null, required: false },
        alignOffset: { type: Number, required: false },
        avoidCollisions: { type: Boolean, required: false },
        collisionBoundary: { type: null, required: false },
        collisionPadding: { type: [Number, Object], required: false },
        arrowPadding: { type: Number, required: false },
        sticky: { type: String, required: false },
        hideWhenDetached: { type: Boolean, required: false },
        updatePositionStrategy: { type: String, required: false },
        onPlaced: { type: Function, required: false },
        prioritizePosition: { type: Boolean, required: false },
        asChild: { type: Boolean, required: false },
        as: { type: null, required: false },
        class: { type: null, required: false },
    });
    var emits = defineEmits(["closeAutoFocus", "escapeKeyDown", "pointerDownOutside"]);

    var delegatedProps = computed(function () {
        var _ = props["class"],
            delegated = _objectWithoutProperties(props, _excluded);

        return delegated;
    });

    var forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <SelectPortal>
        <SelectContent
            v-bind="{ ...forwarded, ...$attrs }"
            :class="
                cn(
                    'relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                    position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                    props.class
                )
            ">
            <SelectScrollUpButton />
            <SelectViewport :class="cn('p-1', position === 'popper' && 'h-[--radix-select-trigger-height] w-full min-w-[--radix-select-trigger-width]')">
                <slot />
            </SelectViewport>
            <SelectScrollDownButton />
        </SelectContent>
    </SelectPortal>
</template>
