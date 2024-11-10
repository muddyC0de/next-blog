import Image from "next/image";
import { cn } from "@/lib/utils";
import { Tag } from "@prisma/client";
import React from "react";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  tag: Tag;
  isShowTools?: boolean;
  className?: string;
}

export const Post: React.FC<Props> = ({
  title,
  description,
  imageUrl,
  tag,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex group cursor-pointer h-auto flex-col   will-change-transform rounded-[15px] сursor-pointer  transition-all duration-300 bg-white  border-[1px] border-[solid] border-[#f4f3f3] hover:border-[#eae8e8]  hover:-translate-y-[3px] hover:[box-shadow:0_50px_50px_-20px_rgba(50,_50,_93,_.03),_0_30px_10px_-30px_rgba(0,_0,_0,_.06)]",
        className
      )}
    >
      <div className="relative h-[260px]">
        <Image
          src={imageUrl}
          alt={title}
          sizes="100vw"
          fill
          className="w-full z-10   rounded-t-[15px] object-cover"
        />

        <Image
          src={imageUrl}
          alt={title}
          sizes="100vw"
          fill
          className="[transition:all_.15s_ease-in-out]  opacity-0 group-hover:opacity-35 !w-[95%] h-full object-cover absolute !left-[49%] !top-[10px] !-translate-x-1/2 filter blur-[25px] saturate-[12] "
        />
      </div>

      <div className="pt-[25px] px-[30px] pb-[30px] ">
        <div className="inline-block">
          <i
            style={{ backgroundColor: tag.color }}
            className="h-[10px] w-[10px] mr-[10px] rounded-full inline-block "
          ></i>
          {tag.title}
        </div>

        <h2 className="font-extrabold break-words text-[25px] mt-[15px] mb-[10px] text-black">
          {title}
        </h2>
        <p className="break-words [-webkit-box-orient: vertical] h-auto [-webkit-line-clamp: 2] line-clamp-3 overflow-hidden text-ellipsis [display: -webkit-box]">
          {description}
        </p>
      </div>
    </div>
  );
};
