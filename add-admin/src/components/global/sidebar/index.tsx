"use client"

import React, { JSX, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, User } from "lucide-react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"
import MenuOptions from "./menubar-options"
import { useSelector } from "react-redux"
import { RootState } from "@/Redux/store"
import { SidebarType } from "@/types"
import { Dashboard, HomeDuoToneWhite, PersonalDevelopment, Settings } from "@/components/forms/TenantForm/icons"


// type SidebarProps = {
//   sidebarLogo: string
//   menuItems: { id: string; name: string; link: string; icon: JSX.Element }[]
// }

const Sidebar = () => {
  // useEffect(() => {
    
  // }, [])
  // { id: string; name: string; link: string; icon: string }[]

  const menuItems: SidebarType[] = [
    { id: "1", name: "Dashboard", link: "/admin/", icon: <HomeDuoToneWhite />  },
    { id: "2", name: "Users", link: "/admin/users", icon:   <User color={'white'} />  },
    { id: "3", name: "Settings", link: "/admin/settings", icon:  <Settings/>  },
  ]

  const {tenant } = useSelector((state : RootState)=>state.app)



  
  return (
   <>
   <MenuOptions
   defaultOpen = {true}
   sidebarLogo = {tenant.logo}
   sidebarOpt = {menuItems}
   
   />
   </>
  )
}

export default Sidebar
