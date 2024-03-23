<script setup>
import { cn } from "@/lib/utils";

var props = defineProps({
  class: { type: null, required: false },
});
</script>

<template>
  <div class="relative flex justify-center w-full overflow-auto">
    <table :class="cn('w-full max-w-[950px] caption-bottom text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>
