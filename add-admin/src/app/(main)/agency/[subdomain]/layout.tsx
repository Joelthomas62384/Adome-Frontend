import BackdropGradient from '@/components/global/backdrop-gradiant'
import Sidebar from '@/components/global/sidebar'
import TenantProvider from '@/providers/tenant-provider'
import React from 'react'
// import LandingPageNavbar from './_components/navbar'

type Props = {}

const TenantsPage = ({children}: {children : React.ReactNode}) => {
  return (

    
    <div className=''>
      {/* <Sidebar /> */}
        {/* <LandingPageNavbar></LandingPageNavbar> */}
      <TenantProvider>

        {children}
      </TenantProvider>
        
    </div>
  )
}

export default TenantsPage