import { UserDetails, UsersType } from "@/types";
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
    user : UsersType,
    isLoggedIn : boolean,
}

const initialState: initialStateType = {
   user : {
    user : {
        email : '',
        full_name : '',
        username : '',
        profile_pic : '',
    },
    role : "",
    tenant: 0,
    blocked : false,
    banned : false,
    created_at : '',
    designation : '',
    id : 0,
    is_staff : false,
    is_admin : false,
    hasStaffPermission: false,
    hasBlogPermission: false,
    hasCommunityPermission: false,
    hasNewsletterPermission: false,
    hasCoursesPermission: false,
    hasBuilderPermission : false
   },
   isLoggedIn : false,

   

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