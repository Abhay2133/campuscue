"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { QuestionForm, questionSchema } from "./form";
import { z } from "zod";
import { toast } from "sonner";
import { createNewQuestion } from "@/services/qnaService";
import { errorToast } from "@/utils/errors";

export default function AskPage() {
  return (
    <>
      <Header />
      <Ask />
    </>
  );
}

const Header = () => {
  return (
    <header className="flex h-[60px] items-center px-3 relative">
      <Link href="/qna">
        <Button
          variant={"ghost"}
          className="border h-[40px] w-[40px] rounded-full md:absolute left-3 top-3"
        >
          <ArrowLeft size={30} />
        </Button>
      </Link>
      <h1 className="text-xl text-center mx-auto">Ask a Question</h1>
    </header>
  );
};

const Ask = () => {
  const handleSubmit = async (values: z.infer<typeof questionSchema>) => {
    console.log(values);
    try {
      const { title, body } = values;
      const res = await createNewQuestion(title, body);
      if (res.status < 400) {
        toast(`Question Created Successfully`);
      } else {
        const e = await res.json();
        errorToast(`Failed to create questions`, e);
      }
    } catch (error: unknown) {
      if (!(error instanceof Error)) return;
      console.error(error);
      errorToast("Error while creating question", error);
    }
  };

  return (
    <main className="p-5">
      <div className=" max-w-[500px] mx-auto bg-primary-foreground p-5 rounded border shadow">
        <QuestionForm
          onSubmit={handleSubmit}
          defaultValues={{
            title: "",
            body: "",
          }}
        />
      </div>
    </main>
  );
};
