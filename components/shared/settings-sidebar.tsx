"use client";

import { cn } from "@/lib/utils";
import { LucideIcon, Pencil, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SettingsSidebarItem {
  text: string;
  href: string;
  icon: LucideIcon;
}

interface Props {
  className?: string;
}

const menuItems: SettingsSidebarItem[] = [
  { text: "Профіль", href: "/settings/profile", icon: User },
  { text: "Блог", href: "/settings/blog", icon: Pencil },
];

export const SettingsSidebar: React.FC<Props> = () => {
  const pathname = usePathname();
  return (
    <div className="mr-5 border-r border-gray-100">
      <ul className="flex flex-col">
        {menuItems.map((item) => (
          <Link href={item.href} key={item.href}>
            <li
              className={cn(
                "flex border-b hover:text-primary  border-gray-100 px-8 py-3 items-center gap-1 cursor-pointer transition-all duration-300 text-[18px]",
                pathname === item.href &&
                  "bg-secondary text-primary border-transparent"
              )}
            >
              <item.icon size={19} />
              {item.text}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
