<script setup>
import _objectWithoutProperties from "D:/PROJETOS DEV/LojaJVC/lojafront/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js";
var _excluded = ["class"];
import { computed } from "vue";
import { DialogTitle, useForwardProps } from "radix-vue";
import { cn } from "@/lib/utils";

var props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
});

var delegatedProps = computed(function () {
  var _ = props["class"],
    delegated = _objectWithoutProperties(props, _excluded);

  return delegated;
});

var forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <DialogTitle
    v-bind="forwardedProps"
    :class="
      cn('text-lg font-semibold leading-none tracking-tight', props.class)
    "
  >
    <slot />
  </DialogTitle>
</template>
