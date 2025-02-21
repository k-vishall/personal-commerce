import { configureStore } from '@reduxjs/toolkit';
import itemReducer from '../features/item/itemSlice';
import categoryReducer from '../features/category/categorySlice';
export const store = configureStore({
  reducer: {
    items: itemReducer,
    categories: categoryReducer,
  },
});
