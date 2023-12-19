import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  initialState,
  name: "counter",
  reducers: {
    inc: (state) => {
      state.count += 1;
    },
    dec: (state) => {
      state.count -= 1;
    },
  },
});

export const counterSliceReducer = counterSlice.reducer;
export const counterSliceActions = counterSlice.actions;
