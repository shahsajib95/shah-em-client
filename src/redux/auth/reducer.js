import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: '',
  loading: false
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userData: (data, action) => {
      data.user = action.payload.user;
      data.token = action.payload.token;
    },
    userLoading: (data, action) => {
      data.loading = action.payload;
    },
  },
});

export const { userData, userLoading } = slice.actions;

export default slice.reducer;
