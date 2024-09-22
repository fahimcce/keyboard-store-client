import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./features/productSlice";
import { baseApi } from "./api/baseApi";
import cartReducer from "./features/cartSlice"; // Use cartReducer

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    products: productReducer,
    cart: cartReducer, // Make sure this matches your cart slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
