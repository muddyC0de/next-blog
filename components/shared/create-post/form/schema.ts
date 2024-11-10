import { z } from "zod";

export const createPostFormSchema = z.object({
  title: z
    .string()
    .min(5, "Заголовок повинен містити не менше 5 символів")
    .max(80, "Заголовок повинен містити не більше 80 символів"),
  description: z
    .string()
    .min(100, "Опис повинен містити не менше 100 символів"),

  tag: z.string().min(3, "Тег повинен містити не менше 3 символів"),
  tagColor: z.string(),
  text: z.string().min(100, "Текст повинен містити не менше 100 символів"),
  imageUrl: z.string().min(2, "Додайте обкладинку"),
});

export type TCreatePostFormValues = z.infer<typeof createPostFormSchema>;
