export const getAvatarFallback = (fullName: string) => {
  const [firstName, lastName] = fullName.split(" ");
  return lastName ? `${firstName?.[0]}${lastName?.[0]}` : firstName?.[0];
};
