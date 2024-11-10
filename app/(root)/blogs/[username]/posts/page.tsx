import { Container, FirstPost, Post } from "@/components/shared";
import { NotFoundPosts } from "@/components/shared/not-found-posts";
import { SearchInput } from "@/components/shared/search-input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/lib/get-avatar-fallback";
import { prisma } from "@/prisma/prisma-client";
import { Api } from "@/services";
import { Blog } from "@prisma/client";
import Link from "next/link";
import React from "react";

export interface BlogWithUser extends Blog {
  user: {
    fullName: string;
  };
}

type Props = {
  params: {
    username: string;
  };
};

export const revalidate = 60;

export const dynamicParams = true;

export async function generateMetadata({ params: { username } }: Props) {
  const user = await prisma.user.findFirst({
    where: { username },
  });

  return {
    title: `Next Blog | Публікації ${user?.fullName}`,
  };
}

export default async function PostsPage({
  params: { username },
  searchParams: { q },
}: {
  params: { username: string };
  searchParams: { q?: string };
}) {
  const searchQuery = q || null;
  const blog = await Api.blogs.getBlogByUsername(username);

  if (!blog) {
    return;
  }

  const posts = await Api.posts.getAllUserPosts(username, searchQuery || "");

  if (!posts.length && !searchQuery)
    return (
      <NotFoundPosts
        className="mt-32"
        title="Публікацій не знайдено"
        text="Користувач поки що не створив жодну публікацію"
      />
    );

  const avatarFallback = blog.user.fullName
    ? getAvatarFallback(blog.user.fullName)
    : "";

  return (
    <Container>
      <div className="flex items-center justify-between mb-5 ">
        <Link href={`/blogs/${blog.username}`}>
          <div className="flex bg-white border border-[solid] border-[#f4f3f3] rounded-2xl items-center py-2 px-4">
            <Avatar className="mr-2 h-[30px] w-[30px]">
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <span className="text-[18px]">{blog?.user?.fullName || ""}</span>
          </div>
        </Link>

        <div className="flex gap-3 items-center">
          <SearchInput
            basePath={`blogs/${username}/posts`}
            className="h-[44px]"
          />
        </div>
      </div>
      {posts.length === 0 && searchQuery ? (
        <NotFoundPosts
          title={`Постів по запросу "${searchQuery}" не знайдено`}
          text="Спробуйте інші параметри пошуку"
        />
      ) : (
        <>
          {" "}
          <Link
            className="animate delay-[.06s] inline-block w-[-webkit-fill-available]"
            href={`/${blog.username}/posts/${posts[0].slug}`}
          >
            <FirstPost
              className="mb-[40px] "
              title={posts[0].title}
              description={posts[0].description}
              imageUrl={posts[0].imageUrl}
              tag={posts[0].tag}
              isShowTools={false}
            />
          </Link>
          <div className="grid grid-cols-[repeat(2,_48%)] gap-[40px]">
            {posts.slice(1).map((post, index) => (
              <Link
                className="animate"
                style={{ animationDelay: `${0.06 * (index + 1)}s` }}
                key={post.id}
                href={`/${blog.username}/posts/${post.slug}`}
              >
                <Post
                  title={post.title}
                  description={post.description}
                  imageUrl={post.imageUrl}
                  tag={post.tag}
                  isShowTools={false}
                />
              </Link>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}
