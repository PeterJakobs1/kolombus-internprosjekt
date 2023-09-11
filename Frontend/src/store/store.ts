import { configureStore } from "@reduxjs/toolkit";
import stationReducer from "./station";
import platformReducer from "./platform";
import lineReducer from "./lines";

const store = configureStore({
  reducer: {
    station: stationReducer,
    platform: platformReducer,
    lines: lineReducer,
  },
});

export default store;
