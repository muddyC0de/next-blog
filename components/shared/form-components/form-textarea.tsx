"use client";

import { useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";
import autoAnimate from "@formkit/auto-animate";
interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  isClearable?: boolean;
  required?: boolean;
  className?: string;
}

export const FormTextarea: React.FC<Props> = ({
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
        <Textarea
          className={cn(
            "h-12 border-solid rounded-xl border-input border text-md",
            className
          )}
          {...register(name)}
          {...props}
        />
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
