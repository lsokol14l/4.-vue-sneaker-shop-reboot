<template>
  <div class="flex gap-4 items-center w-full border p-4 rounded-lg">
    <img class="w-16" :src="imageUrl" alt="" />
    <div class="flex w-full flex-col">
      <div class="flex justify-between">
        <div class="flex flex-col">
          <span class="">{{ title }} </span>
          <span class="font-bold">{{ price }} руб.</span>
        </div>
        <div class="w-16 h-16 items-center justify-center flex">
          <img
            @click="deleteItem(id)"
            class="opacity-50 hover:opacity-100 cursor-pointer transition"
            src="/close.svg"
            alt="delete__item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";

const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  amount: Number,
});

const deleteItem = inject(`deleteItem`);
</script>

<style scoped></style>
