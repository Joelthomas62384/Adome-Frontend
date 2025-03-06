import BlurPage from '@/components/backgrou-blur'
import BackdropGradient from '@/components/global/backdrop-gradiant'
import InfoBar from '@/components/global/infobar'
import Sidebar from '@/components/global/sidebar'
import SideBarComponent from '@/components/global/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import PrivateRoutes from '@/privateRoutes/admin-routes'
import TenantAdminLoginCheck from '@/providers/tenant-admin-login-provider'
import React from 'react'
// import LandingPageNavbar from './_components/navbar'

type Props = {}

const TenantsAdminLayout = ({children}: {children : React.ReactNode}) => {
  return (

    

    <TenantAdminLoginCheck>

      <div className='h-screen overflow-hidden'>
      <Sidebar />
      <div className="md:pl-[300px]">
        <InfoBar
          
          />
        <div className="relative">
          <PrivateRoutes allowedRoles={['staff' , 'admin']}>

          <BlurPage>{children}</BlurPage>

          </PrivateRoutes>
        </div>
      </div>
      </div>
</TenantAdminLoginCheck>
        
  )
}

export default TenantsAdminLayout