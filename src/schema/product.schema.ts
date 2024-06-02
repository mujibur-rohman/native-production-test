import { z } from "zod";

export default z.object({
  title: z.string().min(1, "title is required"),
  price: z.number().min(1, "price is required"),
  description: z.string().min(1, "description is required"),
  images: z.string().array().min(1, "upload at least 1 images"),
  categoryId: z.number().min(1, "category is required"),
});
