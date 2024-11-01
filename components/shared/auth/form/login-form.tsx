"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TLoginFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FormInput } from "../../form-components";
import Link from "next/link";

interface Props {
  className?: string;
}

export const LoginForm: React.FC<Props> = ({ className }) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<TLoginFormSchema>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLoginFormSchema) => {
    try {
      setLoading(true);
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      setLoading(false);
      toast.success("Успішний вхід в аккаунт");

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.log("Error [LOGIN]", error);
      toast.error("Не вдалося ввійти в аккаунт");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="gap-5 flex flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          required
          placeholder="johndoe@example.com"
          label="E-Mail"
          name="email"
        />
        <FormInput
          required
          label="Пароль"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <p>
          Немає аккаунту?
          <Link href="/register" className="text-primary ml-1">
            Зареєструватися
          </Link>
        </p>
        <Button
          loading={loading}
          className="flex gap-1 items-center h-12 text-[16px]"
          type="submit"
        >
          <LogIn size={18} />
          Увійти
        </Button>
      </form>
    </FormProvider>
  );
};
