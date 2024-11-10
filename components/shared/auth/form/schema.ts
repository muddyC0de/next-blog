import z from "zod";

export const passwordSchema = z
  .string()
  .min(6, { message: "Пароль повинен містити не менше 6 символів" });

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Введіть коректний E-Mail" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z
        .string()
        .min(2, { message: "Ім'я повинно містити не менше 2 символів" }),
      username: z
        .string()
        .min(2, { message: "Юзернейм повинен містити не менше 2 символів" }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  });
export type TLoginFormSchema = z.infer<typeof formLoginSchema>;
export type TRegisterFormSchema = z.infer<typeof formRegisterSchema>;
