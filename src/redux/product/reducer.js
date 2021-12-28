import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsData: (data, action) => {
      data.products = action.payload;
    },
    productsLoading: (data, action) => {
      data.loading = action.payload;
    },
  },
});

export const { productsData, productsLoading } = slice.actions;

export default slice.reducer;
