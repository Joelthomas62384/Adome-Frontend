"use client"

import axiosInstance from '@/axios/public-instance';
import { RootState } from '@/Redux/store';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import ModuleCard from '../_components/module-card';

type Props = {
  params: Promise<{ courseId: string }>; 
}

const Page = ({ params }: Props) => {
  const { courseId } = React.use(params);
  const { schemaName } = useSelector((state: RootState) => state.app);

  const getCourseModules = async () => {
    try {
      const response = await axiosInstance.get(`course/${schemaName}/get-modules/${courseId}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['course-modules', courseId],
    queryFn: getCourseModules
  });

  useEffect(() => {
    console.log(data)
  }, [data])
  
  if (isLoading) return <div>Loading modules...</div>;
  if (isError) return <div>Failed to load modules</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data && data.length > 0 ? (
        data.map((module: any) => (
          <ModuleCard key={module.id} module={module} />
        ))
      ) : (
        <div>No modules found.</div>
      )}
    </div>
  );
};

export default Page;
