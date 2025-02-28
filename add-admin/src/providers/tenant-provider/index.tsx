"use client";

import axiosInstance from "@/axios/public-instance";
import LoadingPage from "@/components/global/loading-page";
import { getSubdomain } from "@/constants";
import { setAppInfo } from "@/Redux/slices/app-details";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const fetchTenant = async () => {
  const response = await axiosInstance.get(`tenant/${getSubdomain()}/tenant`);
  return response.data;
};

const TenantProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { data: tenant, isLoading, isError } = useQuery({
    queryKey: ["tenant"],
    queryFn: fetchTenant,
    retry: false,
  });

  useEffect(() => {
    if (tenant) {
      dispatch(setAppInfo({ tenant }));
    }
  }, [tenant, dispatch]);

  if (isLoading) return <LoadingPage />
  if (isError) {
    router.replace("/404");
    return null;
  }

  return <>{children}</>;
};

export default TenantProvider;
