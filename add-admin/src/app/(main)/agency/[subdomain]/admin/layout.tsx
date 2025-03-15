"use client"

import { usePathname } from "next/navigation"
import BlurPage from '@/components/backgrou-blur'
import InfoBar from '@/components/global/infobar'
import Sidebar from '@/components/global/sidebar'
import PrivateRoutes from '@/privateRoutes/admin-routes'
import TenantAdminLoginCheck from '@/providers/tenant-admin-login-provider'
import React from 'react'
// import "@/styles/grapes.css"

const TenantsAdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  const isWebsiteBuilder = pathname.startsWith("/admin/builder/")

  return (
    <TenantAdminLoginCheck>
      <PrivateRoutes allowedRoles={['staff', 'admin']}>
        <div className='h-screen overflow-hidden'>

          {!isWebsiteBuilder && <Sidebar />}
          
          <div className={isWebsiteBuilder ? "w-full" : "md:pl-[300px]"}>
            {!isWebsiteBuilder && <InfoBar />}

            <div className="relative">
              {isWebsiteBuilder ? children : <BlurPage>{children}</BlurPage>}
            </div>
          </div>

        </div>
      </PrivateRoutes>
    </TenantAdminLoginCheck>
  )
}

export default TenantsAdminLayout
