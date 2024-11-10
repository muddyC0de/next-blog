"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/shared/form-components/form-input";
import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";
import { formRegisterSchema, TRegisterFormSchema } from "./schema";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
// import { registerUser } from "@/app/actions";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions";
import Link from "next/link";

interface Props {
  className?: string;
}

export const RegisterForm: React.FC<Props> = ({ className }) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<TRegisterFormSchema>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TRegisterFormSchema) => {
    try {
      setLoading(true);
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        username: data.username,
        password: data.password,
      });

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      setLoading(false);

      router.replace("/");
      router.refresh();

      toast.success("Ви успішно зареєструвались!");
    } catch (error) {
      console.log(`[REGISTER ERROR]`, error);
      toast.error("Помилка реєстрації");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="gap-5 flex flex-col "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          required
          placeholder="John Doe"
          label="Повне ім'я"
          name="fullName"
        />
        <div className="relative">
          <FormInput
            required
            className="pl-6"
            placeholder="johndoe"
            label="Юзернейм"
            name="username"
          />
          <span className="absolute top-1/2 left-2 text-muted-foreground">
            @
          </span>
        </div>
        <FormInput
          required
          placeholder="johndoe@example.com"
          label="E-Mail"
          name="email"
        />
        <FormInput required label="Пароль" name="password" type="password" />
        <FormInput
          required
          label="Підтвердіть пароль"
          name="confirmPassword"
          type="password"
        />
        <p>
          Вже є аккаунт?
          <Link href="/login" className="text-primary ml-1">
            Увійти
          </Link>
        </p>
        <Button
          loading={loading}
          className="flex gap-1 items-center h-12 text-[16px]"
          type="submit"
        >
          <User size={18} />
          Зареєструватися
        </Button>
      </form>
    </FormProvider>
  );
};
