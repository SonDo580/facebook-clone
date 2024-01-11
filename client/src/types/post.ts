import { Reaction } from "@/constants";
import { User, UserRef } from "./user";

type ReactionMap = Record<keyof typeof Reaction, UserRef[]>;

type Post = {
  _id: string;
  author: Partial<User>;
  content: string;
  images: string[];
  reactions: ReactionMap;
  updatedAt: Date;
};

type PostRef = string | Partial<Post>;

export type { ReactionMap, Post, PostRef };
