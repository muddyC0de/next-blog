import { uploadImage } from "@/app/actions";
import React from "react";
export const handleImageChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  form: any,
  setLoadingImage: (loading: boolean) => void
) => {
  const file = event.target.files ? event.target.files[0] : null;
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  setLoadingImage(true);
  const imageUrl = await uploadImage(formData);

  form.setValue("imageUrl", imageUrl);
  setLoadingImage(false);
};
