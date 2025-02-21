import { createSlice } from "@reduxjs/toolkit";

const categoryData = [
  { id: 1, name: "Electronics", desc: "Latest gadgets and devices" },
  { id: 2, name: "Fashion", desc: "Clothing, shoes, and accessories" },
  { id: 3, name: "Home & Kitchen", desc: "Furniture, appliances, and decor" },
  { id: 4, name: "Beauty & Personal Care", desc: "Cosmetics and skincare products" },
  { id: 5, name: "Health & Wellness", desc: "Supplements, fitness, and medical equipment" },
  { id: 6, name: "Toys & Games", desc: "Entertainment for kids and adults" },
  { id: 7, name: "Automotive", desc: "Car accessories and tools" },
];

const emptyCategory = {
  id: 0,
  name: "",
  desc: "",
};

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: categoryData,
    currentCategory: emptyCategory,
  },
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      const { id, newCategory } = action.payload;
      state.categories = state.categories.map((category) =>
        category.id === id ? { ...category, ...newCategory } : category
      );
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
    resetCurrentCategory: (state) => {
      state.currentCategory = emptyCategory;
    },
  },
});

export const {
  addCategory,
  updateCategory,
  removeCategory,
  setCurrentCategory,
  resetCurrentCategory,
} = categorySlice.actions;
export default categorySlice.reducer;
