import { JSX } from "react"

export interface TenantFormType {
    name: string;
    logo?: string;         
    subdomain: string;
    contact_email: string;
    location: string;
    description?: string; 
    blog?: boolean;        
    community?: boolean;   
    newsletter?: boolean;  
    courses?: boolean;     
}

export type SidebarType = {
     id: string;
     name: string;
     link: string; 
     icon: JSX.Element
     permission? : "hasStaffPermission" | "hasSettingPermission" | "hasBuilderPermission" | "hasBlogPermission" | "hasCommunityPermission" | "hasNewsletterPermission" | "hasCoursesPermission"
 }
//  hasStaffPermission: false,
//  hasBlogPermission: false,
//  hasCommunityPermission: false,
//  hasNewsletterPermission: false,
//  hasCoursesPermission: false,
//  hasBuilderPermission : false
export type tenantType = {
    id: number | null;
    name: string;
    domain: string | null;
    contact_email: string;
    location: string;
    description: string | null;
    blog: boolean | null;
    community: boolean | null;
    newsletter: boolean | null;
    admin?: number | null;
    subscription_plan: string | null;
    subdomain: string | null;
    logo: string; 
    courses: boolean;
};



export type UserDetails ={
    email : string
    full_name : string
    username : string
    profile_pic : string
}


export type UsersType = {
    user : UserDetails
    role : string
    tenant: number
    blocked : boolean
    banned : boolean
    created_at : string
    designation : string
    id : number
    is_staff : boolean
    is_admin : boolean
    hasStaffPermission: boolean
    hasBlogPermission: boolean
    hasCommunityPermission: boolean
    hasNewsletterPermission: boolean
    hasCoursesPermission: boolean
    hasBuilderPermission : boolean

    
}


export type staffPermission = {
    hasStaffPermission: boolean
    hasBlogPermission: boolean
    hasCommunityPermission: boolean
    hasNewsletterPermission: boolean
    hasCoursesPermission: boolean
    designation: string
    is_staff: boolean
}

export type Role = "user" | "admin" | "staff";
