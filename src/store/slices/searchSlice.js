import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchQuery",
  initialState: "",
  reducers: {
    setSearchQuery(state, action) {
      return action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { setSearchQuery } = searchSlice.actions;
