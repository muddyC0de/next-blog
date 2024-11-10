import { prisma } from "@/prisma/prisma-client";

export const getAllBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    include: {
      user: true,
    },
  });
  return blogs;
};

export const getBlogByUsername = async (username: string) => {
  const blog = await prisma.blog.findFirst({
    where: { username },

    include: {
      user: true,
    },
  });
  return blog;
};
