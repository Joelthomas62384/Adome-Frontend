"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ArrowRight, Edit, Edit2, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  thumbnail: string;
  content: string;
  onDelete?: (id: number) => void;
  id: number;
  is_admin?: boolean;
  sm?: boolean;
  price?: string;
  onClick : (id:number)=>void
};

const CourseCards = ({
  id,
  title,
  thumbnail,
  content,
  onDelete,
  is_admin = false,
  sm,
  price,
  onClick 
}: Props) => {
  const router = useRouter();

  return (
    <Card
      className={`relative group bg-themeBlack w-full rounded-lg shadow-2xl overflow-hidden cursor-pointer ${
        sm ? "max-w-[280px]" : "max-w-[360px]"
      }`}
    >
      {is_admin && (
        <Button
        onClick={() => {
          router.push(`/admin/courses/${id}/edit`)
        }}
        className="absolute top-3 right-3 z-10 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        variant="default"
        >
        <Edit className="w-4 h-4" />
        </Button>
      )}

{is_admin && (
  <Button
  onClick={() => {
    onDelete && onDelete(id);
  }}
  className="absolute top-3 right-12 z-10 p-2 opacity-0  group-hover:opacity-100 transition-opacity duration-700"
  variant="default"
  >
  <Trash2 className="w-4 h-4" />
        </Button>
      )}


      <CardHeader className="p-0" onClick={(e)=>{
        onClick(id)
      }}>
        <AspectRatio ratio={16 / 9}>
          <Image
            src={thumbnail}
            alt="Thumbnail"
            fill
            className="rounded-t-lg object-cover object-top"
          />
        </AspectRatio>
        <div className="p-4">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-2">
        <CardDescription>
          {content.slice(0, 70)}...
        </CardDescription>
      </CardContent>

      <CardFooter className="flex justify-between px-4 pb-4 mt-4 text-sm text-gray-400">
        
          <div className="flex flex-col items-end text-right">
            
            <Button
              size="sm"
              onClick={() => router.push(`/course/${id}`)}
              className="mt-1 bg-transparant text-green-500 hover:bg-transparent"
            >
               ₹{price} - Buy Now <ArrowRight />
            </Button>
          </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCards;
