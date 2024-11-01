import { Blog } from "@/components/shared/blog";
import { prisma } from "@/prisma/prisma-client";
import { Metadata } from "next";

type Props = {
  params: {
    username: string;
  };
};

export async function generateMetadata({ params: { username } }: Props) {
  const user = await prisma.user.findFirst({
    where: { username },
  });

  return {
    title: `Next Blog | ${user?.fullName}`,
  };
}

export default async function BlogPage({ params: { username } }: Props) {
  const blog = await prisma.blog.findFirst({
    where: { username },
    include: {
      user: { select: { fullName: true } },
      posts: {
        orderBy: { createdAt: "desc" },
        include: { tag: true },
        take: 3,
      },
    },
  });

  if (!blog) return null;

  return (
    <Blog
      username={blog.username}
      title={blog.title}
      description={blog.description}
      fullName={blog.user.fullName}
      date={blog.createdAt}
      posts={blog.posts}
    />
  );
}
