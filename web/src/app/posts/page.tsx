"use client";

import Header from "@/components/header";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { getPostsURL } from "@/constants/api";
import { fetcher } from "@/lib/utils";
import { PostType } from "@/types/qna";
import { ArrowBigUp, Search } from "lucide-react";
import { useEffect } from "react";
// import Link from "next/link";
import useSWR from "swr";

export default function PostsPage() {
  const { setActiveIndex } = useSidebar();
  useEffect(() => {
    setActiveIndex(1);
  }, []);

  return (
    <div>
      <Header className="items-center py-3">
        <div>Posts</div>
        <div className="ml-auto">
          <Search />
        </div>
      </Header>
      <main className="mx-auto max-w-[600px] min-h-screen">
        <Posts />
      </main>
    </div>
  );
}

const Posts = () => {
  const { data, error, mutate, isValidating } = useSWR(getPostsURL, fetcher);

  if (error)
    return (
      <div className="text-center">
        <p className="text-red-600">Failed to load Posts</p>
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
  if (!data) return <Loader message="Loading Posts" />;
  return (
    <div className="flex flex-col gap-3 px-3">
      {(data as PostType[]).map((post, i) => (
        <PostView key={i} post={post} />
      ))}
    </div>
  );
};

const PostView = ({ post }: { post: PostType }) => {
  return (
    <div className="border shadow rounded-lg p-5 bg-primary-foreground flex flex-col gap-3">
      {/* User details */}

      <div className="flex gap-3 items-center">
        <div className="h-[40px] w-[40px] rounded-full border shadow-md"></div>
        <div>{post?.user.name}</div>
      </div>

      {/* Titlte + body*/}
      <div>{post.title}</div>
      <div>{post.body}</div>

      {/* Footer */}
      <div className="flex">
        {/* Voting */}
        <div className="flex gap-2 items-center">
          <Button
            variant={`outline`}
            className="active:scale-95 h-[30px] w-[40px] rounded"
          >
            {/* <Button variant={`ghost`}> */}
            <ArrowBigUp size={20} />
          </Button>
          <div>{post.likes}</div>
          <Button
            variant={`outline`}
            className="h-[30px] w-[40px] rounded active:scale-95"
          >
            <ArrowBigUp className=" rotate-180" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

// const Header = () => {
//   return (
//     <header className="flex h-[60px] items-center px-5 relative">
//       <h1 className="text-xl text-center md:mx-auto">
//         <Link href="/qna">Posts</Link>
//       </h1>
//       {/* <Link href={`/qna/${id}/answer`}>
//         <Button className="ml-auto absolute right-3 top-3">Give Answer</Button>
//       </Link> */}
//     </header>
//   );
// };
