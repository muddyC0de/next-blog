"use client";

import { FormInput } from "@/components/shared/form-components/form-input";
import { FormSelect } from "@/components/shared/form-components/form-select";
import { blogStatuses } from "@/constants/status";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createBlogSchema, TCreateBlogSchema } from "./schema";
import { Button } from "@/components/ui/button";
import { createBlog } from "@/app/actions";
import { FormTextarea } from "@/components/shared/form-components/form-textarea";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { startHolyLoader, stopHolyLoader } from "holy-loader";

interface Props {
  className?: string;
}

export const CreateBlogForm: React.FC<Props> = ({ className }) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const form = useForm<TCreateBlogSchema>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "PUBLIC",
    },
  });

  const onSubmit = async (data: TCreateBlogSchema) => {
    try {
      setLoading(true);
      await createBlog(data);
      setLoading(false);
      toast.success("Блог успішно створено");

      startHolyLoader();
      router.replace("/");
      router.refresh();
      stopHolyLoader();
    } catch (error) {
      toast.error("Помилка створення блогу");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-5 flex flex-col"
      >
        <FormInput
          placeholder="The best blog ever!"
          required
          label="Назва блогу"
          name="title"
        />
        <FormSelect
          required
          defaultValue="PUBLIC"
          label="Статус блогу"
          name="status"
          items={blogStatuses}
        />
        <FormTextarea
          required
          className="resize-none h-52"
          label="Розкажіть про що ваш блог"
          placeholder="Найкращий блог у світі!"
          name="description"
        />

        <Button loading={loading} className="text-[16px]" type="submit">
          Створити блог
        </Button>
      </form>
    </FormProvider>
  );
};
