import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
  loading: false,
};

const slice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderData: (data, action) => {
      data.order = action.payload;
    },
    orderLoading: (data, action) => {
      data.loading = action.payload;
    },
  },
});

export const { orderData, orderLoading } = slice.actions;

export default slice.reducer;
