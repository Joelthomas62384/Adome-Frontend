"use client"
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import TenantForm from '@/components/forms/TenantForm'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { TenantFormType } from '@/types'
import BackdropGradient from '@/components/global/backdrop-gradiant'
import { useToast } from '@/hooks/use-toast'
import axiosInstance from '@/axios/public-instance'
import { useSelector } from 'react-redux'
import { RootState } from '@/Redux/store'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
  

type Props = {
    open: boolean 
  
    title? : "APP LINK" | "Create Agency",
    subdomain : string | null
}
// name : string
// logo : string
// domain : string
// founding_year : string
// location : string
// description : string
// blog: boolean
// community : boolean
// newsletter : boolean
// courses : boolean
// }



const TenantCreateModal = ({open , title , subdomain}: Props) => {


  const tenantSchema = z.object({
    name: z.string().min(1, "Agency name is required"),
    logo: z.string().min(1, "Logo is required"),
    subdomain: z.string()
      .min(1, "Domain name is required")
      .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, "Invalid subdomain format"),
    contact_email: z.string().email("Valid email is required"),
    location: z.string().min(1, "Location is required"),
    description: z.string().min(1, "Description is required"),
    blog: z.boolean().default(false),
    community: z.boolean().default(false),
    newsletter: z.boolean().default(false),
    courses: z.boolean().default(false),
  });
  

  const form  = useForm<TenantFormType>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      name: "",
      logo: "",
      subdomain: "",
      contact_email: "",
      location: "",
      description: "",
      blog: true,
      community: false,
      newsletter: false,
      courses: false,
    },
  })
  const {toast } = useToast()
  const { schemaName } = useSelector((state: RootState) => state.app)

 

  const onSubmit: SubmitHandler<TenantFormType> = async(data) => {
    console.log("Form submitted", data)
    try {
      const response = await axiosInstance.post(`tenant/${schemaName}/tenant`, data)
      console.log(response)
      if (response.status === 200) {
        toast({
          title : "Success",
          description : "Registered successfully",
          variant : "default"
        })
      }
  form.reset()

  } catch (error:any) {
    
    if(error.status===400){

      if (error.response.data.email || error.response.data.username){
        toast({
          title : "Error",
          description : error.response.data.email || error.response.data.username,
          variant:"destructive"
        })
        
      }else{
        toast({
          title : "Error",
          description : "An unexpected error occured",
          variant:"destructive"
        })
      }
    }
  }
  // setActiveTab('login')
};
  

const navigatePage = ()=>{

}


  return (
    <Dialog open={open} > 
  
  <DialogContent className='bg-themeBlack'>

    <DialogHeader>
      <DialogTitle>{title || "Create Agency"}</DialogTitle>
      <DialogDescription>
       
      </DialogDescription>
    </DialogHeader>
    {
      subdomain ? (
        <Button onClick={navigatePage} className='bg-[#333337] w-full  text-white hover:text-[#333337]'>Go To DashBoard <ArrowRight /></Button>
      ) : (

        <TenantForm form={form} onSubmit={onSubmit} switches={false} />
      )
    }
  </DialogContent>
</Dialog>


  )
}

export default TenantCreateModal