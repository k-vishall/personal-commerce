import { createSlice } from "@reduxjs/toolkit";
import { ItemModel } from "@/models/itemModel";

const itemData = [
  {
    id: 1,
    name: "Sweet Corns Delight",
    desc: "A combination of juicy Sweet Corns & Cheese",
    price: 199,
    discPercent: 20,
    discAmount: 50,
    netPrice: 149,
    category: "Pizza",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1679924471066-dd984e92f395?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.2,
  },
  {
    id: 2,
    name: "Cheezy-7 Pizza",
    desc: "An Exotic Combination of White Mozzarilla, Cream White Cheese, Cheddar, Monterey Jack, Cream Orange Cheese",
    price: 299,
    discPercent: 15,
    discAmount: 45,
    netPrice: 254,
    category: "Pizza",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1679924471091-f7cd7ad90ddf?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Burn To Hell Pizza",
    desc: "A fiery and lethal combination of hot & garlic dip, jalapenos, mushrooms, olives and capsicum",
    price: 249,
    discPercent: 10,
    discAmount: 25,
    netPrice: 224,
    category: "Pizza",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1679518412057-6b833a64b143?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D",
    rating: 4.0,
  },
  {
    id: 4,
    name: "Farm Villa Pizza",
    desc: "The freshness of capsicum, tomatoes, with the flavour of paneer and red paprika topped with",
    price: 300,
    discPercent: 10,
    discAmount: 30,
    netPrice: 270,
    category: "Pizza",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1679518411900-25b15c1f074a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
    rating: 4.0,
  },
];

const itemSlice = createSlice({
  name: "items",
  initialState: {
    items: itemData.map((item) => ({ ...ItemModel, ...item })),
    currentItem: { ...ItemModel },
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push({ ...ItemModel, ...action.payload });
      console.log(JSON.stringify(state.items));
    },
    updateItem: (state, action) => {
      const { id, newItem } = action.payload;
      console.log(`Updating item with id ${id}:`, JSON.stringify(newItem));
      state.items = state.items.map((item) =>
        item.id === id ? { ...item, ...newItem } : item
      );
      console.log(JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      console.log(JSON.stringify(state.items));
    },
    setCurrentItem: (state, action) => {
      state.currentItem = { ...ItemModel, ...action.payload };
    },
    resetCurrentItem: (state) => {
      state.currentItem = { ...ItemModel };
    },
  },
});

export const {
  addItem,
  updateItem,
  removeItem,
  setCurrentItem,
  resetCurrentItem,
} = itemSlice.actions;
export default itemSlice.reducer;
