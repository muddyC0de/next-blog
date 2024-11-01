"use client";

import { ImageUp, LoaderCircle } from "lucide-react";
import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import autoAnimate from "@formkit/auto-animate";

interface Props {
  name: string;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
  className?: string;
}

export const UploadButton: React.FC<Props> = ({
  name,
  onImageChange,
  loading,
  className,
}) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  const formRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (formRef.current) {
      autoAnimate(formRef.current);
    }
  }, []);

  const errorText = errors[name]?.message as string;
  const value = watch(name);
  console.log(value);
  return (
    <div ref={formRef} className={cn("flex flex-col", className)}>
      <Button
        className="flex gap-2 cursor-pointer relative items-center min-w-[196.22px]"
        variant="outline"
      >
        {loading ? (
          <LoaderCircle className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <ImageUp size={18} />
            {"Додати обкладинку"}
          </>
        )}
        <input
          onChange={(e) => onImageChange(e)}
          type="file"
          className="absolute top-0 left-0 w-full h-full opacity-0 z-10 text-[0] cursor-pointer"
          accept="image/*"
        />
      </Button>
      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
