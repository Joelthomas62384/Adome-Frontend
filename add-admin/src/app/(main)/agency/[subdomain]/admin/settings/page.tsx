"use client"

import TenantForm from '@/components/forms/TenantForm';
import { RootState } from '@/Redux/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TenantFormType } from '@/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const tenantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  subdomain: z.string().min(1, 'Subdomain is required'),
  contact_email: z.string().email('Invalid email'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().optional(),
  blog: z.boolean().optional(),
  community: z.boolean().optional(),
  newsletter: z.boolean().optional(),
  courses: z.boolean().optional(),
  logo: z.string().optional(),
});

const Page = () => {
  const { tenant } = useSelector((state: RootState) => state.app);

  const form = useForm<TenantFormType>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      name: '',
      subdomain: '',
      contact_email: '',
      location: '',
      description: '',
      blog: false,
      community: false,
      newsletter: false,
      courses: false,
      logo: '',
    },
  });

  // Reset form when `tenant` data changes
  useEffect(() => {
    if (tenant) {
      form.reset({
        name: tenant.name || '',
        subdomain: tenant.subdomain || '',
        contact_email: tenant.contact_email || '',
        location: tenant.location || '',
        description: tenant.description || '',
        blog: tenant.blog || false,
        community: tenant.community || false,
        newsletter: tenant.newsletter || false,
        courses: tenant.courses || false,
        logo: tenant.logo || '',
      });
    }
  }, [tenant, form]);

  const onSubmit = (data: TenantFormType) => {
    console.log('Form Submitted:', data);
  };

  return (
    <div className='flex flex-col items-center min-h-screen'>
      <div className='w-full max-w-4xl'>
        <Card className='bg-themeBlack'>
          <CardHeader>
            <CardTitle>Update Settings</CardTitle>
          </CardHeader>
          <CardContent className='overflow-auto bg-themeBlack'>
            <TenantForm form={form} onSubmit={onSubmit} switches={true} actionText='Update' />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
