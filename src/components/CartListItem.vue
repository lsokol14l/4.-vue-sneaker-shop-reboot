<script setup>
import { inject } from "vue";
import CartItem from "./CartItem.vue";
import InfoBlock from "./InfoBlock.vue";
let cartItems = inject(`cartItems`);
const props = defineProps({
  orderId: Number,
});
</script>

<template>
  <div class="flex flex-col gap-4 realative__heigth">
    <div
      v-if="!cartItems.length || props.orderId"
      class="h-full flex items-center"
    >
      <info-block
        v-if="!cartItems.length && !props.orderId"
        title="Ваша корзина пуста"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
        image-url="/package-icon.png"
      ></info-block>
      <info-block
        v-if="props.orderId"
        title="Ваш заказ оформлен!"
        :description="
          'Ваш заказ #' +
          props.orderId +
          ' скоро будет передан курьерской доставке.'
        "
        image-url="/order-success-icon.png"
      ></info-block>
    </div>

    <div class="flex flex-col gap-4" v-auto-animate v-else>
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
  </div>
</template>

<style scoped>
.realative__heigth {
  height: calc(100vh - 300px);
}
</style>
