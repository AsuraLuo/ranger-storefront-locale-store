import { createSlice, Slice } from "@reduxjs/toolkit";

const initialState: any = {
  cartId: null,
  cartDetail: null,
  loading: false,
};

export const slice: Slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartId: (state: any, { payload }) => {
      state.cartId = payload;
    },
    setCartDetail: (state: any, { payload }) => {
      state.cartId = payload.id;
      state.cartDetail = payload;
      state.loading = false;
    },
    setLoading: (state: any, { payload }) => {
      state.loading = payload;
    },
    setInitialState: () => initialState,
  },
});
