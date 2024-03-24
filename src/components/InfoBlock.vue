<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String,
});
</script>

<template>
  <div class="flex text-center flex-col items-center max-w-[288px] mx-auto">
    <img class="w-[80px] h-[80px]" :src="imageUrl" alt="information_img" />
    <h2 class="mt-4 text-2xl font-semibold">{{ title }}</h2>
    <p class="text-gray-500">{{ description }}</p>
  </div>
</template>

<style lang="scss" scoped></style>
