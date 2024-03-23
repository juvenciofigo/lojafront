<script setup>
import _objectWithoutProperties from "D:/PROJETOS DEV/LojaJVC/lojafront/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js";
var _excluded = ["class"];
import { computed } from "vue";
import { ToastRoot, useForwardPropsEmits } from "radix-vue";
import { toastVariants } from ".";
import { cn } from "@/lib/utils";

var props = defineProps({
  class: { type: null, required: false },
  variant: { type: null, required: false },
  onOpenChange: { type: Function, required: false, skipCheck: true },
  defaultOpen: { type: Boolean, required: false },
  forceMount: { type: Boolean, required: false },
  type: { type: String, required: false },
  open: { type: Boolean, required: false },
  duration: { type: Number, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
});

var emits = defineEmits([
  "close",
  "escapeKeyDown",
  "pause",
  "resume",
  "swipeStart",
  "swipeMove",
  "swipeCancel",
  "swipeEnd",
  "update:open",
]);

var delegatedProps = computed(function () {
  var _ = props["class"],
    delegated = _objectWithoutProperties(props, _excluded);

  return delegated;
});

var forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    :class="cn(toastVariants({ variant }), props.class)"
    @update:open="onOpenChange"
  >
    <slot />
  </ToastRoot>
</template>
