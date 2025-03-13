"use client"

import React, { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { LucideBell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import axiosInstance from '@/axios/public-instance'
import { useMutation } from '@tanstack/react-query'
import { getSubdomain, getTwoLetters } from '@/constants'
import { removeCookie } from 'typescript-cookie'
import { useSelector } from 'react-redux'
import { RootState } from '@/Redux/store'


type Props = {
    className? : string
}

const InfoBar = ({className}: Props) => {

  const {user} = useSelector((state:RootState)=>state.user)
  const [fallBackName, setFallBackName] = useState<string | undefined >('U')
  const Logout = async()=>{
    const response = await axiosInstance.post(`user/${getSubdomain()}/logout`)
    return response

  }


  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: Logout,
    onSuccess: () => {
      window.location.href = '/login'
      removeCookie('expiry')
      removeCookie('refresh_token')
      removeCookie('access_token')
    },
    onSettled: () => {
      console.log('logout mutation completed')
    },
    onError: () => {
      console.error('logout mutation failed')
    },
   
  })


  useEffect(() => {
    if (user?.user?.full_name) {
      setFallBackName(getTwoLetters(user?.user?.full_name));
    }
  }, [user]);
  
  <AvatarFallback>{fallBackName || "U"}</AvatarFallback>
  
 
  return (
    <>
     <div
        className={twMerge(
          'fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-themeBlack backdrop-blur-md flex  gap-4 items-center border-b-[1px] ',
          className
        )}
      >
         <div className="flex items-center gap-2 ml-auto">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
         <Avatar className='cursor-pointer'>
      <AvatarImage src={user?.user?.profile_pic} alt="@shadcn" />
      <AvatarFallback>{fallBackName}</AvatarFallback>
    </Avatar>

      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={()=>{logoutMutation.mutate()}} className='cursor-pointer bg-themeBlack hover:bg-themeTextGray' >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Sheet >
    <SheetTrigger>
              <div className="rounded-full w-9 h-9  flex items-center justify-center">
                <LucideBell size={26} />
              </div>
            </SheetTrigger>
            <SheetContent className=" pr-4 overflow-scroll  bg-themeBlack">
            <SheetHeader className="text-left">
            <SheetTitle>Notifications</SheetTitle>
            </SheetHeader>
            </SheetContent>
    </Sheet>
         </div>


      </div>

    </>
  )
}

export default InfoBar