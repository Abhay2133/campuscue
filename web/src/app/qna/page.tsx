"use client";

import { Button } from "@/components/ui/button";
import { fetchLatestQuestions } from "@/services/qnaService";
import { QuestionType } from "@/types/qna";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";


export default function QnAPage() {
  return (
    <div className="">
      <Header />
      <Questions />
    </div>
  );
}

const Retry = ({ onClick }: { onClick: () => void }) => (
  <div className="flex items-center flex-col gap-3">
    <div>Failed to load questions !</div>
    <Button onClick={onClick}>Retry</Button>
  </div>
);

const Loader = () => (
  <div className="flex flex-col gap-3 py-10 items-center">
    <Loader2 className=" animate-spin" size={30} />
    <div>Loading</div>
  </div>
);

function Questions() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loader, setLoader] = useState<ReactNode | null>(Loader);

  const _loadData = async () => {
    setLoader(Loader);
    try {
      const res = await fetchLatestQuestions();
      if (res.status < 400) {
        const data = await res.json();
        setQuestions(data);
        setLoader(null);
      } else {
        toast("Failed to load questions");
        setLoader(
          <Retry
            onClick={() => {
              _loadData();
            }}
          />
        );
      }
    } catch (e) {
      if (!(e instanceof Error)) return;
      console.error(e);
      toast(`Error while loading questions`);
      setLoader(
        <Retry
          onClick={() => {
            _loadData();
          }}
        />
      );
    }
  };

  useEffect(() => {
    _loadData();
  }, []);

  return (
    <div className="flex flex-col max-w-[500px] gap-3 mx-auto p-3">
      {loader ? (
        loader
      ) : (
        <>
          {questions.map((question, i) => (
            <Question question={question} key={i} />
          ))}
        </>
      )}
    </div>
  );
}

function Question({ question }: { question: QuestionType }) {
  return (
    <div className="border rounded shadow-md bg-primary-foreground p-5 flex flex-col gap-3 ">
      {/* Question Header */}
      <div className="flex gap-3 items-center">
        <div className="shadow-md h-[40px] w-[40px] rounded-full bg-secondary"></div>
        <div>{question.user.name}</div>
      </div>

      {/* Body => Title + text */}
      <div className="font-semibold">{question.title}</div>
      <div>{question.body}</div>

      {/* Vote and Details */}
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <Button variant={"ghost"} className="w-[30px] rounded-full border">
            <ArrowUp size={20} />
          </Button>
          <div>{question.votes}</div>
          <Button variant={"ghost"} className="w-[30px] rounded-full border">
            <ArrowDown size={20} />
          </Button>
        </div>

        <Link href={`/qna/${question._id}`}>
          <Button variant={"outline"}> Answers</Button>
        </Link>
      </div>
    </div>
  );
}

const Header = () => {
  return (
    <header className="flex h-[60px] items-center px-5 relative">
      <h1 className="text-xl text-center md:mx-auto">QnA Section</h1>
      <Link href="/qna/ask">
        <Button className="ml-auto absolute right-3 top-3">Ask Question</Button>
      </Link>
    </header>
  );
};
