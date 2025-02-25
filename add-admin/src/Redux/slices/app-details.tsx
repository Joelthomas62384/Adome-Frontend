import { createSlice } from "@reduxjs/toolkit";



type initialStateType = {
    appname : string
    schemaName : string
    logo : string
    appDetails : any
}



const initialState: initialStateType = {
    appname : 'public',
    schemaName : 'public',
    logo : '',
    appDetails : null
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