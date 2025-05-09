"use client"

import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CourseAnalytics from './_Dashboard/course-analytics'
import UserAnalytics from './_Dashboard/user-analytics'


type Props = {}

const page = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState('course')
  useEffect(() => {
   console.log(selectedTab)
  }, [selectedTab])
  
 
  return (
 <>
 <Tabs defaultValue="course" onValueChange={(value)=>setSelectedTab(value)} className="w-full">
  <TabsList>
    <TabsTrigger value="course">Courses</TabsTrigger>
    <TabsTrigger value="payments">Payments</TabsTrigger>
    <TabsTrigger value="users">Users</TabsTrigger>
  </TabsList>
  <TabsContent value="course">

  <CourseAnalytics />
  </TabsContent>
  <TabsContent value="payments">Payments</TabsContent>
  <TabsContent value="users">
  <UserAnalytics />
  </TabsContent>
</Tabs>
 </>
  )
}

export default page