"use client"
import axiosInstance from '@/axios/public-instance'
import LoadingPage from '@/components/global/loading-page'
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
    const {     tenant } = useSelector((state: RootState) => state.app)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)    

    const exp = getCookie('expiry')
    useEffect(() => {
        // dispatch(setAppInfo({schemaName : getSubdomain()}))
        // getTenant()
        if (exp && isLoggedIn){
            setLoading(false)
            
        }
        if (!exp) {
            router.push('/login')
        }
        if (exp && !isLoggedIn) {
            dispatch(setUserData({ isLoggedIn: true }))
        }

        
    }, [exp , isLoggedIn])



    return (
        <div>
          {
            loading ? <LoadingPage /> : children
          }
        </div>
    )
}

export default TenantAdminLoginCheck
