import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

type UploadDropzoneProps = {
  apiEndpoint: string; 
  onUploadComplete: (url: string) => void;
  onUploadError?: (error: string) => void;
};

const UploadDropzone = ({ apiEndpoint, onUploadComplete, onUploadError }: UploadDropzoneProps) => {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const { url } = await response.json();
      onUploadComplete(url); 
    } catch (error : any ){
      onUploadError?.(error.message);
    }
  }, [apiEndpoint, onUploadComplete, onUploadError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 p-6 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
    >
      <input {...getInputProps()} />
      <UploadCloud className="h-8 w-8 text-gray-500" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive ? "Drop the file here..." : "Drag & drop a file, or click to select"}
      </p>
    </div>
  );
};

export default UploadDropzone;
