<script setup>
    import _objectWithoutProperties from "@/../node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js";
    var _excluded = ["class"];
    import { computed } from "vue";
    import { ToastClose } from "radix-vue";
    import { X } from "lucide-vue-next";
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
</script>

<template>
    <ToastClose
        v-bind="delegatedProps"
        :class="
            cn(
                'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-hidden focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
                props.class
            )
        ">
        <X class="h-4 w-4" />
    </ToastClose>
</template>
