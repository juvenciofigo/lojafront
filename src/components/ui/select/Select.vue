<script setup>
import { SelectRoot, useForwardPropsEmits } from "radix-vue";

var props = defineProps({
  open: { type: Boolean, required: false },
  defaultOpen: { type: Boolean, required: false },
  defaultValue: { type: String, required: false },
  modelValue: { type: String, required: false },
  orientation: { type: String, required: false },
  dir: { type: String, required: false },
  name: { type: String, required: false },
  autocomplete: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  required: { type: Boolean, required: false },
});
var emits = defineEmits(["update:modelValue", "update:open"]);

var forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <SelectRoot v-bind="forwarded">
    <slot />
  </SelectRoot>
</template>
