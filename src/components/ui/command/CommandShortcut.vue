<script setup>
    var _$attrs$class;
    import { cn } from "@/lib/utils";
</script>

<template>
    <span :class="cn('ml-auto  tracking-widest text-muted-foreground', $attrs.class ?? '')">
        <slot />
    </span>
</template>
