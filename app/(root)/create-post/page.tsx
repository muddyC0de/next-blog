import { Container } from "@/components/shared";
import { CreatePostForm } from "@/components/shared/create-post";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Blog | Створення публікації",
  description: "...",
};

export default async function CreatePost() {
  const session = await getUserSession();

  if (!session) {
    return redirect("/login");
  }

  const blog = await prisma.blog.findFirst({
    where: {
      userId: Number(session.id),
    },
  });

  if (!blog) {
    return redirect("/create-blog");
  }

  const tags = await prisma.tag.findMany({
    where: {
      blogId: blog.id,
    },
  });

  return (
    <Container>
      <CreatePostForm tags={tags} />
    </Container>
  );
}
