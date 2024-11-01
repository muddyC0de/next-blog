"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Button } from "../../../ui/button";
import {
  profileFormSchema,
  TFormProfileValues,
} from "../schemas/profile-schema";
import { FormInput } from "../../form-components/form-input";
import { updateUserInfo } from "@/app/actions";
import { User } from "@prisma/client";

interface Props {
  data: User;
  className?: string;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormProfileValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success("Ваш профіль оновлено");
    } catch (error) {
      console.error(error);
      return toast.error("Помилка оновлення профілю");
    }
  };

  const onClickSignOut = async () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl mb-8">Ваш профіль</h1>
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            disabled={data.provider ? true : false}
            name="email"
            label="E-Mail"
            isClearable={data.provider ? false : true}
            required
          />
          <FormInput name="fullName" label="Повне ім'я" required />

          <FormInput type="password" name="password" label="Новий пароль" />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Повторіть пароль"
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Зберегти
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Вийти
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
