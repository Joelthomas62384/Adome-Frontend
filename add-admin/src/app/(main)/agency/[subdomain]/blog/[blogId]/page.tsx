"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/axios/public-instance";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { Editor } from "novel-lightweight";

const BlogDetails = () => {
  const { blogId } = useParams();
  const {schemaName} = useSelector((state:RootState)=>state.app)

  const fetchBlog = async () => {
    console.log(blogId)
    const response = await axiosInstance.get(`blog/${schemaName}/blog-get/${blogId}`);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: fetchBlog,
    enabled: !!blogId, 
  });

  if (isLoading) return <Skeleton className="h-60 w-full max-w-3xl mx-auto" />;
  if (isError) return <p className="text-red-500 text-center">Failed to load blog.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="text-gray-500 text-sm mb-6">By {data.author} | {data.date}</p>
      <img
        src={data.image}
        alt="Blog Cover"
        className="w-full h-auto rounded-lg mb-6 shadow-md"
      />
      <div className="prose max-w-none">
      <Editor
  defaultValue={data.content} 
  className="pointer-events-none select-none w-full"
/>

      </div>
    </div>
  );
};

export default BlogDetails;
