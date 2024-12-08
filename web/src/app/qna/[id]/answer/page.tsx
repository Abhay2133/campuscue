"use client";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { SyntheticEvent, useState } from "react";
import { toast } from "sonner";
import { errorToast } from "@/utils/errors";
import { submitAnswerById } from "@/services/qnaService";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Question } from "@/components/question";
import SidebarHeader from "@/components/header";

export default function AnswerPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      {Header(id)}
      <div className=" mx-auto max-w-[95%] md:max-w-[500px]">
        <Question id={id} />
        {AnswerForm(id)}
      </div>
    </div>
  );
}

const Header = (id: string) => {
  return (
    <SidebarHeader className="flex h-[50px] items-center px-3 relative">
      <h1 className="text-xl text-center md:mx-auto">
        <Link href="/qna">Submit an Answer</Link>
      </h1>
      <Link href={`/qna/${id}`}>
        <Button className="ml-auto absolute right-3 top-3">Show Answers</Button>
      </Link>
    </SidebarHeader>
  );
};

const AnswerForm = (id: string) => {
  const [body, setBody] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (body.trim().length < 10)
      return toast(`Answer too short : min 10 letter`);
    try {
      const res = await submitAnswerById({ body, questionId: id });
      if (res.status < 400) {
        toast(`Answer submitted successfully`);
        router.replace(`/qna/${id}`);
      } else {
        const e = await res.json();
        errorToast(`Failed to submit answer`, e);
      }
    } catch (e: unknown) {
      if (!(e instanceof Error)) return;
      errorToast(`Answer submitting error`, e);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-3">
      <h2>Submit your answer</h2>
      <Textarea
        className="p-3 rounded border shadow"
        onChange={(e) => setBody(e.target.value)}
      />
      <Button type="submit" className="max-w-[100px]">
        Submit
      </Button>
    </form>
  );
};


