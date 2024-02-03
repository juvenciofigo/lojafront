<script setup>
import "core-js/modules/es.array.concat.js";
import { Slot } from "radix-vue";
import { useFormField } from "./useFormField";

var _useFormField$Slot = useFormField();
</script>

<template>
  <Slot
    :id="formItemId"
    :aria-describedby="
      !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
    "
    :aria-invalid="!!error"
  >
    <slot />
  </Slot>
</template>
