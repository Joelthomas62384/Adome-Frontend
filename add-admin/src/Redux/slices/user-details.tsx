import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
    fullName: string
    email: string
    profilePic : string
    isLoggedIn: boolean
    appname : string
    isStaff : boolean
    isAdmin : boolean
}

const initialState: initialStateType = {
    fullName: '',
    email: '',
    profilePic : '',
    isLoggedIn: false,
    appname : '',
    isStaff : false,
    isAdmin : false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            return {
               ...state,
               ...action.payload,
            }
        },
        logout: (state) => {
            return {
               ...state,
                fullName: '',
                email: '',
                profilePic : '',
                isLoggedIn: false,
                appname : '',
                isStaff : false,
                isAdmin : false,
            }
        },
    },
})

export const { setUserData, logout } = userSlice.actions

export default userSlice.reducer