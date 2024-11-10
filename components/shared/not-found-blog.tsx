"use client";

import React from "react";
import { Button } from "../ui/button";
import { Container } from "./container";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  title: string;
  text: string;
  className?: string;
}

export const NotFoundBlog: React.FC<Props> = ({ text, title, className }) => {
  return (
    <Container className="mt-40 animate">
      <div
        className={cn(
          className,
          "flex items-center justify-center flex-wrap content-center gap-12"
        )}
      >
        <div className="flex flex-col">
          <div className="w-[600px]">
            <h1 className="font-extrabold mb-1 text-4xl">{title}</h1>
            <p className="text-gray-400 text-lg">{text}</p>
          </div>

          <div className="flex gap-5 mt-5">
            <Link href="/create-blog">
              <Button variant="outline" className="gap-2">
                Створити блог
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

        <img src="/assets/images/not-found-blog.svg" alt={title} width={250} />
      </div>
    </Container>
  );
};
