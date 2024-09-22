import { createSlice, Slice } from "@reduxjs/toolkit";

export const slice: Slice = createSlice({
  name: "app",
  initialState: {
    locale: null,
  },
  reducers: {
    setAppConfig: (state: any, { payload }) => {
      const { locale } = payload;
      state.locale = locale;
    },
  },
});
