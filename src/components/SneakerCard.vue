<template>
  <div
    class="card bg-white relative border border-slate-100 rounded-xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
  >
    <img
      class="absolute top-4 left-4"
      :src="isFavorite ? '/like-2.svg' : 'like-1.svg'"
      alt="Add to favorites"
      @click="onClickFavorite()"
    />
    <img :src="imageUrl" alt="" />
    <p class="mt-2 h-12">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-500">Цена:</span>
        <span class="font-bold">{{ price }} руб.</span>
      </div>

      <img @click="onClickAdd()" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="addToCart" />
    </div>
  </div>
</template>

<script setup>

import { inject } from 'vue'

const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  amount: Number
})

let addToFavorite = inject(`addToFavorite`)
let addToCart = inject(`addToCart`) 

const onClickFavorite = () => {
  const id = props.id

  addToFavorite(id)
}

const onClickAdd = () => {
  const id = props.id

  addToCart(id)
}
</script>

<style scoped></style>
