"use client"

import axiosInstance from '@/axios/public-instance';
import React, { useEffect, useState } from 'react';



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
const Page = () => {
  const [users, setUsers] = useState([])
  const getUsers = async()=>{
    try{
      const response = await axiosInstance.get(`user/${getSubdomain()}/tenantusers`)
      console.log(response.data)
      setUsers(response.data)
    }catch(error:any){
      console.error(error);
    }
  }

  useEffect(()=>{
    getUsers()
  }, [])

  return (
    <div className='flex flex-col justify-center items-center min-h-screen p-4'>
      <h1 className='text-2xl font-bold mb-4 self-center'>Users</h1>
      <div className='w-full max-w-4xl'>
        {/* <UserTable users={users} /> */}
      </div>
    </div>
  );
};

export default Page;
