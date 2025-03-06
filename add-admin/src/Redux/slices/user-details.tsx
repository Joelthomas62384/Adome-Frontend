import { UserDetails } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { string } from "zod";

type initialStateType = {
    // fullName: string
    // email: string
    // profilePic : string
    // isLoggedIn: boolean
    // appname : string
    // isStaff : boolean
    // isAdmin : boolean
    user : UserDetails,
    isLoggedIn : boolean,
    role : string
}

const initialState: initialStateType = {
   user : {
    name : '',
    email : '',
    full_name : '',
    username : '',
    profile_pic : '',
    designation : '',
   },
    isLoggedIn : false,
    role: ''
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