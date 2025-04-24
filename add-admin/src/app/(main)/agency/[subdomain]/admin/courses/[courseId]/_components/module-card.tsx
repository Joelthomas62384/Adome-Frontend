import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSelector } from 'react-redux'
import { RootState } from '@/Redux/store'
import { Pencil, Trash2 } from 'lucide-react'
import { formatTimeAgo } from '@/utils'
import { useRouter } from 'next/navigation'

type Props = {
  module: {
    id: number
    title: string
    description: string
    created_at: string
    updated_at: string
  }
}

const ModuleCard = ({ module }: Props) => {
  const user = useSelector((state: RootState) => state.user.user) 

  const isAdmin = user?.is_admin;
  const router = useRouter()

  return (
    <Card  className="group relative bg-themeBlack overflow-hidden transition-all hover:shadow-lg cursor-pointer">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{module.title}</CardTitle>
      </CardHeader>
      <CardContent onClick={()=>{router.push(`/admin/modules/${module.id}/chapters`)}}>
        <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
        <p className="text-xs text-gray-500">Created: {formatTimeAgo(module.created_at)}</p>
     
      </CardContent>

      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="outline" size="icon">
            <Pencil className="w-4 h-4" />
          </Button>
          <Button variant="destructive" size="icon">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </Card>
  )
}

export default ModuleCard
