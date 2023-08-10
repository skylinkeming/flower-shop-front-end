import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "../features/client/clientSlice";
import orderReducer from "../features/order/orderSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    client: clientReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
