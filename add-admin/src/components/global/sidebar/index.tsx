
"use client"

import React, { JSX, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Globe, Menu, User } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import MenuOptions from "./menubar-options"
import { useSelector } from "react-redux"
import { RootState } from "@/Redux/store"
import { SidebarType } from "@/types"
import { Dashboard, GlobeDuoToneBlack, HomeDuoToneWhite, PersonalDevelopment, Settings } from "@/components/forms/TenantForm/icons"


// type SidebarProps = {
//   sidebarLogo: string
//   menuItems: { id: string; name: string; link: string; icon: JSX.Element }[]
// }

const Sidebar = () => {
  // useEffect(() => {
  const {user} = useSelector((state:RootState)=>state.user)
    
  // }, [])
  // { id: string; name: string; link: string; icon: string }[]

  const menuItems: SidebarType[] = [
    { id: "1", name: "Dashboard", link: "/admin/", icon: <HomeDuoToneWhite />  },
    { id: "2", name: "Users", link: "/admin/users", icon:   <User color={'white'} /> , permission: "hasStaffPermission" },
    { id: "4", name: "Website Builder", link: "/admin/builder", icon:  <GlobeDuoToneBlack/> , permission : "hasBuilderPermission" },
    { id: "3", name: "Settings", link: "/admin/settings", icon:  <Settings/> , permission : "hasSettingPermission" },
  ]

  const menuFilter = (menuItems:SidebarType[]) => {
    console.log(user)
    return menuItems.filter((item) => {
      
      if (user?.is_admin) {
        return true; 
      }
  
      if (!item.permission) {
        return true; 
        
      }
  
      if (item.permission === "hasSettingPermission") {
        return user?.is_admin; 
      }
  
      return user[item.permission as keyof typeof user];
    });
  };
  

  const {tenant } = useSelector((state : RootState)=>state.app)



  
  return (
   <>
   <MenuOptions
   defaultOpen = {true}
   sidebarLogo = {tenant.logo}
   sidebarOpt = {menuFilter(menuItems)}
   
   />
   </>
  )
}

export default Sidebar