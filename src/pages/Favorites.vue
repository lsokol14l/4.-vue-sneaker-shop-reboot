<script setup>
import axios from "axios";
import { inject, onMounted, ref, watch } from "vue";
import CardList from "../components/CardList.vue";

let favorites = inject("favorites");

const loadFavorites = async () => {
  try {
    let response = await axios.get(`/favorites`);
    favorites.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

watch(favorites, async () => {
  await loadFavorites();
});
</script>

<template>
  <div v-if="favorites">
    <h2 class="text-2xl font-bold mb-10">Мои закладки:</h2>
    <card-list :items="favorites"></card-list>
  </div>
  <div
    v-if="favorites.length === 0"
    class="flex justify-center items-center text-2xl font-bold"
  >
    Ничего не найдено...
  </div>
</template>

<style scoped></style>
