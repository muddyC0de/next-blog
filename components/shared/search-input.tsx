"use client";
import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "react-use";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className: string;
  basePath: string;
  onSearchChange?: (q: string, value: string) => void;
}

export const SearchInput: React.FC<Props> = ({
  onSearchChange,
  basePath,
  className,
}) => {
  const router = useRouter();

  const [searchValue, setSearchValue] = React.useState<string | null>(null);
  const [query, setQuery] = React.useState("");

  const debouncedSearchValue = useDebounce(
    () => setQuery(searchValue || ""),
    300,
    [searchValue]
  );

  const pathName = usePathname();
  const q = useSearchParams();

  const currentPath = basePath ? basePath : pathName.split("/").pop();
  const defaultValue = q.get("q") || "";

  React.useEffect(() => {
    if (query) {
      router.push(`/${currentPath}?q=${searchValue}`);
    } else if (!query && searchValue === "") {
      router.push(`/${currentPath}`);
    }
  }, [query, router, currentPath, searchValue]);

  const handleSearch = (value: string) => {
    onSearchChange ? onSearchChange("q", value) : setSearchValue(value);
  };

  return (
    <div className="relative">
      <Input
        className={cn(
          "bg-white pl-9 text-[15px] rounded-xl w-[430px] border-[1px] border-[#f4f3f3]",
          className
        )}
        defaultValue={defaultValue}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        placeholder="Пошук..."
      />

      <Search
        size={18}
        className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400"
      />
    </div>
  );
};
