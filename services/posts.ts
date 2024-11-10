import { PostWithUser } from "@/@types/prisma";
import { prisma } from "@/prisma/prisma-client";
import { Prisma } from "@prisma/client";

type PostWithUserAndTag = Prisma.PostGetPayload<{
  include: {
    user: { select: { fullName: true; username: true; role: true; id: true } };
    tag: true;
  };
}>;

export const getAllUserPosts = async (
  username: string,
  searchQuery: string = ""
): Promise<PostWithUserAndTag[]> => {
  const posts = await prisma.post.findMany({
    where: {
      user: { username },
      title: { contains: searchQuery, mode: "insensitive" },
    },
    include: {
      user: {
        select: { fullName: true, username: true, role: true, id: true },
      },
      tag: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

export const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      user: {
        select: { fullName: true, username: true, role: true, id: true },
      },
      tag: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
};

export const getPostBySlug = async (
  slug: string
): Promise<PostWithUser | null> => {
  const post = await prisma.post.findFirst({
    where: { slug },
    include: {
      user: {
        select: { fullName: true, username: true, role: true, id: true },
      },
    },
  });

  return post;
};
