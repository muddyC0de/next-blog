import React from "react";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "./container";

interface Props {
  title: string;
  text: string;
  className?: string;
}

export const NotFoundPosts: React.FC<Props> = ({ className, title, text }) => {
  return (
    <Container className={cn("animate", className)}>
      <div
        className={cn(
          className,
          "flex items-center  flex-wrap content-center gap-12"
        )}
      >
        <div className="flex gap-2 flex-col">
          <h1 className="font-extrabold text-3xl">{title}</h1>
          <p className="text-gray-400 text-lg">{text}</p>

          <div className="flex gap-5 ">
            <Link href="/create-post">
              <Button variant="outline" className="gap-2">
                <Pencil size={18} />
                Створити пост
              </Button>
            </Link>
            <a href="">
              <Button
                variant="outline"
                className="text-gray-500 border-gray-400 hover:bg-gray-50"
              >
                Оновити
              </Button>
            </a>
          </div>
        </div>

        <img src="/assets/images/not-found-posts.svg" alt={title} width={250} />
      </div>
    </Container>
  );
};
