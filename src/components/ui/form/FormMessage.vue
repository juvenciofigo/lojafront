<script setup>
import "core-js/modules/es.function.name.js";
import { ErrorMessage } from "vee-validate";
import { toValue } from "vue";
import { useFormField } from "./useFormField";

var _useFormField$ErrorMe = useFormField();
</script>

<template>
  <ErrorMessage
    :id="formMessageId"
    as="p"
    :name="toValue(name)"
    class="text-sm font-medium text-destructive"
  />
</template>
