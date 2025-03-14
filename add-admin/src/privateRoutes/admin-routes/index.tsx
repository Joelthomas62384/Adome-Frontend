"use client"
import LoadingPage from '@/components/global/loading-page'
import { RootState } from '@/Redux/store'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

type Props = {
    children: React.ReactNode,
    allowedRoles : string[]
}

const PrivateRoutes = ({children , allowedRoles}: Props) => {
    const {user} = useSelector((state:RootState)=>state.user)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    useEffect(()=>{
      if (user===null){
        router.push('/login')
      }
        if (user.role && !allowedRoles.includes(user.role) ) {
            router.push('/403')
        }else{
          setLoading(false)
        }
        console.log(user.role)
    },[user , router])
  return (
    <>
    {loading ? (
      <LoadingPage />
    ) : children}
    </>
  )
}

export default PrivateRoutes