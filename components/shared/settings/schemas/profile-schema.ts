import { z } from "zod";

export const optionalPasswordSchema = z
  .string()
  .optional()
  .refine(
    (value) => {
      if (value) {
        return value.length >= 6;
      }
      return true;
    },
    { message: "Пароль повинен містити не менше 6 символів" }
  );

export const profileFormSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Ім'я повинно містити не менше 2 символів" }),
    email: z.string().email({ message: "Введіть коректний E-Mail" }),
    password: optionalPasswordSchema,
    confirmPassword: optionalPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });

export type TFormProfileValues = z.infer<typeof profileFormSchema>;
