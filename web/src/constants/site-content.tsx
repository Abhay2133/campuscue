import { SidebarLink } from "@/types/site-content.types";
import { CircleCheckBig, IdCard, Newspaper, Users2 } from "lucide-react";

export const sidebar_links: SidebarLink[] = [
  {
    label: "Feeds",
    href: "/feeds",
    icon: <Newspaper size={10} />,
  },
  {
    label: "Posts",
    href: "/posts",
    icon: <IdCard size={10} />,
  },
  {
    label: "QnA",
    href: "/qna",
    icon: <CircleCheckBig size={10} />,
  },
  {
    label: "Communitites",
    href: "/communities",
    icon: <Users2 size={10} />,
  },
];
