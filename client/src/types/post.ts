import { Reaction } from "@/constants";
import { UserRef } from "./user";

type ReactionMap = Record<keyof typeof Reaction, UserRef[]>;

type Post = {
  author: UserRef;
  content: string;
  images: string[];
  reactions: ReactionMap;
};

type PostRef = string | Partial<Post>;

export type { Post, PostRef };
