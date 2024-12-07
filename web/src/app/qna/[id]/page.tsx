"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Loader from "@/components/loader";
import { AnswerType } from "@/types/qna";
import { getAnswersURL } from "@/constants/api";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Triangle } from "lucide-react";
import { Question } from "@/components/question";
import SidebarHeader from "@/components/header";

export default function QuestionPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main>
      <Header id={id} />
      <div className=" max-w-[95%] md:max-w-[500px] mx-auto">
        <Question id={id} />
        {Answers(id)}
      </div>
    </main>
  );
}

const Header = ({ id }: { id: string }) => {
  return (
    <SidebarHeader className="flex h-[50px] items-center px-3 relative">
      <h1 className="text-xl text-center md:mx-auto">
        <Link href="/qna">QnA</Link>
      </h1>
      <Link href={`/qna/${id}/answer`}>
        <Button className="ml-auto absolute right-3 top-2">Give Answer</Button>
      </Link>
    </SidebarHeader>
  );
};

const Answers = (id: string) => {
  const { data, error, mutate, isValidating } = useSWR(
    getAnswersURL(id),
    fetcher
  );

  if (error)
    return (
      <div className="text-center">
        <p className="text-red-600">Failed to load Answers</p>
        <Button
          variant="outline"
          onClick={() => mutate()} // Retry fetching
          disabled={isValidating} // Disable if retry is in progress
          className="mt-4"
        >
          {isValidating ? "Retrying..." : "Retry"}
        </Button>
      </div>
    );
  if (!data) return <Loader message="Loading Answers" />;
  return (
    <div className="flex flex-col gap-3 py-5">
      <h2 className=" font-semibold">Answers</h2>
      {(data as AnswerType[]).map((answer, i) => (
        <AnswerView key={i} answer={answer} />
      ))}
    </div>
  );
};

const AnswerView = ({ answer }: { answer: AnswerType }) => {
  return (
    <div className="p-5 pl-1 border shadow flex flex-col gap-3 rounded-lg">
      {/* <code>{JSON.stringify(answer)}</code> */}

      {/* Votes */}
      {/* Answers */}
      <div className="flex gap-3 ">
        <div className="flex flex-col items-center">
          <Button variant={"ghost"} className="p-3 rounded-full">
            <Triangle size={20} />
          </Button>
          {answer.vote}
          <Button variant={"ghost"} className="p-3 rounded-full">
            <Triangle size={20} className=" rotate-180" />
          </Button>
        </div>
        <div className="flex-1 flex flex-col ">
          <div className="flex-1">{answer.body}</div>
          <div className="text-right px-5 opacity-50">
            answered by {answer.user.name}
          </div>
        </div>
      </div>
    </div>
  );
};
