import { Container, SettingsSidebar, WhiteBlock } from "@/components/shared";
import { getUserSession } from "@/lib";
import { redirect } from "next/navigation";
import React from "react";
export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getUserSession();

  if (!session) {
    return redirect("/login");
  }

  return (
    <Container>
      <WhiteBlock className="flex animate">
        <SettingsSidebar />
        <div className="px-4 pb-7 py-3">{children}</div>
      </WhiteBlock>
    </Container>
  );
}
