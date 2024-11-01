import React from "react";
import { Container } from "./container";
import { WhiteBlock } from "./white-block";
import { Post, Tag } from "@prisma/client";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getAvatarFallback } from "@/lib/get-avatar-fallback";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MiniPost } from "./mini-post";

interface Props {
  username: string;
  title: string;
  description: string;
  fullName: string;
  posts: PostWithTag[];
  date: Date;
  className?: string;
}

export interface PostWithTag extends Post {
  tag: Tag;
}

export const Blog: React.FC<Props> = ({
  username,
  title,
  description,
  fullName,
  posts,
  date,
  className,
}) => {
  const avatarFallback = getAvatarFallback(fullName);
  return (
    <Container className="mb-6 animate">
      <WhiteBlock className="p-8 flex flex-col gap-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-[16px] font-medium">
            Дата створення: {date.toLocaleDateString()}
          </span>
        </div>

        <h1 className="text-3xl font-bold">{title} </h1>
        <div>
          <p className="text-lg">{description}</p>
        </div>
      </WhiteBlock>

      <WhiteBlock className="p-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold mb-2 flex items-center justify-between">
          Останні публікації{" "}
          <Link href={`/blogs/${username}/posts`}>
            {" "}
            <span className="text-primary text-[16px] font-medium cursor-pointer flex items-center">
              Переглянути усі
              <ArrowRight size={18} className="ml-1" />
            </span>
          </Link>
        </h1>
        <div className="flex flex-col gap-4">
          {posts.map((post, index) => (
            <Link
              style={{ animationDelay: `${0.06 * (index + 1)}s` }}
              key={post.id}
              className="animate"
              href={`/${username}/posts/${post.slug}`}
            >
              <MiniPost
                title={post.title}
                description={post.description}
                tag={post.tag}
              />
            </Link>
          ))}
        </div>
      </WhiteBlock>
    </Container>
  );
};
