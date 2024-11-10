"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { Blog } from "@prisma/client";
import toast from "react-hot-toast";
import { Button } from "../../../ui/button";
import { FormInput } from "../../form-components/form-input";
import { FormTextarea } from "../../form-components/form-textarea";
import { blogStatuses } from "@/constants/status";
import { FormSelect } from "../../form-components/form-select";
import { blogFormSchema, TFormBlogValues } from "../schemas/blog-schema";
import { updateBlogInfo } from "@/app/actions";

interface Props {
  data: Blog | null;
  className?: string;
}

export const BlogForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      status: data?.status || "PUBLIC",
    },
  });

  const onSubmit = async (data: TFormBlogValues) => {
    try {
      await updateBlogInfo({
        title: data.title,
        description: data.description,
        status: data.status,
      });

      toast.success("Ваш блог оновлено");
    } catch (error) {
      console.error(error);
      return toast.error("Помилка оновлення блогу");
    }
  };
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl mb-8">Ваш блог</h1>
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput required label="Назва блогу" name="title" />

          <Controller
            control={form.control}
            name="status"
            render={({ field: { onChange } }) => (
              <FormSelect
                onChange={(value: string) => onChange(value)}
                defaultValue={data?.status}
                items={blogStatuses}
                name="status"
                label="Статус блогу"
              />
            )}
          ></Controller>

          <FormTextarea
            required
            label="Опис блогу"
            className="resize-none h-52"
            name="description"
          />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Зберегти
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
