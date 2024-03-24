<script setup>
//Обычные импорты
import { onMounted, ref, provide, computed, reactive, watch } from "vue";
import axios from "axios";
import AppHeader from "./components/AppHeader.vue";
import DrawerCart from "./components/DrawerCart.vue";
import debounce from "lodash.debounce";
axios.defaults.baseURL = `http://localhost:3005`;

//Объявление глобальных переменных
const search = reactive({
  sortBy: "name",
  searchInput: "",
});

let favorites = ref([]);
let items = ref([]);

// Корзина (start)

const drawerToggle = ref(false);
const cartItems = ref([]);
let totalPrice = ref(0);

//Объявление функций(смотри на название)
const addToCart = async (id) => {
  let response = await axios.get(`/item/addToCart`, { params: { id: id } });

  await loadCart();
  await loadItems();
  await loadFavorites();

  countTotalPrice();
};
const cartToggle = () => {
  drawerToggle.value = !drawerToggle.value;
};
const deleteFromCart = async (id) => {
  let response = await axios.get(`/item/deleteFromCart`, {
    params: { id: id },
  });

  await loadCart();
  await loadItems();
  await loadFavorites();

  countTotalPrice();
};

const refresh = async () => {
  try {
    let response = await axios.post(`/refresh`, { items: cartItems.value });
  } catch (err) {
    console.log(err);
  }
  loadData();
  cartItems.value = [];
};
const countTotalPrice = () => {
  totalPrice.value = 0;
  for (let i = 0; i < cartItems.value.length; i++) {
    let item = cartItems.value[i];
    let currentSum = item.amount * item.price;
    totalPrice.value += currentSum;
  }
};
const loadCart = async () => {
  try {
    let response = await axios.get(`/cart/all`);
    cartItems.value = response.data;
    //   .map((obj) => ({
    //   ...obj,
    //   isFavorite: false,
    //   isAdded: false
    // }))
  } catch (error) {
    console.log(error);
  }
};

// корзинa (end)

//Запросы данных с бд (start)
const loadFavorites = async () => {
  try {
    let response = await axios.get(`/favorites`);
    favorites.value = response.data;
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
    console.log(error);
  }
};
const addToFavorite = async (id) => {
  await axios.get(`/item/addToFavorite`, { params: { id: id } });

  await loadFavorites();
  await loadItems();
};
const loadItems = async () => {
  try {
    let response = await axios.get(`/items/search`, {
      params: {
        sortBy: search.sortBy,
        searchInput: search.searchInput,
      },
    });
    items.value = response.data;
    //   .map((obj) => ({
    //   ...obj,
    //   isFavorite: false,
    //   isAdded: false
    // }))
  } catch (error) {
    console.log(error);
  }
};
watch(
  search,
  debounce(async () => {
    await loadItems();
  }, 250)
);
const loadData = async () => {
  await loadItems();
  await loadFavorites();
  await loadCart();
  countTotalPrice();
};
onMounted(loadData);
//Запросы данных с бд (end)

//передача в дочерние элементы
provide(`search`, search);
provide(`items`, items);
provide(`addToFavorite`, addToFavorite);
provide(`cartToggle`, cartToggle);
provide(`addToCart`, addToCart);
provide(`deleteFromCart`, deleteFromCart);
provide(`cartItems`, cartItems);
provide(`loadData`, loadData);
provide(`favorites`, favorites);
provide(`refresh`, refresh);
</script>

<template>
  <DrawerCart
    v-if="drawerToggle"
    :total-price="totalPrice"
    :cart-items="cartItems"
  />
  <div class="wrapper w-4/5 mx-auto bg-white rounded-t-xl shadow-xl mt-14">
    <app-header
      :total-price="totalPrice"
      @cart-toggle="cartToggle"
    ></app-header>

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
