<script setup>
import { onMounted, ref, watch, provide, reactive } from 'vue'
import axios from 'axios'

import AppHeader from './components/AppHeader.vue'
import CardList from './components/CardList.vue'
import DrawerCart from './components/DrawerCart.vue'

axios.defaults.baseURL = `http://localhost:3005`

let items = ref([])
let favorites = ref([])
const drawerToggle = ref(false)
const cartItems = ref([])

const search = reactive({
  sortBy: 'name',
  searchInput: ''
})

const loadFavorites = async () => {
  try {
    let response = await axios.get(`/favorites`)
    favorites.value = response.data
    //data: favorites == let { data } = await axios.get(`/favorites/all`)
    //let favorites = data
    // items.value = items.value.map((item) => {
    //   const favorite = favorites.find((favorite) => favorite.parentId === item.id)
    //   if (!favorite) {
    //     return item
    //   }
    //   return {
    //     ...item,
    //     isFavorite: true,
    //     favoriteId: favorite.id
    //   }
    // })
  } catch (error) {
    console.log(error)
  }
}

const loadItems = async () => {
  try {
    let response = await axios.get(`/items/all`)
    items.value = response.data
    //   .map((obj) => ({
    //   ...obj,
    //   isFavorite: false,
    //   isAdded: false
    // }))
  } catch (error) {
    console.log(error)
  }
}

const loadCart = async () => {
  try {
    let response = await axios.get(`/cart/all`)
    cartItems.value = response.data
    //   .map((obj) => ({
    //   ...obj,
    //   isFavorite: false,
    //   isAdded: false
    // }))
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await loadItems()
  await loadFavorites()
  await loadCart()
})

watch(search, async () => {
  try {
    let response = await axios.get(`/items/search`, {
      params: {
        sortBy: search.sortBy,
        searchInput: search.searchInput
      }
    })
    items.value = response.data
  } catch (error) {
    console.log(error)
  }
})

const addToFavorite = async (id) => {
  await axios.get(`/item/addToFavorite`, { params: { id: id } })

  await loadFavorites()
  await loadItems()
}

const addToCart = async (id) => {
  await axios.get(`/item/addToCart`, { params: { id: id } })

  await loadCart()
  await loadItems()
}

const cartToggle = () => {
  drawerToggle.value = !drawerToggle.value
}


provide(`addToFavorite`, addToFavorite)
provide(`cartToggle`, cartToggle)
provide(`addToCart`, addToCart)

provide(`cartItems`, cartItems)
</script>

<template>
  <DrawerCart v-if="drawerToggle" class="transition" />
  <div class="wrapper w-4/5 mx-auto bg-white rounded-t-xl shadow-xl mt-14">
    <app-header @cart-toggle="cartToggle"></app-header>

    <div class="p-10">
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
            <img
              class="absolute top-2.5 left-2.5"
              src="/search.svg"
              alt="search"
            />
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
    </div>
  </div>
</template>

<style scoped></style>
