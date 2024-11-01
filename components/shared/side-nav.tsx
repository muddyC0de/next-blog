"use client";

import { cn } from "@/lib/utils";
import { House, LucideIcon, PencilLine, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  className?: string;
}

type LinkType = {
  icon: LucideIcon;
  link: string;
};

const links: LinkType[] = [
  { icon: House, link: "/" },
  { icon: Users, link: "/blogs" },
  { icon: PencilLine, link: "/create-post" },
  { icon: Settings, link: "/settings/profile" },
];

export const SideNav: React.FC<Props> = ({ className }) => {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        className,
        "px-16 flex flex-col items-center py-[42px] justify-between top-0  h-full fixed"
      )}
    >
      <ul className="flex flex-col gap-4">
        {links.map((item) => (
          <Link href={item.link} key={item.link}>
            {" "}
            <li
              className={cn(
                "p-3 cursor-pointer rounded-2xl text-slate-600 hover:text-primary  hover:bg-[hsl(165,74%,90%)] duration-200 active:scale-90",
                pathname.startsWith("/settings") &&
                  item.link.startsWith("/settings")
                  ? "bg-[hsl(165,74%,90%)] text-primary"
                  : pathname === item.link &&
                      "bg-[hsl(165,74%,90%)] text-primary"
              )}
            >
              {<item.icon size={25} />}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
