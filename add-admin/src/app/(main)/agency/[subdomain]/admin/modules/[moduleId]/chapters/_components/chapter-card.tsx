import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSelector } from 'react-redux'
import { RootState } from '@/Redux/store'
import { formatTimeAgo } from '@/utils'

type ChapterProps = {
  chapter: {
    id: number
    title: string
    content: string
    created_at: string
    updated_at: string
  }
}

const ChapterCard = ({ chapter }: ChapterProps) => {
  const user = useSelector((state: RootState) => state.user.user)
  const isAdmin = user?.is_admin

  return (
    <Card className="group relative bg-themeBlack overflow-hidden transition-all hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{chapter.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-3">{chapter.content}</p>
        <p className="text-xs text-gray-500">Created: {formatTimeAgo(chapter.created_at)}</p>
      </CardContent>

      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Optional admin actions, can be linked to edit/delete */}
        </div>
      )}
    </Card>
  )
}

export default ChapterCard
