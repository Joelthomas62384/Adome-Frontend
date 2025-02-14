"use client"

import { configureStore , combineReducers } from "@reduxjs/toolkit"
import userProivder from "./slices/user-details"
import appProvider from "./slices/app-details"

const RootReducer = combineReducers({
    user: userProivder,
    app: appProvider,
})


export const store = configureStore({
    reducer : RootReducer
})


export type RootState = ReturnType<typeof RootReducer>
export type AppDispatch = typeof store.dispatch