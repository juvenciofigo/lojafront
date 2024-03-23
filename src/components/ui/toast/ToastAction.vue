<script setup>
import _objectWithoutProperties from "D:/PROJETOS DEV/LojaJVC/lojafront/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js";
var _excluded = ["class"];
import { computed } from "vue";
import { ToastAction } from "radix-vue";
import { cn } from "@/lib/utils";

var props = defineProps({
  altText: { type: String, required: true },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

var delegatedProps = computed(function () {
  var _ = props["class"],
    delegated = _objectWithoutProperties(props, _excluded);

  return delegated;
});
</script>

<template>
  <ToastAction
    v-bind="delegatedProps"
    :class="
      cn(
        'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
        props.class
      )
    "
  >
    <slot />
  </ToastAction>
</template>
