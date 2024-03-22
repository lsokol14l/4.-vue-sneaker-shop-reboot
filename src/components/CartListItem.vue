<template>
  <div class="flex flex-col gap-4 realative__heigth">
    <div v-if="cartItems.length">
      <cart-item
        :key="item.id"
        :id="item.id"
        v-for="item in cartItems"
        :price="item.price"
        :title="item.title"
        :imageUrl="item.imageUrl"
        :is-added="item.isAdded"
        :is-favorite="item.isFavorite"
        :amount="item.amount"
      ></cart-item>
    </div>
    <div class="text-center text-xl mt-4" v-else>Ваша корзина пуста...</div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

let cartItems = inject(`cartItems`)
</script>

<style scoped>
.realative__heigth {
  height: calc(100vh - 300px);
}
</style>