<script setup>
import { cn } from "@/lib/utils";

var props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <td
    :class="cn('px-2 py-1 align-middle [&:has([role=checkbox])]:pr-0', props.class)"
  >
    <slot />
  </td>
</template>
