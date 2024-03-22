<template>
  <header
    class="flex items-center justify-between border-b border-slate-300 px-10 py-4"
  >
    <div class="flex items-center gap-4">
      <img src="/logo.png" class="w-10" alt="logo" />
      <div class="">
        <h2 class="font-bold text-xl uppercase">Sneakers Shop</h2>
        <p class="text-slate-500">Магазин качественных кроссовок</p>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <li
        class="flex items-center gap-3 text-slate-700"
        @click="() => emit('cartToggle')"
      >
        <img src="/cart.svg" alt="cart" />
        <span
          class="font-semibold cursor-pointer border-b-2 border-b-transparent hover:border-b-black hover:border-b-2 hover:text-black"
          >1205 pуб.</span
        >
      </li>
      <li class="flex items-center gap-3 text-slate-700" @click="cartToggle()">
        <img src="/heart.svg" alt="cart" />
        <span
          class="font-[500] cursor-pointer border-b-2 border-b-transparent hover:border-b-black hover:border-b-2 hover:text-black"
          >Закладки</span
        >
      </li>
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

<script setup>
const emit = defineEmits(["cartToggle"]);
</script>
