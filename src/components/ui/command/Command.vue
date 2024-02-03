<script setup>
var _$attrs$class;
import { ComboboxRoot, useForwardPropsEmits } from "radix-vue";
import { cn } from "@/lib/utils";

var props = defineProps({
  modelValue: { type: null, required: false },
  defaultValue: { type: null, required: false },
  open: { type: Boolean, required: false },
  defaultOpen: { type: Boolean, required: false },
  searchTerm: { type: String, required: false },
  multiple: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  name: { type: String, required: false },
  dir: { type: String, required: false },
  filterFunction: { type: Function, required: false },
  displayValue: { type: Function, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
});
var emits = defineEmits([
  "update:modelValue",
  "update:open",
  "update:searchTerm",
]);

var forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxRoot
    v-bind="forwarded"
    :open="true"
    :model-value="''"
    :class="
      cn(
        'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
        $attrs.class ?? ''
      )
    "
  >
    <slot />
  </ComboboxRoot>
</template>
