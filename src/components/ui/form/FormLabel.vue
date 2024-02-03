<script setup>
import _objectWithoutProperties from "D:/PROJETOS DEV/LojaJVC/lojafront/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js";
import { useAttrs } from "vue";
import { Label } from "radix-vue";
import { useFormField } from "./useFormField";
import { cn } from "@/lib/utils";

defineOptions({
  inheritAttrs: false,
});
var props = defineProps({
  for: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
});

var _useFormField = useFormField(),
  error = _useFormField.error,
  formItemId = _useFormField.formItemId;
var _useAttrs$Label = useAttrs();
</script>

<template>
  <Label
    :class="
      cn(
        'block text-sm tracking-tight font-medium text-foreground text-left',
        error && 'text-destructive',
        className ?? ''
      )
    "
    :for="formItemId"
    v-bind="rest"
  >
    <slot />
  </Label>
</template>
