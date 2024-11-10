import slugify from "slugify";

export async function generateUniqueSlug(title: string) {
  const slugBase = slugify(title, { lower: true });

  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  const uniquePart = Array(4)
    .fill(0)
    .map(() => characters.charAt(Math.floor(Math.random() * 62)))
    .join("");

  return `${slugBase}-${uniquePart}`;
}
