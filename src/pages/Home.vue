<script setup>
import { inject, reactive, watch } from "vue";
import CardList from "../components/CardList.vue";
import axios from "axios";

const search = inject('search')

const items  = inject(`items`)

</script>
<template>
  <div class="flex justify-between mb-8">
    <h2 class="text-2xl font-bold">Все кроссовки:</h2>

    <div class="flex items-center gap-5">
      <select
        v-model="search.sortBy"
        class="py-1.5 px-3.5 border rounded-md outline-none bg-white"
        name=""
        id=""
      >
        <option value="name">По названию</option>
        <option value="cheaper">По цене (сначала дешёвые)</option>
        <option value="rich">По цене (сначала дорогие)</option>
      </select>

      <div class="relative">
        <img class="absolute top-2.5 left-2.5" src="/search.svg" alt="search" />
        <input
          v-model="search.searchInput"
          class="transition border rounded-md py-1 px-3 pl-8 pr-4 outline-none focus:border-gray-400"
          type="text"
          name=""
          id=""
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>
  <div v-if="items" class="mt-10">
    <card-list :items="items"></card-list>
  </div>
  <div
    v-if="items.length === 0"
    class="mt-10 flex justify-center items-center text-2xl font-bold"
  >
    Ничего не найдено...
  </div>
</template>

<style scoped></style>
