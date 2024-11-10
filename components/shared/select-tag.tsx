"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import autoAnimate from "@formkit/auto-animate";
import { ErrorText } from "./error-text";
import { Tag } from "@prisma/client";
interface Props {
  items: Tag[];
  name: string;
  setShowColorPicker: () => void;
  defaultValue?: string;
  className?: string;
}

export const SelectTag: React.FC<Props> = ({
  items,
  name,
  setShowColorPicker,
  className,
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const tag = watch("tag");
  const tagColor = watch("tagColor");
  const errorText = errors[name]?.message as string;

  const onClickTag = (tag: Tag) => {
    setValue("tag", tag.title);
    setValue("tagColor", tag.color);
  };

  const formRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (formRef.current) {
      autoAnimate(formRef.current);
    }
  }, []);
  return (
    <div ref={formRef}>
      <div className="relative w-64 h-11">
        <Input
          {...register(name)}
          placeholder="Додайте або виберіть тег"
          className={cn(
            "pl-6 rounded-xl bg-transparent border-none",
            className
          )}
        ></Input>
        <div
          onClick={setShowColorPicker}
          style={{ backgroundColor: tagColor }}
          className={cn(
            "w-4 h-4 cursor-pointer absolute top-3 left-0 rounded-full border border-solid border-slate-800 mr-2"
          )}
        ></div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ChevronDown
              className="absolute cursor-pointer right-[8px] top-[12px]"
              size={18}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="bottom"
            className="w-[247.66px] "
          >
            {items.length === 0 && <p>Тегів немає</p>}
            {items.map((item, index) => (
              <DropdownMenuCheckboxItem
                key={index}
                checked={item.title === tag}
                onClick={() => onClickTag(item)}
                className="flex items-center"
              >
                <div
                  style={{ backgroundColor: item.color }}
                  className="w-4 h-4  rounded-full border border-solid border-slate-800 mr-2"
                ></div>
                {item.title}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {errorText && <ErrorText text={errorText} />}
    </div>
  );
};
