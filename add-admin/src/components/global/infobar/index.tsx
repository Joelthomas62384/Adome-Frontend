"use client"

import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { LucideBell } from 'lucide-react'

type Props = {
    className? : string
}

const InfoBar = ({className}: Props) => {
  const [allNotifications, setAllNotifications] = useState([])
  const [showAll, setShowAll] = useState(true)
  return (
    <>
     <div
        className={twMerge(
          'fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-themeBlack backdrop-blur-md flex  gap-4 items-center border-b-[1px] ',
          className
        )}
      >
         <div className="flex items-center gap-2 ml-auto">
         <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
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