<script setup>
import DrawerCartHead from "./DrawerCartHead.vue";
import CartListItem from "./CartListItem.vue";
import { inject, computed } from "vue";
let cartToggle = inject("cartToggle");

const props = defineProps({
  totalPrice: Number,
  cartButtonDisabled: Boolean,
});



const emit = defineEmits([`createOrder`]);
</script>

<template>
  <div
    @click="cartToggle()"
    class="fixed top-0 left-0 h-full w-full bg-black opacity-25 z-10"
  ></div>
  <div class="bg-white w-96 h-full fixed z-20 top-0 right-0 p-8">
    <drawer-cart-head></drawer-cart-head>

    <cart-list-item></cart-list-item>

    <div class="mt-auto">
      <div class="flex p-2">
        <span class="font-semibold">Итого:</span>
        <div class="flex-1 border-dotted border-b-4"></div>
        <span class="font-bold">{{ totalPrice }} руб.</span>
      </div>

      <div class="flex p-2">
        <span class="font-semibold">Комиссия 5%:</span>
        <div class="flex-1 border-dotted border-b-4"></div>
        <span class="font-bold">{{ parseInt(totalPrice * 0.05) }} руб.</span>
      </div>

      <button
        :disabled="cartButtonDisabled"
        @click="
          () => {
            emit(`createOrder`);
          }
        "
        class="mt-4 bg-emerald-600 text-white w-full rounded-xl px-4 py-2.5 disabled:bg-slate-400 hover:bg-emerald-700 hover:text-slate-200 active:bg-emerald-800 transition cursor-pointer"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>

<style scoped></style>
