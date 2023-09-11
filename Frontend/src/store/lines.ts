import { createSlice } from "@reduxjs/toolkit";

const initialLineState = { selectedLine: null };
const lineSlice = createSlice({
  name: "line",
  initialState: initialLineState,
  reducers: {
    selectLine(state, action) {
      state.selectedLine = action.payload;
    },
  },
});

export const lineActions = lineSlice.actions;

export default lineSlice.reducer;
