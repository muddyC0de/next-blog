import { z } from "zod";
import { createBlogSchema } from "../../create-blog/forms/schema";

export const blogFormSchema = createBlogSchema;

export type TFormBlogValues = z.infer<typeof blogFormSchema>;
