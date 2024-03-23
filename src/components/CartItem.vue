<template>
  <div class="flex gap-4 items-center w-full border p-4 rounded-lg">
    <img class="w-16" :src="imageUrl" alt="" />
    <div class="flex w-full flex-col">
      <div class="flex justify-between">
        <div class="flex flex-col">
          <span class="">{{ title }} </span>
          <span class="font-bold">{{ price }}р. x {{ amount }}</span>
        </div>
        <div class="w-20 h-16 items-end mt-3 mx-2 justify-center flex gap-2">
          <img
            @click="deleteFromCart(id)"
            class="w-6 cursor-pointer transition"
            src="/close.svg"
            alt="delete__item"
          />

          <div class="text-center text-xl">{{ amount }}</div>
          
          <img
            @click="addToCart(id)"
            class="w-6 cursor-pointer transition"
            src="/plus.svg"
            alt="add__item"
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

const deleteFromCart = inject(`deleteFromCart`);
const addToCart = inject(`addToCart`);
</script>

<style scoped></style>
