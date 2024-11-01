import { BlogForm } from "@/components/shared/settings/forms/blog-form";
import { getUserSession } from "@/lib";
import { prisma } from "@/prisma/prisma-client";

export default async function BlogPage() {
  const session = await getUserSession();

  if (!session) {
    return null;
  }

  const blog = await prisma.blog.findFirst({
    where: {
      userId: Number(session.id),
    },
  });

  if (!blog) {
    return null;
  }

  return <BlogForm data={blog} />;
}
