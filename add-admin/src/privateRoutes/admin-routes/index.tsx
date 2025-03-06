"use client"
import { RootState } from '@/Redux/store'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

type Props = {
    children: React.ReactNode,
    allowedRoles : string[]
}

const PrivateRoutes = ({children , allowedRoles}: Props) => {
    const {role} = useSelector((state:RootState)=>state.user)
    const router = useRouter()
    useEffect(()=>{
        if (role && !allowedRoles.includes(role) ) {
            router.push('/403')
        }
        console.log(role)
    },[role , router])
  return (
    <>
    {children}
    </>
  )
}

export default PrivateRoutes