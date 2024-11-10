import { Container, WhiteBlock } from "@/components/shared";
import { Markdown } from "@/components/shared/markdown";
import { Avatar } from "@/components/ui";
import { AvatarFallback } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/lib";
import { getPublicationDate } from "@/lib/get-publication-date";
import { prisma } from "@/prisma/prisma-client";
import { Api } from "@/services";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

export const dynamicParams = true;

export default async function PostPage({ params: { slug } }: Props) {
  const post = await Api.posts.getPostBySlug(slug);

  if (!post) {
    return null;
  }

  const dateString = getPublicationDate(post.createdAt);

  const avatarFallback = getAvatarFallback(post.user.fullName);

  return (
    <Container>
      <WhiteBlock className="px-[90px]  py-[70px] ">
        <Link href={`/blogs/${post.user.username}`}>
          <div
            style={{ animationDelay: `0.06s` }}
            className="flex items-center will-change-transform animate cursor-pointer mb-3"
          >
            <Avatar className="mr-2 h-[35px] w-[35px]">
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <p className="text-[19px]">{post.user.fullName}</p>
          </div>
        </Link>

        <h1
          style={{ animationDelay: `0.12s` }}
          className="text-[36px] leading-[46px] animate  will-change-transform font-extrabold"
        >
          {post.title}
        </h1>
        <p
          style={{ animationDelay: `0.18s` }}
          className=" text-gray-400 font-normal will-change-transform animate"
        >
          {dateString}
        </p>
        <div
          style={{ animationDelay: `0.24s` }}
          className="animate will-change-transform"
        >
          <Markdown text={post.description} className="mt-10 break-words" />
        </div>
        <div
          style={{ animationDelay: `0.30s` }}
          className="animate will-change-transform"
        >
          <Markdown text={post.text} className="mt-10 break-words" />
        </div>
      </WhiteBlock>
    </Container>
  );
}

export async function generateMetadata({ params: { slug } }: Props) {
  const post = await prisma.post.findFirst({
    where: { slug },
  });

  return {
    title: `Next Blog | ${post?.title}`,
    description: post?.description,
  };
}
