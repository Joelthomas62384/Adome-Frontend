import { Button } from '@/components/ui/button'
import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import UploadDropzone from '../upload-dropzone'



type Props = {
  apiEndpoint: string
  onChange: (url?: string) => void
  value?: string
}

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
  const type = value?.split('.').pop()

  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {type !== 'pdf' ? (
          <div className="relative w-40 h-40">
            <Image
              src={value ||'https://a65h5aua68.ufs.sh/f/c42d559a-5217-4d28-90fc-eea67f71ace4-n3ch5g.jpg' }
              alt="uploaded image"
              className="object-contain"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <FileIcon />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 "
            >
              View PDF
            </a>
          </div>
        )}
        <Button
          onClick={() => onChange('')}
          variant="ghost"
          type="button"
        >
          <X className="h-4 w-4" />
          Remove Logo
        </Button>
      </div>
    )
  }
  return (
    <div className="w-full bg-[#333337]   ">
      <UploadDropzone
       apiEndpoint={apiEndpoint}
       onUploadComplete = {(url:string)=>{
         console.log(url)
        onChange(url);
       }}
         onUploadError = {(error:string)=>{
          console.log(error)
         }}
        
      />
    </div>
  )
}

export default FileUpload