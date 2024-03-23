<script setup>
import _objectWithoutProperties from "D:/PROJETOS DEV/LojaJVC/lojafront/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js";
var _excluded = ["class"];
import { computed } from "vue";
import { Label } from "radix-vue";
import { cn } from "@/lib/utils";

var props = defineProps({
  for: { type: String, required: false },
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
  <Label
    v-bind="delegatedProps"
    :class="
      cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        props.class
      )
    "
  >
    <slot />
  </Label>
</template>
