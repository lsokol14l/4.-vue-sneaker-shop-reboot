import express from "express";
// import dayjs from 'dayjs'
import mongoose from "mongoose";
import cors from "cors";

let app = express();
let port = 3005;

app.listen(port, function () {
  console.log(`server is running: http://localhost:${port}`);
});

app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

mongoose.connect(`mongodb://127.0.0.1:27017/sneakers-shop`);

let sneakersSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  id: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  amount: Number,
});

let Sneaker = mongoose.model("item", sneakersSchema);

app.get(`/items/all`, async (_req, res) => {
  let response = await Sneaker.find();
  res.send(response);
});

app.get(`/items/search`, async (req, res) => {
  let { sortBy, searchInput } = req.query;

  if (!searchInput) {
    searchInput = "";
  }

  let response;
  if (sortBy == "name") {
    try {
      response = await Sneaker.find({
        title: { $regex: searchInput, $options: "i" },
      }).sort({
        title: 1,
      });
    } catch (error) {
      response = {};
    }
  } else if (sortBy == "cheaper") {
    try {
      response = await Sneaker.find({
        title: { $regex: searchInput, $options: "i" },
      }).sort({
        price: 1,
      });
    } catch (error) {
      response = {};
    }
  } else if (sortBy == "rich") {
    try {
      response = await Sneaker.find({
        title: { $regex: searchInput, $options: "i" },
      }).sort({
        price: -1,
      });
    } catch (error) {
      response = {};
    }
  }
  res.send(response);
});

app.get(`/favorites`, async (req, res) => {
  let response = await Sneaker.find({ isFavorite: true });
  res.send(response);
});

app.get(`/item/addToFavorite`, async (req, res) => {
  let { id } = req.query;
  let item = await Sneaker.findOne({ _id: id });

  item.isFavorite = !item.isFavorite;

  await item.save();
  res.send(item);
});

app.get(`/cart/all`, async (req, res) => {
  let response = await Sneaker.find({ isAdded: true });
  res.send(response);
});
