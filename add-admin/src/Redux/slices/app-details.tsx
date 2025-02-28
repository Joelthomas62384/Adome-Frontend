import { tenantType } from "@/types";
import { createSlice } from "@reduxjs/toolkit";



type initialStateType = {
    appname : string
    schemaName : string
    logo : string
    tenant : tenantType
}



const initialState: initialStateType = {
    appname : 'public',
    schemaName : 'public',
    logo : '',
    tenant : {
    //    "id": 2,
    // "name": "Brototype",
    // "domain": null,
    // "contact_email": "joel@codewithjoe.in",
    // "location": "Kerala, India",
    // "description": "This is the best",
    // "blog": true,
    // "community": false,
    // "newsletter": false,
    // "admin": 2,
    // "subscription_plan": "1",
    // "subdomain": "brototype",
    // "logo": "http://localhost/media/logos/brototype_logo.png"
    id : null,
    name : '',
    domain : null,
    contact_email : '',
    location : '',
    description : '',
    blog : false,
    community : false,
    newsletter : false,
    logo : '',
    subscription_plan : '',
    subdomain : '',
    courses : false,
    
    
    }
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