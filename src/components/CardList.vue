<template>
  <div class="grid grid-cols-4 gap-8" v-auto-animate>
    <sneaker-card
      :key="item.id"
      :id="item.id"
      v-for="item in items"
      :price="item.price"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :is-added="item.isAdded"
      :is-favorite="item.isFavorite"
      :amount="item.amount"
    ></sneaker-card>
  </div>
</template>

<script setup>
import SneakerCard from './SneakerCard.vue'

defineProps({
  items: Array
})
</script>

<style scoped></style>
