"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { RequiredSymbol } from "../required-symbol";
import { useFormContext } from "react-hook-form";
import autoAnimate from "@formkit/auto-animate";
import { ErrorText } from "../error-text";

interface Props {
  items: { name: string; value: string }[];
  name: string;
  label?: string;
  required?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const FormSelect: React.FC<Props> = ({
  items,
  label,
  name,
  required,
  defaultValue,
  onChange,
  className,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;

  const formRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (formRef.current) {
      autoAnimate(formRef.current);
    }
  }, []);

  return (
    <div>
      <p className="font-medium ">
        {label} {required && <RequiredSymbol />}
      </p>
      <Select
        defaultValue={defaultValue}
        {...register(name)}
        onValueChange={onChange}
      >
        <SelectTrigger className="">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((select) => (
            <SelectItem key={select.value} value={select.value}>
              {select.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div ref={formRef}>
        {errorText && <ErrorText text={errorText} className="mt-2" />}
      </div>
    </div>
  );
};
