"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import autoAnimate from "@formkit/auto-animate";
import { RequiredSymbol } from "../required-symbol";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  isClearable?: boolean;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  isClearable = true,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "");
  };

  const formRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (formRef.current) {
      autoAnimate(formRef.current);
    }
  }, []);

  return (
    <div ref={formRef}>
      <p className="font-medium mb2">
        {label} {required && <RequiredSymbol />}
      </p>

      <div className="relative">
        <Input
          className={cn(
            "h-12 border-solid rounded-xl border-input border text-md",
            className
          )}
          {...register(name)}
          {...props}
        />
        {value && isClearable && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
