import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

type Props = {
    open: boolean 
  
    title? : "APP LINK" | "Create Agency"
}

const TenantCreateModal = ({open , title}: Props) => {
  return (
    <Dialog open={open}> 
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{title || "Create Agency"}</DialogTitle>
      <DialogDescription>
       
      </DialogDescription>
    </DialogHeader>

    
  </DialogContent>
</Dialog>

  )
}

export default TenantCreateModal