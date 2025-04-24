"use client"

import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from '@/axios/public-instance'
import { useSelector } from 'react-redux'
import { RootState } from '@/Redux/store'
import ChapterCard from './_components/chapter-card'

type Props = {
  params: Promise<{ moduleId: string }>;
}

const page = ({ params }: Props) => {
  const {moduleId} = React.use(params)
  console.log(moduleId)

  const {schemaName} = useSelector((state:RootState)=>state.app)
  const { data, isLoading, isError } = useQuery(
    {
      queryKey : ['getChapters', moduleId],
      queryFn : async () => {
            const response = await axiosInstance.get(`course/${schemaName}/get-chapters/${moduleId}`)  
            return response.data
          }
      
    }
  )

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error loading chapters</div>

  if (data?.length === 0) {
    return <p>No chapters available</p>
  }

  return (
    <div>
      {data.map((chapter: any) => (
        <ChapterCard key={chapter.id} chapter={chapter} />
      ))}
    </div>
  )
}

export default page
