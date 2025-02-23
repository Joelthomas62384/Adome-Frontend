"use client"

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import axiosInstance from "@/axios/public-instance";
import { useToast } from "@/hooks/use-toast";

type UploadDropzoneProps = {
  apiEndpoint: string;
  onUploadComplete: (url: string) => void;
  onUploadError?: (error: string) => void;
};

const UploadDropzone = ({ apiEndpoint, onUploadComplete, onUploadError }: UploadDropzoneProps) => {
  const {toast} = useToast()
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post(apiEndpoint, formData);

      if (response.status >= 200 && response.status < 300) {
        onUploadComplete(response.data.file); 
        toast({
          title: 'Success',
          description: 'File uploaded successfully',
          variant: 'default'
        })
      } else {
        toast({
          title: 'Error',
          description: 'Failed to upload file',
          variant: 'destructive'
        })
        throw new Error("Upload failed");
      }
    } catch (error: any) {
      onUploadError?.(error.response?.data?.message || error.message);
    }
  }, [apiEndpoint, onUploadComplete, onUploadError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-900 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer  "
    >
      <input {...getInputProps()} />
      <UploadCloud className="h-8 w-8 text-gray-400" />
      <p className="mt-2 text-sm text-gray-400">
        {isDragActive ? "Drop the file here..." : "Drag & drop a file, or click to select"}
      </p>
    </div>
  );
};

export default UploadDropzone;
