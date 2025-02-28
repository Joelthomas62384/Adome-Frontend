import { JSX } from "react"

export interface TenantFormType {
    name : string
    logo : string
    subdomain : string
    contact_email : string
    location : string
    description : string
    blog: boolean
    community : boolean
    newsletter : boolean
    courses : boolean
}


export type SidebarType = { id: string; name: string; link: string; icon: JSX.Element }



export type tenantType ={
 
    id:number | null
    name : string
    domain : string | null
    contact_email : string
    location : string
    description : string | null
    blog: boolean | null
    community: boolean | null
    newsletter: boolean | null
    admin? : number | null
    subscription_plan : string | null
    subdomain : string | null
    logo : string ,
    courses : boolean
    
}
