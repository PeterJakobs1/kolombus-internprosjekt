import { createSlice } from "@reduxjs/toolkit";

const initialPlatformState = { selectedPlatform: null };

const platformSlice = createSlice({
  name: "platform",
  initialState: initialPlatformState,
  reducers: {
    selectPlatform(state, action) {
      state.selectedPlatform = action.payload;
    },
  },
});

export const platformActions = platformSlice.actions;

export default platformSlice.reducer;
