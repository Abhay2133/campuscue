import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen items-center flex flex-col justify-center gap-3">
      <h1 className="text-2xl">Campus-Cue</h1>
      <Link href="/auth/login">
        <Button>Login</Button>
      </Link>
      <Link href="/qna">
        <Button>QnA</Button>
      </Link>
    </div>
  );
}
