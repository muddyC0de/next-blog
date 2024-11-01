import { cn } from "@/lib/utils";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallback } from "@/lib/get-avatar-fallback";

interface Props {
  fullName: string;
  title: string;
  description: string;
  date?: Date;
  tag: string;
  className?: string;
}

export const BlogItem: React.FC<Props> = ({
  fullName,
  title,
  description,
  date,
  tag,
  className,
}) => {
  const avatarFallback = getAvatarFallback(fullName);

  return (
    <div
      className={cn(
        "flex cursor-pointer h-auto flex-col  will-change-transform rounded-[15px] сursor-pointer  transition-all duration-300 bg-white border-[1px] border-[solid] border-[#f7f8f8] hover:border-[#eae8e8]  hover:-translate-y-[3px] hover:[box-shadow:0_50px_50px_-20px_rgba(50,_50,_93,_.03),_0_30px_10px_-30px_rgba(0,_0,_0,_.06)]",
        className
      )}
    >
      <div className="pt-[25px] px-[30px] pb-[30px] gap-2 flex flex-col">
        <div className="flex items-center">
          <Avatar className="mr-2 h-[30px] w-[30px]">
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <span className="text-[16px]">{fullName}</span>
        </div>

        <h2 className="font-extrabold text-[25px] text-black">{title}</h2>
        <p className="">{description}</p>
      </div>
    </div>
  );
};
