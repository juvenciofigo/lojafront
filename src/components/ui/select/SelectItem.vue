<script setup>
    import _objectWithoutProperties from "@/../node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js";
    var _excluded = ["class"];
    import { computed } from "vue";
    import { SelectItem, SelectItemIndicator, SelectItemText, useForwardProps } from "radix-vue";
    import { Check } from "lucide-vue-next";
    import { cn } from "@/lib/utils";

    var props = defineProps({
        value: { type: String, required: true },
        disabled: { type: Boolean, required: false },
        textValue: { type: String, required: false },
        asChild: { type: Boolean, required: false },
        as: { type: null, required: false },
        class: { type: null, required: false },
    });

    var delegatedProps = computed(function () {
        var _ = props["class"],
            delegated = _objectWithoutProperties(props, _excluded);

        return delegated;
    });

    var forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <SelectItem
        v-bind="forwardedProps"
        :class="
            cn(
                'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                props.class
            )
        ">
        <span class="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
            <SelectItemIndicator>
                <Check class="h-4 w-4" />
            </SelectItemIndicator>
        </span>

        <SelectItemText>
            <slot />
        </SelectItemText>
    </SelectItem>
</template>
