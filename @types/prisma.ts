import { Post, Tag } from "@prisma/client";

export interface TagUpdateInput {
  id: number;
  title: string;
  color: string;
}

export interface TagCreateInput {
  title: string;
  color: string;
}

export interface CreatePostValues {
  title: string;
  description: string;
  tag: Tag;
  text: string;
  imageUrl: string;
}

export interface PostWithUser extends Post {
  user: {
    fullName: string;
    username: string;
    id: number;
    role: string;
  };
}
