import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

export const WhiteBlock: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "rounded-[20px] [box-shadow:0_60px_30px_hsla(0,_0%,_40%,_.05)] bg-[#fff]",
        className
      )}
    >
      {children}
    </div>
  );
};
