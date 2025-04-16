import { z } from "zod";

export const courseSchema = z.object({
    title: z.string().min(1, "Title is required").max(200, "Title must be 200 characters or less"),
    thumbnail: z.string().min(1, "Thumbnail is required"),
    content: z.string().min(1, "Content is required"),
    htmlContent: z.string().optional().nullable(),
    JsonContent: z.any().optional().nullable(),   
    price: z.number().min(0, "Price must be non-negative"),
    published: z.boolean().optional().default(false),
  });

export type CourseFormValues = z.infer<typeof courseSchema>
