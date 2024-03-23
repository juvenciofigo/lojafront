<script setup>
import _objectWithoutProperties from "D:/PROJETOS DEV/LojaJVC/lojafront/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js";
var _excluded = ["class"];
import { computed } from "vue";
import { DialogDescription, useForwardProps } from "radix-vue";
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
  <DialogDescription
    v-bind="forwardedProps"
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
