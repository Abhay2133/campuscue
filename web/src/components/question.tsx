import { ReactNode, useEffect, useState } from "react";
import { fetchQuestionById } from "@/services/qnaService";
import { ArrowDown, ArrowUp, } from "lucide-react";
import Loader from "./loader";
import { QuestionType } from "@/types/qna";
import { Button } from "./ui/button";

export const Question = ({ id }: { id: string }) => {
  const [question, setQuestion] = useState<QuestionType>({
    _id: "674f358cb2eca78252f67972",
    title: "How to pass an exam without studing ?",
    body: "I don't have much time to study such a vast syllabus, so I need a tips on complete the whole syllabus in one night.",
    user: {
      _id: "674f34cfb2eca78252f6796b",
      name: "Abhay",
      email: "abhay123@gmail.com",
    },
    votes: 0,
    createdAt: "2024-12-03T16:45:00.322Z",
    updatedAt: "2024-12-03T16:45:00.322Z",
  });
  const [loader, setLoader] = useState<ReactNode | null>(
    <Loader message="Loading Question" />
  );

  const _loadData = async () => {
    try {
      setLoader(<Loader message="Loading Question" />);
      const res = await fetchQuestionById(id);
      if (res.status < 400) {
        const data = await res.json();
        setQuestion({ ...data });
        setLoader(null);
      } else {
      }
    } catch (error: unknown) {
      if (!(error instanceof Error)) return;
      console.error(error);
      setLoader(
        <center>
          Failed to Load question
          <br />
          <Button variant={"outline"} onClick={_loadData}>
            Retry
          </Button>
        </center>
      );
    }
  };

  useEffect(() => {
    _loadData();
  }, []);

  return <>{loader ? loader : <QuestionView question={question} />}</>;
};

const QuestionView = ({ question }: { question: Partial<QuestionType> }) => {
  return (
    <div className="border rounded shadow-md bg-primary-foreground p-5 flex flex-col gap-3 ">
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

        {/* Question Header */}
        <div className="flex gap-3 items-center">
          <div className="shadow-md h-[30px] w-[30px] rounded-full bg-secondary"></div>
          <div>{question?.user?.name}</div>
        </div>
      </div>
    </div>
  );
};
