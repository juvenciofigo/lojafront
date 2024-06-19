<template>
  <div class="flex flex-col h-full">
          <HeaderPart />
          <router-view ></router-view>
          <SignaturePart class="p-2" />
  </div>
</template>

<script setup>
  import HeaderPart from "@/components/partials/HeaderPart.vue";
  import SignaturePart from "@/components/partials/SignaturePart.vue";
</script>
