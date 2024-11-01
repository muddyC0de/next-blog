"use client";

import { deletePost } from "@/app/actions";
import { cn } from "@/lib/utils";
import { LoaderCircle, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  slug: string;
  username: string;
  className?: string;
}

export const PostTools: React.FC<Props> = ({ slug, username, className }) => {
  const [isClient, setIsClient] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const removePost = async () => {
    try {
      setLoading(true);
      await deletePost(slug);
      setLoading(false);

      toast.success("Пост видалено");
    } catch (error) {
      console.error(error);
      toast.error("Помилка видалення поста");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "bg-white border-[1px] border-[solid] border-[#f4f3f3] rounded-xl flex items-center  z-10 right-3",
        className
      )}
    >
      {isClient && (
        <Link href={`/${username}/posts/${slug}/edit-post`}>
          <Pencil size={20} className="hover:text-primary duration-300" />
        </Link>
      )}
      {isClient &&
        (loading ? (
          <LoaderCircle size={20} className="animate-spin" />
        ) : (
          <div className="z-10 cursor-pointer" onClick={() => removePost()}>
            <Trash2 size={20} className="hover:text-red-500 duration-300" />
          </div>
        ))}
    </div>
  );
};
