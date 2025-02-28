"use client"
import axiosInstance from '@/axios/public-instance'
import { setAppInfo } from '@/Redux/slices/app-details'
import { setUserData } from '@/Redux/slices/user-details'
import { RootState } from '@/Redux/store'
import { notFound, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'typescript-cookie'


type Props = {
    children: React.ReactNode
}



const TenantAdminLoginCheck = ({ children }: Props) => {
    const router = useRouter()
    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    const { schemaName ,tenant } = useSelector((state: RootState) => state.app)
    const dispatch = useDispatch()
    

    useEffect(() => {
        // dispatch(setAppInfo({schemaName : getSubdomain()}))
        // getTenant()
        const exp = getCookie('expiry')
        if (!exp) {
            router.push('/login')
        }
        if (exp && !isLoggedIn) {
            dispatch(setUserData({ isLoggedIn: true }))
        }

        
    }, [])

    useEffect(()=>{
        console.log(tenant)
    },[tenant])

    return (
        <div>
          
            {children}
        </div>
    )
}

export default TenantAdminLoginCheck
