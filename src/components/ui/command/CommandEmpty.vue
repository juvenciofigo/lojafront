<script setup>
var _$attrs$class;
import { ComboboxEmpty } from "radix-vue";
import { cn } from "@/lib/utils";

var props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
});
</script>

<template>
  <ComboboxEmpty
    v-bind="props"
    :class="cn('py-6 text-center text-sm', $attrs.class ?? '')"
  >
    <slot />
  </ComboboxEmpty>
</template>
