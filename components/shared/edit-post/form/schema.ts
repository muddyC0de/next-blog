import { z } from "zod";
import { createPostFormSchema } from "../../create-post/form/schema";

export const editPostFormSchema = createPostFormSchema;

export type TEditPostFormValues = z.infer<typeof createPostFormSchema>;
