<script setup>
var _$attrs$class;
import { ComboboxSeparator } from "radix-vue";
import { cn } from "@/lib/utils";

var props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
});
</script>

<template>
  <ComboboxSeparator
    v-bind="props"
    :class="cn('-mx-1 h-px bg-border', $attrs.class ?? '')"
  >
    <slot />
  </ComboboxSeparator>
</template>
