import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./slices/searchSlice";
import toggleSlice from "./slices/toggleSlice"; 

export const store = configureStore({
  reducer: {
    searchQuery: searchSlice,
    theme: toggleSlice, 
  },
});
