"use client"
import axiosInstance from '@/axios/public-instance'
import { setAppInfo } from '@/Redux/slices/app-details'
import { setUserData } from '@/Redux/slices/user-details'
import { RootState } from '@/Redux/store'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'typescript-cookie'


type Props = {
    children: React.ReactNode
}

const getSubdomain = (): string => {
  if (typeof window !== "undefined") {
      const hostname = window.location.hostname; 
      const parts = hostname.split(".");

      const localhostIndex = parts.indexOf("localhost");
      if (localhostIndex > 0) {
          return parts.slice(0, localhostIndex).join("."); 
      }
  }
  return "public"; 
};


const TenantAdminLoginCheck = ({ children }: Props) => {
    const router = useRouter()
    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    const { schemaName ,appDetails } = useSelector((state: RootState) => state.app)
    const dispatch = useDispatch()
    const getTenant = async ()=>{
        const response = await axiosInstance.get(`tenant/${getSubdomain()}/tenant`)
        console.log(response)
        if (response.status === 200) {
            dispatch(setAppInfo({tenant : response.data}))
            console.log(response.data)
        } else {
            router.push('/login')
        }
        
    }

    useEffect(() => {
        // dispatch(setAppInfo({schemaName : getSubdomain()}))
        getTenant()
        const exp = getCookie('expiry')
        if (!exp) {
            router.push('/login')
        }
        if (exp && !isLoggedIn) {
            dispatch(setUserData({ isLoggedIn: true }))
        }

        
    }, [])

    useEffect(()=>{
        console.log(appDetails)
    },[appDetails])

    return (
        <div>
          
            {children}
        </div>
    )
}

export default TenantAdminLoginCheck
