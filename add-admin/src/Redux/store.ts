"use client"

import { configureStore , combineReducers } from "@reduxjs/toolkit"


const RootReducer = combineReducers({

})


export const store = configureStore({
    reducer : RootReducer
})


export type RootState = ReturnType<typeof RootReducer>
export type AppDispatch = typeof store.dispatch