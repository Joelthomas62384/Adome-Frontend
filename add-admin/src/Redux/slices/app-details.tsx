import { createSlice } from "@reduxjs/toolkit";



type initialStateType = {
    appname : string
    schemaName : string
    logo : string
}



const initialState: initialStateType = {
    appname : '',
    schemaName : '',
    logo : '',
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppInfo: (state, action) => {
            return {
               ...state,
               ...action.payload,
            }
        },
    },
})

export default appSlice.reducer

export const { setAppInfo } = appSlice.actions