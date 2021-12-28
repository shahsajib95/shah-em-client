import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  loading: false,
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCToCartData: (data, action) => {
      data.cart = action.payload;
    },
    cartData: (data, action) => {
      data.cart = action.payload;
    },
    cartLoading: (data, action) => {
      data.loading = action.payload;
    },
  },
});

export const { cartData, cartLoading, addCToCartData } = slice.actions;

export default slice.reducer;
