"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import autoAnimate from "@formkit/auto-animate";
import { ErrorText } from "./error-text";

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
}

export const PostTextarea: React.FC<Props> = ({
  className,
  name,
  ...props
}) => {
  const ref = React.useRef<HTMLTextAreaElement>(null);
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorText = errors[name]?.message as string;

  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.cssText = "height:auto; padding:0";
      ref.current.style.cssText = "height:" + ref.current.scrollHeight + "px";
      ref.current.addEventListener("input", () => {
        setTimeout(function () {
          if (ref.current) {
            ref.current.style.cssText = "height:auto; padding:0";
            ref.current.style.cssText =
              "height:" + ref.current.scrollHeight + "px";
          }
        }, 1);
      });
    }
  }, []);
  const formRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (formRef.current) {
      autoAnimate(formRef.current);
    }
  }, []);
  return (
    <div ref={formRef}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <textarea
            rows={1}
            autoComplete="off"
            {...field}
            {...props}
            ref={ref}
            onInput={() => field.onChange(ref.current?.value)}
            className={cn(
              "border-none w-full focus-visible:outline-none p-0 font-extrabold bg-transparent text-[36px] resize-none leading-[46px]",
              className
            )}
          />
        )}
      />
      {errorText && <ErrorText text={errorText} />}
    </div>
  );
};
