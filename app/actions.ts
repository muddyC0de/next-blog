"use server";

import { generateUniqueSlug, getUserSession } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { Storage } from "@google-cloud/storage";
import { Prisma, UserRole } from "@prisma/client";
import { hashSync } from "bcrypt";
import { revalidatePath } from "next/cache";
import {
  CreatePostValues,
  TagCreateInput,
  TagUpdateInput,
} from "../@types/prisma";
import { TCreateBlogSchema } from "@/components/shared/create-blog/forms/schema";

export const createPost = async (data: CreatePostValues) => {
  try {
    const session = await getUserSession();
    const blog = await prisma.blog.findFirst({
      where: {
        userId: Number(session?.id),
      },
    });

    if (!blog) throw new Error("Error [CREATE POST]: Blog not found");

    const slug = await generateUniqueSlug(data.title);

    const post = await prisma.post.create({
      data: {
        blogId: blog.id,
        userId: Number(session?.id),
        title: data.title,
        description: data.description,
        slug: slug,
        tagId: data.tag.id,
        text: data.text,
        imageUrl: data.imageUrl,
      },
    });

    revalidatePath("/");
    return post.slug;
  } catch (error) {
    console.log("Error [CREATE POST]", error);
  }
};

export const createTag = async (data: TagCreateInput) => {
  try {
    const session = await getUserSession();
    const blog = await prisma.blog.findFirst({
      where: {
        userId: Number(session?.id),
      },
    });

    if (!blog) throw new Error("Error [CREATE TAG]: Blog not found");

    const tag = await prisma.tag.findFirst({
      where: {
        blogId: blog.id,
        title: data.title,
      },
    });

    if (tag) return tag;

    const createdTag = await prisma.tag.create({
      data: {
        blogId: blog.id,
        title: data.title,
        color: data.color,
      },
    });

    return createdTag;
  } catch (error) {
    console.log("Error [CREATE TAG]", error);
  }
};

export const editTag = async (data: TagUpdateInput) => {
  try {
    const session = await getUserSession();
    const blog = await prisma.blog.findFirst({
      where: {
        userId: Number(session?.id),
      },
    });

    if (!blog) throw new Error("Error [EDIT TAG]: Blog not found");

    const createdTag = await prisma.tag.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        color: data.color,
      },
    });

    return createdTag;
  } catch (error) {
    console.log("Error [EDIT TAG]", error);
  }
};

export const editPost = async (data: CreatePostValues, postId: number) => {
  try {
    const session = await getUserSession();
    const blog = await prisma.blog.findFirst({
      where: {
        userId: Number(session?.id),
      },
    });

    if (!blog) throw new Error("Error [EDIT POST]: Blog not found");

    const updatedTag = await editTag({
      id: data.tag.id,
      title: data.tag.title,
      color: data.tag.color,
    });

    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: data.title,
        description: data.description,
        text: data.text,
        imageUrl: data.imageUrl,
      },
    });

    revalidatePath("/");
    revalidatePath(`/${blog.username}/posts/${post.slug}`, "page");

    return post.slug;
  } catch (error) {
    console.log("Error [EDIT POST]", error);
  }
};

export const deletePost = async (slug: string) => {
  try {
    const session = await getUserSession();

    const blog = await prisma.blog.findFirst({
      where: {
        userId: Number(session?.id),
      },
    });

    if (!blog) throw new Error("Error [DELETE POST]: Blog not found");

    await prisma.post.delete({
      where: {
        slug,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.log("Error [DELETE POST]", error);
  }
};

export const uploadImage = async (formData: FormData) => {
  try {
    const base64String = process.env.GOOGLE_APPLICATION_CREDENTIALS as string;

    const jsonString = Buffer.from(base64String, "base64").toString("utf-8");

    const credentials = JSON.parse(jsonString);

    const storage = new Storage({
      credentials,
    });

    const bucket = storage.bucket(
      process.env.GOOGLE_CLOUD_BUCKET_NAME as string
    );

    const file = formData.get("image") as File;

    if (!file) {
      throw new Error("No image file found in FormData");
    }

    const buffer = await file.arrayBuffer();

    const bucketFile = bucket.file(`${file.name}-${Date.now()}`);

    await bucketFile.save(Buffer.from(buffer), {
      contentType: file.type,
    });

    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${bucketFile.name}`;

    return fileUrl;
  } catch (error) {
    console.log("Error [UPLOAD IMAGE]", error);
  }
};

export const createBlog = async (data: TCreateBlogSchema) => {
  try {
    const session = await getUserSession();

    if (!session) {
      throw new Error("No session found");
    }

    await prisma.blog.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        userId: Number(session?.id),
        username: session?.username,
      },
    });

    revalidatePath("/blogs");
  } catch (error) {
    console.log("Error [CREATE BLOG]", error);
  }
};

export const updateUserInfo = async (data: Prisma.UserUpdateInput) => {
  try {
    const session = await getUserSession();

    if (!session) {
      throw new Error("Ви не авторизовані");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(session?.id),
      },
    });

    if (!findUser) {
      throw new Error("Не вдалось оновити інформацію профілю");
    }

    await prisma.user.update({
      where: {
        id: Number(session?.id),
      },
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password ? data.password : findUser.password,
      },
    });

    revalidatePath("/profile");
  } catch (error) {
    console.log("Error [UPDATE USER INFO]", error);
  }
};

export const updateBlogInfo = async (data: Prisma.BlogUpdateInput) => {
  try {
    const session = await getUserSession();
    if (!session) {
      throw new Error("Ви не авторизовані");
    }

    const blog = await prisma.blog.findFirst({
      where: {
        userId: Number(session?.id),
      },
    });

    if (!blog) {
      throw new Error("Не вдалось оновити інформацію профілю");
    }

    await prisma.blog.update({
      where: {
        id: blog.id,
      },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
      },
    });

    revalidatePath("/profile");
  } catch (error) {
    console.log("Error [UPDATE BLOG INFO]", error);
  }
};

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (findUser) {
      throw new Error("Користувач з таким email вже існує");
    }

    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        fullName: body.fullName,
        username: body.username,
        password: hashSync(body.password.toString(), 10),
        provider: body?.provider,
        providerId: body?.providerId,
        role: "USER" as UserRole,
      },
    });
  } catch (error: any) {
    console.log("[RegisterUser] Server error", error);
    throw new Error(error);
  }
}
