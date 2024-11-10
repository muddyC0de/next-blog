import { Container, WhiteBlock } from "@/components/shared";
import { LoginForm } from "@/components/shared/auth/form/login-form";
import { getUserSession } from "@/lib";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Next Blog | Вхід",
  description: "...",
};

export default async function LoginPage() {
  const session = await getUserSession();

  if (session) {
    return redirect("/");
  }
  return (
    <Container className="flex justify-center ">
      <WhiteBlock className="w-1/2 h-max animate will-change-transform">
        <div className="flex flex-col p-10">
          <h1 className="text-[28px] font-bold mb-0">Вхід в аккаунт</h1>
          <p className="text-gray-400 text-[17px] mb-10">
            Заповніть форму нижче для входу
          </p>

          <LoginForm />
        </div>
      </WhiteBlock>
    </Container>
  );
}
