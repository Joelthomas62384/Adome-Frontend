"use client"
import { setAppInfo } from '@/Redux/slices/app-details'
import { setUserData } from '@/Redux/slices/user-details'
import { RootState } from '@/Redux/store'
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


const LoginCheck = ({ children }: Props) => {
    const { isLoggedIn } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAppInfo({schemaName : getSubdomain()}))

        const exp = getCookie('expiry')
        if (exp && !isLoggedIn) {
            dispatch(setUserData({ isLoggedIn: true }))
        }
    }, [])

    return (
        <div>
          
            {children}
        </div>
    )
}

export default LoginCheck
