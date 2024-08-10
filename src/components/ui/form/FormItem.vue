<script>
    import "core-js/modules/es.symbol.js";
    import "core-js/modules/es.symbol.description.js";
    import "core-js/modules/es.object.to-string.js";

    export var FORM_ITEM_INJECTION_KEY = Symbol();
</script>

<script setup>
    import _objectWithoutProperties from "@/../node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js";
    import { provide, useAttrs } from "vue";
    import { useId } from "radix-vue";
    import { cn } from "@/lib/utils";

    defineOptions({
        inheritAttrs: false,
    });

    var id = useId();
    provide(FORM_ITEM_INJECTION_KEY, id);

    var _useAttrs$cn = useAttrs();
</script>

<template>
    <div
        :class="cn('space-y-2', className ?? '')"
        v-bind="rest">
        <slot />
    </div>
</template>
