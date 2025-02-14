"use client"
import { setUserData } from '@/Redux/slices/user-details'
import { RootState } from '@/Redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'typescript-cookie'

type Props = {
    children: React.ReactNode

}

const LoginCheck = ({children}: Props) => {
    const {isLoggedIn } = useSelector((state:RootState)=>state.user)
    const dispatch = useDispatch()
    useEffect(() => {
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