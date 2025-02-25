import BackdropGradient from '@/components/global/backdrop-gradiant'
import SideBarComponent from '@/components/global/sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import TenantAdminLoginCheck from '@/providers/tenant-admin-provider/admin-login-check'
import React from 'react'
// import LandingPageNavbar from './_components/navbar'

type Props = {}

const TenantsAdminLayout = ({children}: {children : React.ReactNode}) => {
  return (

    
    <div className=''>

<TenantAdminLoginCheck>
  <SidebarProvider>
    <SideBarComponent />
    <BackdropGradient>


        {children}
    </BackdropGradient>
  </SidebarProvider>
</TenantAdminLoginCheck>
        {/* <LandingPageNavbar></LandingPageNavbar> */}
        
    </div>
  )
}

export default TenantsAdminLayout