import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "theme",
  initialState: {
    dark: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.dark = !state.dark;
    },
  },
});

export const {toggleTheme} = toggleSlice.actions;
export default toggleSlice.reducer;