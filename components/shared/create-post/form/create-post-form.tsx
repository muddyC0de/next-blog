"use client";

import React, { useRef } from "react";

import SimpleMdeReact from "react-simplemde-editor";

import "/components/shared/create-post/simplemde.css";
import "easymde/dist/easymde.min.css";
import { cn } from "@/lib/utils";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { createPostFormSchema, TCreatePostFormValues } from "./schema";
import { Button } from "@/components/ui/button";
import { createPost, createTag } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, NotebookPen, Trash } from "lucide-react";
import { UploadButton } from "../../form-components";
import Image from "next/image";
import { TwitterPicker } from "react-color";
import { useRouter } from "next/navigation";
import { Post, Tag } from "@prisma/client";
import { PostWithTag } from "../../blog";
import { useSession } from "next-auth/react";
import { handleImageChange } from "@/lib/handle-image-change";
import { WhiteBlock } from "../../white-block";
import { PostTextarea } from "../../post-textarea";
import { SelectTag } from "../../select-tag";
import { ErrorText } from "../../error-text";
import toast from "react-hot-toast";
import { autofocusNoSpellcheckerOptions } from "../simplemde-options";
import { startHolyLoader, stopHolyLoader } from "holy-loader";

interface Props {
  post?: PostWithTag;
  tags: Tag[];
  className?: string;
}

export const CreatePostForm: React.FC<Props> = ({ post, tags, className }) => {
  const user = useSession().data?.user;

  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingImage, setLoadingImage] = React.useState(false);
  const router = useRouter();
  const pickerRef = useRef<HTMLDivElement>(null);

  const form = useForm<TCreatePostFormValues>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      title: post?.title || "",
      text: post?.text || "",
      description: post?.description || "",
      tag: post?.tag?.title || "",
      tagColor: post?.tag?.color || "#FFFFFF",
      imageUrl: post?.imageUrl || "",
    },
  });

  const onSubmit = async (data: TCreatePostFormValues) => {
    try {
      setLoading(true);
      const createdTag = await createTag({
        title: data.tag,
        color: data.tagColor,
      });

      if (!createdTag) {
        return;
      }

      const postData = {
        title: data.title,
        text: data.text,
        description: data.description,
        tag: createdTag,
        imageUrl: String(imageUrl),
      };

      const slug = await createPost(postData);

      if (slug) {
        startHolyLoader();
        router.push(`/${user?.username}/posts/${slug}`);
        stopHolyLoader();
      }

      setLoading(false);
    } catch (error) {
      toast.error("Помилка створення посту");
    }
  };

  const handleInputImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    await handleImageChange(event, form, setLoadingImage);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const imageUrl = form.watch("imageUrl");

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div
          style={{ animationDelay: `0.06s` }}
          className={cn(
            "simplemde-root flex-col animate box-border w-full h-full pb-4 ",
            className
          )}
        >
          <WhiteBlock className="pb-4">
            <div className="px-[90px] pt-[30px]">
              <div className="flex gap-2">
                <UploadButton
                  loading={loadingImage}
                  name="imageUrl"
                  className="mb-2"
                  onImageChange={handleInputImageChange}
                />
                {imageUrl.length > 1 && (
                  <Button
                    loading={loadingImage}
                    onClick={() => {
                      form.setValue("imageUrl", "");
                    }}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <Trash size={18} />
                    Видалити
                  </Button>
                )}
              </div>
              {!loadingImage && imageUrl.length > 1 && (
                <Image
                  src={imageUrl}
                  alt="preview"
                  width={300}
                  height={300}
                  className="rounded-[10px] mb-5 object-cover"
                />
              )}
              <PostTextarea name="title" placeholder="Заголовок" className="" />
              <PostTextarea
                name="description"
                placeholder="Короткий опис"
                className="text-[20px] font-medium "
              />
              <div className="relative">
                <SelectTag
                  setShowColorPicker={() =>
                    setShowColorPicker(!showColorPicker)
                  }
                  items={tags}
                  name="tag"
                />
                {showColorPicker && (
                  <div ref={pickerRef}>
                    <Controller
                      name="tagColor"
                      control={form.control}
                      render={({ field }) => (
                        <TwitterPicker
                          color={field.value}
                          onChangeComplete={(color: { hex: string }) => {
                            field.onChange(color.hex);
                          }}
                          triangle="hide"
                          styles={{
                            default: {
                              card: {
                                position: "absolute",
                                top: "50px",
                                zIndex: 20,
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            </div>

            <Controller
              name="text"
              control={form.control}
              render={({ field: { onChange, value } }) => (
                <SimpleMdeReact
                  onChange={(value) => {
                    onChange(value);
                  }}
                  value={value}
                  options={autofocusNoSpellcheckerOptions}
                  className="mt-5"
                />
              )}
            />

            {form.formState.errors.text && (
              <ErrorText
                className="ml-5"
                text={form.formState.errors.text.message as string}
              />
            )}
          </WhiteBlock>
        </div>
        <Button
          style={{ animationDelay: `0.18s` }}
          loading={loading}
          className="flex w-[152px] animate will-change-transform items-center gap-2"
          type="submit"
        >
          <CirclePlus size={18} />
          Опублікувати
        </Button>
      </form>
    </FormProvider>
  );
};
