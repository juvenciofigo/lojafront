<script setup>
    import _objectWithoutProperties from "@/../node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js";
    import { useAttrs } from "vue";
    import { useFormField } from "./useFormField";
    import { cn } from "@/lib/utils";

    defineOptions({
        inheritAttrs: false,
    });

    var _useFormField = useFormField(),
        formDescriptionId = _useFormField.formDescriptionId;
    var _useAttrs$formDescrip = useAttrs();
</script>

<template>
    <p
        :id="formDescriptionId"
        :class="cn('text-sm text-muted-foreground', className ?? '')"
        v-bind="rest">
        <slot />
    </p>
</template>
