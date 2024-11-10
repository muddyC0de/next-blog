import { ProfileForm } from "@/components/shared/settings/forms/profile-form";
import { getUserSession } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next Blog | Налаштування",
  description: "...",
};

export default async function ProfilePage() {
  const session = await getUserSession();

  if (!session) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: Number(session.id),
    },
  });
  if (!user) {
    return null;
  }
  return <ProfileForm data={user} />;
}
