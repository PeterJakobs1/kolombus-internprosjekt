import { createSlice } from "@reduxjs/toolkit";

const initialStationState = { selectedStation: null };

const stationSlice = createSlice({
  name: "station",
  initialState: initialStationState,
  reducers: {
    selectStation(state, action) {
      state.selectedStation = action.payload;
    },
  },
});

export const stationActions = stationSlice.actions;

export default stationSlice.reducer;
