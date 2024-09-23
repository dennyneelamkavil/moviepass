import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "../auth/authSlice";
import storage from "redux-persist/lib/storage";
import { userApi } from "../api/userApiSlice";
import { theaterApi } from "../api/theaterSlice";
import { movieApi } from "../api/movieSlice";
import { showtimeApi } from "../api/showtimeSlice";
import { bookingApi } from "../api/bookingSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  [userApi.reducerPath]: userApi.reducer,
  [theaterApi.reducerPath]: theaterApi.reducer,
  [movieApi.reducerPath]: movieApi.reducer,
  [showtimeApi.reducerPath]: showtimeApi.reducer,
  [bookingApi.reducerPath]: bookingApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(userApi.middleware)
      .concat(theaterApi.middleware)
      .concat(movieApi.middleware)
      .concat(showtimeApi.middleware)
      .concat(bookingApi.middleware),
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
