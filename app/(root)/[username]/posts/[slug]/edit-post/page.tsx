import { Container } from "@/components/shared";
import { EditPostForm } from "@/components/shared/edit-post/form/edit-post-form";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Next Blog | Редагування публікації",
  description: "...",
};

export default async function EditPostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const session = await getUserSession();

  if (!session) {
    return redirect("/login");
  }

  const post = await prisma.post.findFirst({
    where: {
      slug,
      blog: {
        userId: Number(session.id),
      },
    },

    include: {
      tag: true,
    },
  });

  if (String(post?.userId) !== session.id) {
    return redirect("/");
  }

  if (!post) {
    return redirect("/");
  }

  const tags = await prisma.tag.findMany({
    where: {
      blogId: post.blogId,
    },
  });

  return (
    <Container>
      <EditPostForm className="animate" post={post} tags={tags} />
    </Container>
  );
}
