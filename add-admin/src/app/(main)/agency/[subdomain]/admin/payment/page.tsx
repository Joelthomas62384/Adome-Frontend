"use client"

import React, { useState } from 'react'
import PaymentFormCard from './_components/payment-form-card'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PaymentSchema, PaymentSchemaType } from '@/constants/schemas'
import { useSelector } from 'react-redux'
import { RootState } from '@/Redux/store'
import axiosInstance from '@/axios/public-instance'
import { useMutation } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from 'sonner'



type Props = {}

const Page = (props: Props) => {
  const [connected, setConnected] = useState(false)
  const {schemaName} = useSelector((state:RootState)=>state.app)
  const connectPayment = async (data:PaymentSchemaType)=>{
    const response = await axiosInstance.post(`/payment/${schemaName}/gateway-register`,data)
    return response.data
  }
  const paymentMutation = useMutation({
    mutationKey : ['payment-connect'],
    mutationFn : connectPayment,
    onSuccess : (data : PaymentSchemaType)=>{
      setConnected(true)
      toast.success("Saved successfully")
    },
    onError :(error)=>{
      console.log(error)
      toast.error(error.message)
    }
    
  })
  const onSubmit = (data:PaymentSchemaType)=>{paymentMutation.mutate(data)}
  const form = useForm({
    resolver : zodResolver(PaymentSchema),
    defaultValues : {
      name : "",
      email : "",
      bank_account_number : "",
      bank_ifsc : "",
      pan_number : "",
      phone : ""
    }
  })
  return (
    <div>
      {!connected &&

        <PaymentFormCard actionText='Connect' form={form} onSubmit={onSubmit}  />
      }
      {
        connected && (
          <Card>
            <CardHeader>
              <CardTitle>
                Connected 
              </CardTitle>
            </CardHeader>
            <CardContent>
            The Payment gateway is connected with your bank account.
            </CardContent>

          </Card>
        )
      }
    </div>
  )
}

export default Page