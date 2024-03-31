<template>
  <div class="flex flex-col h-full">
          <HeaderPart />
          <hr />
          <router-view ></router-view>
          <SignaturePart class="p-6 text-start md:text-end" />
  </div>
</template>

<script setup>
  import HeaderPart from "@/components/partials/HeaderPart.vue";
  import SignaturePart from "@/components/partials/SignaturePart.vue";
</script>
