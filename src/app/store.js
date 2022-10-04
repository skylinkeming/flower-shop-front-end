import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "../features/client/clientSlice";
import counterReducer from "../features/counter/counterSlice";
import orderReducer from "../features/order/orderSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    order: orderReducer,
    client: clientReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
