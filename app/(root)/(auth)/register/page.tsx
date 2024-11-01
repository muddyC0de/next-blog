import { Container, WhiteBlock } from "@/components/shared";
import { RegisterForm } from "@/components/shared/auth/form/register-form";
import { getUserSession } from "@/lib";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Next Blog | Реєстрація",
  description: "...",
};

export default async function RegisterPage() {
  const session = await getUserSession();
  if (session) {
    return redirect("/");
  }
  return (
    <Container className="flex justify-center ">
      <WhiteBlock className="w-1/2 h-max animate will-change-transform">
        <div className="flex flex-col p-10">
          <h1 className="text-[28px] font-bold mb-0">Реєстрація</h1>
          <p className="text-gray-400 text-[17px] mb-10">
            Заповніть форму нижче для реєстрації
          </p>

          <RegisterForm />
        </div>
      </WhiteBlock>
    </Container>
  );
}
