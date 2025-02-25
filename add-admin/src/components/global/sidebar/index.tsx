import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
  

type Props = {}


const menus = [
  { name: "Dashboard", url: "/admin/", icon: "Home" },
  { name: "Users", url: "/admin/users", icon: "ViewList" },
  // { name: "Tenants", url: "/tenants", icon: "People" },
  { name: "Settings", url: "/admin/settings", icon: "Settings" },
  { name: "Logout", url: "/logout", icon: "Logout" },
]
const SideBarComponent = (props: Props) => {
  return (
    <Sidebar className='bg-themeBlack'>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>menus</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {menus.map((menu) => (
              <SidebarMenuItem key={menu.name}>
                <SidebarMenuButton asChild>
                  <a href={menu.url}>
                    <menu.icon />
                    <span>{menu.name}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  

  )
}

export default SideBarComponent