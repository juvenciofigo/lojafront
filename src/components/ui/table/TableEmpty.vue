<script setup>
    import _objectWithoutProperties from "@/../node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js";
    var _excluded = ["class"];
    import { computed } from "vue";
    import TableRow from "./TableRow.vue";
    import TableCell from "./TableCell.vue";
    import { cn } from "@/lib/utils";

    var props = defineProps({
        class: { type: null, required: false },
        colspan: { type: Number, required: false, default: 1 },
    });

    var delegatedProps = computed(function () {
        var _ = props["class"],
            delegated = _objectWithoutProperties(props, _excluded);

        return delegated;
    });
</script>

<template>
    <TableRow>
        <TableCell
            :class="cn('p-4 whitespace-nowrap align-middle text-sm text-foreground', props.class)"
            v-bind="delegatedProps">
            <div class="flex items-center justify-center py-10">
                <slot />
            </div>
        </TableCell>
    </TableRow>
</template>
