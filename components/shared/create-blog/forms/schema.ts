import { z } from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(1, { message: "Вкажіть назву блогу" }),
  description: z
    .string()
    .min(1, { message: "Вкажіть опис блогу" })
    .max(250, { message: "Максимальна кількість символів 250" }),
  status: z.enum(["PUBLIC", "PRIVATE"]),
});

export type TCreateBlogSchema = z.infer<typeof createBlogSchema>;
