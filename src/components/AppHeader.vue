<script setup>
import { inject } from "vue";
const emit = defineEmits(["cartToggle"]);

defineProps({
  totalPrice: Number,
});

let favorites = inject("favorites");
</script>

<template>
  <header
    class="flex items-center justify-between border-b border-slate-300 px-10 py-4"
  >
    <RouterLink to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" class="w-10" alt="logo" />
        <div class="">
          <h2 class="font-bold text-xl uppercase">Sneakers Shop</h2>
          <p class="text-slate-500">Магазин качественных кроссовок</p>
        </div>
      </div></RouterLink
    >

    <ul class="flex items-center gap-10">
      <li
        class="flex items-center gap-3 text-slate-700"
        @click="() => emit('cartToggle')"
      >
        <img src="/cart.svg" alt="cart" />
        <span
          class="font-semibold cursor-pointer border-b-2 border-b-transparent hover:border-b-black hover:border-b-2 hover:text-black"
          >{{ parseInt(totalPrice * 1.05) }} pуб.</span
        >
      </li>
      <router-link to="/favorites">
        <li class="flex items-center gap-1 text-slate-700">
          <img
            :src="favorites.length ? `/like-2.svg` : `/like-1.svg`"
            alt="cart"
          />
          <span
            class="font-[500] cursor-pointer border-b-2 border-b-transparent hover:border-b-black hover:border-b-2 hover:text-black"
            >Закладки</span
          >
        </li>
      </router-link>
      <li class="flex items-center gap-3 text-slate-700">
        <img src="/profile.svg" alt="cart" />
        <span
          class="font-[500] cursor-pointer border-b-2 border-b-transparent hover:border-b-black hover:border-b-2 hover:text-black"
          >Профиль</span
        >
      </li>
    </ul>
  </header>
</template>
