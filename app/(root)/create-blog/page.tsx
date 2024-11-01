import { Container, WhiteBlock } from "@/components/shared";
import { CreateBlogForm } from "@/components/shared/create-blog/forms/create-blog-form";

export default function CreateBlogPage() {
  return (
    <Container className="flex justify-center ">
      <WhiteBlock className="w-1/2 h-max animate">
        <div className="flex flex-col p-10">
          <h1 className="text-[28px] font-bold mb-0">Створення блогу</h1>
          <p className="text-gray-400 text-[17px] mb-10">
            Заповніть форму нижче для створення блогу
          </p>

          <CreateBlogForm />
        </div>
      </WhiteBlock>
    </Container>
  );
}
