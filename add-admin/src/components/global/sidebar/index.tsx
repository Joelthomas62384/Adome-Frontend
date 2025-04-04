"use client"

import React from "react"
import { BookOpen, User } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/Redux/store"
import { SidebarType } from "@/types"
import MenuOptions from "./menubar-options"
import { GlobeDuoToneBlack, HomeDuoToneWhite, Settings } from "@/components/forms/TenantForm/icons"

const Sidebar = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const tenant = useSelector((state: RootState) => state.app.tenant)
  const menuItems: SidebarType[] = [
    { id: "1", name: "Dashboard", link: "/admin/", icon: <HomeDuoToneWhite /> },
    { id: "2", name: "Users", link: "/admin/users", icon: <User className="text-themeTextGray"/>, permission: "hasStaffPermission" },
    { id: "4", name: "Website Builder", link: "/admin/builder", icon: <GlobeDuoToneBlack />, permission: "hasBuilderPermission" },
    { id: "5", name: "Blog", link: "/admin/blog", icon: <BookOpen className="text-themeTextGray"  size={20}/>, permission: "hasSettingPermission" },
    { id: "3", name: "Settings", link: "/admin/settings", icon: <Settings />, permission: "hasSettingPermission" },
  ]

  const menuFilter = (menuItems: SidebarType[]) => {
    if (!user) return [] 

    return menuItems.filter((item) => {
      if (user.is_admin) return true
      if (!item.permission) return true
      return user[item.permission as keyof typeof user] ?? false
    })
  }

  return (
    <MenuOptions
      defaultOpen={true}
      sidebarLogo={tenant?.logo || "/default-logo.png"}
      sidebarOpt={menuFilter(menuItems)}
    />
  )
}

export default Sidebar
