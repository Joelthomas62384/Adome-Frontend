"use client"

import TenantForm from '@/components/forms/TenantForm';
import { RootState } from '@/Redux/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { TenantFormType } from '@/types';

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
  const { appDetails } = useSelector((state: RootState) => state.app);

  const form = useForm<TenantFormType>({
    resolver: zodResolver(tenantSchema),
    defaultValues: appDetails,
  });

  // Ensure form resets when appDetails change
//   useEffect(() => {
//     // form.reset(appDetails);
//     console.log(appDetails)
//   }, []);

  const onSubmit = (data: TenantFormType) => {
    console.log('Form Submitted:', data);
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen p-4'>
      {/* <h1 className='text-2xl font-bold mb-4 self-start'>Users</h1> */}
      <div className='w-full max-w-4xl'>
        <TenantForm form={form} onSubmit={onSubmit} switches={true} />
      </div>
    </div>
  );
};

export default Page;
