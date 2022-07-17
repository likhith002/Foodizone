import { configureStore } from "@reduxjs/toolkit";
import basketslice from "./features/basketslice";
import restaurantSlice from "./features/restaurantSlice";
export const store = configureStore({
  reducer: { basket: basketslice, restaurant: restaurantSlice },
});
