import {
  Container,
  FirstPost,
  NotFoundBlog,
  NotFoundPosts,
  Post,
  PostTools,
  SearchInput,
} from "@/components/shared";
import { NotAuth } from "@/components/shared/not-auth";
import { getUserSession } from "@/lib";
import { Api } from "@/services";
import { getBlogByUsername } from "@/services/blogs";
import Link from "next/link";
import React from "react";

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

export const revalidate = 60;

export const dynamicParams = true;

export default async function Home({ searchParams }: Props) {
  const session = await getUserSession();

  if (!session) {
    return (
      <NotAuth
        className="mt-32"
        title="Ви не авторизовані!"
        text="Щоб створити блог та почати писати пости вам потрібно авторизуватися"
      />
    );
  }

  const searchQuery = searchParams?.q || null;

  const blog = await getBlogByUsername(session.username);

  if (!blog) {
    return (
      <NotFoundBlog
        className="mt-32"
        title="Ви ще не створили свій блог"
        text="Щоб почати писати статті потрібно створити свій власний блог"
      />
    );
  }

  const posts = await Api.posts.getAllUserPosts(
    session.username,
    searchQuery || ""
  );

  if (posts.length === 0 && !searchQuery) {
    return (
      <NotFoundPosts
        className="mt-32"
        title="Ви ще не створили жодного посту"
        text="Створіть хочаб один пост і він буде відображатись тут"
      />
    );
  }

  return (
    <Container>
      <div className="flex items-center mb-5 justify-between">
        <h1 className="text-3xl font-bold">Ваш блог</h1>

        <SearchInput className="h-[44px] w-[390px]" basePath="" />
      </div>
      {posts.length === 0 && searchQuery ? (
        <NotFoundPosts
          title={`Постів по запросу "${searchQuery}" не знайдено`}
          text="Спробуйте інші параметри пошуку"
        />
      ) : (
        <>
          <div className="relative group">
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
              />
            </Link>
            <PostTools
              className="absolute top-3 gap-3 p-2 px-3 transition-opacity [transition:all_.2s_ease-in-out] duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-y-[3px] "
              slug={posts[0].slug}
              username={blog.username}
            />
          </div>
          <div className="grid grid-cols-[repeat(2,_48%)] gap-[40px]">
            {posts.slice(1).map((post, index) => (
              <div
                style={{ animationDelay: `${0.12 * (index + 1)}s` }}
                key={post.id}
                className="relative group animate"
              >
                <Link href={`/${blog.username}/posts/${post.slug}`}>
                  <Post
                    title={post.title}
                    description={post.description}
                    imageUrl={post.imageUrl}
                    tag={post.tag}
                  />
                </Link>

                <PostTools
                  className="absolute top-3 gap-3 p-2 px-3 transition-opacity [transition:all_.2s_ease-in-out] duration-300 opacity-0 group-hover:opacity-100 group-hover:-translate-y-[3px] "
                  slug={posts[0].slug}
                  username={blog.username}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}
