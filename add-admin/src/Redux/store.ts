import { configureStore, combineReducers } from "@reduxjs/toolkit";
import localforage from "localforage"; // Uses IndexedDB
import { persistReducer, persistStore } from "redux-persist";
import userProvider from "./slices/user-details";
import appProvider from "./slices/app-details";

const persistConfig = {
    key: "root",
    storage: localforage, 
    whitelist: ["user", "app"], 
};

const RootReducer = combineReducers({
    user: userProvider,
    app: appProvider,
});

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
