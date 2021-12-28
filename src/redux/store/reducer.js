import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  store: [],
  particularStoreProduct: [],
  loading: false,
};

const slice = createSlice({
  name: "store",
  initialState,
  reducers: {
    storeLoading: (data, action) => {
      data.loading = action.payload;
    },
    particularStoreProduct: (data, action) => {
      data.particularStoreProduct = action.payload;
    },
  },
});

export const { storeData, storeLoading, particularStoreProduct } = slice.actions;

export default slice.reducer;
