"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/axios/public-instance";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { schemaName } = useSelector((state: RootState) => state.app);
  const router = useRouter();
  const queryClient = useQueryClient();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["website"],
    queryFn: async () => {
      const response = await axiosInstance.get(`builder/${schemaName}/website`);
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`builder/${schemaName}/website/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["website"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching websites</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4">
      {data.map((site: any) => (
        <Card 
          key={site.id} 
          className="relative bg-themeBlack cursor-pointer"
          onMouseEnter={() => setHoveredCard(site.id)}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => router.push(`/admin/builder/${site.id}`)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {site.title} {site.is_default && <Check className="text-green-500" size={20} />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              {new Date(site.created_at).toLocaleDateString()} 
              {/* {site.created_at != site.updated_at && "(edited)"} */}
            </p>
          </CardContent>
          {hoveredCard === site.id && (
            <Button 
              className="absolute top-2 right-2 p-1   "
              onClick={(e) => {
                e.stopPropagation();
                deleteMutation.mutate(site.id);
              }}
            >
              <Trash2 size={16} />
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
};

export default Page;
