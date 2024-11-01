import { cn } from "@/lib/utils";
import { Tag } from "@prisma/client";
import React from "react";

interface Props {
  className?: string;
  title: string;
  description: string;
  tag: Tag;
}

export const MiniPost: React.FC<Props> = ({
  title,
  description,
  tag,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer h-auto flex-col  will-change-transform rounded-[15px] сursor-pointer  transition-all duration-300 bg-white border-[1px] border-[solid] border-[#f7f8f8] hover:border-[#eae8e8]  hover:-translate-y-[3px] hover:[box-shadow:0_50px_50px_-20px_rgba(50,_50,_93,_.03),_0_30px_10px_-30px_rgba(0,_0,_0,_.06)]",
        className
      )}
    >
      <div className="pt-[25px] px-[30px] pb-[30px]  flex flex-col gap-1">
        <div className="inline-block">
          <i
            style={{ backgroundColor: tag.color }}
            className="h-[10px] w-[10px] mr-[10px] rounded-full inline-block "
          ></i>
          {tag.title}
        </div>

        <h2 className="font-extrabold text-[25px]  text-black">{title}</h2>
        <p className="[-webkit-box-orient: vertical] h-auto [-webkit-line-clamp: 2] line-clamp-3 overflow-hidden text-ellipsis [display: -webkit-box]">
          {description}
        </p>
      </div>
    </div>
  );
};
