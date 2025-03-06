"use client";

import axiosInstance from "@/axios/public-instance";
import { getSubdomain } from "@/constants";
import { setUserData } from "@/Redux/slices/user-details";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCookie } from "typescript-cookie";

type Props = {
  children: React.ReactNode;
};

const fetchTenantUser = async () => {

  const { data } = await axiosInstance.get(`user/${getSubdomain()}/tenantuser`);
  return data;
};

const TenantUserProvider = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tenantUser"],
    queryFn: fetchTenantUser,
    retry: false,
  });
  const router = useRouter()
  useEffect(() => {
    
    if (!isLoading && !isError && data) {
      dispatch(setUserData({ user: data.user || null, role:data.role,  isLoggedIn: true }));
      console.log(data , data.role    )
      setCookie('user_email',data.user.email)
    } else if (!isLoading && isError) {
      dispatch(setUserData({ user: null, isLoggedIn: false }));
    }
    if(data?.blocked){
      router.push('/404')
      
    }
  }, [data, isLoading, isError, dispatch]);
  

  return <>{children}</>;
};

export default TenantUserProvider;
