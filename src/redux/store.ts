import { combineSlices, configureStore } from "@reduxjs/toolkit";
import tagReducer from "./features/tagSlice";
import userReducer from "./features/userSlice";
import toastReducer from "./features/toastSlice";
import navbarReducer from "./features/navbarSlice";
import snippetReducer from "./features/snippetSlice";
import { baseApi } from "./services/baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineSlices({
  tag: tagReducer,
  user: userReducer,
  toast: toastReducer,
  navbar: navbarReducer,
  snippet: snippetReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export const persistor = persistStore(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
