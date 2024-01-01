import { Reaction as ReactionType } from "@/constants";
import { UserRef } from "./user";

type Reaction = {
  reactionType: ReactionType;
  user: UserRef;
};

type Post = {
  author: UserRef;
  content: string;
  images: string[];
  reactions: Reaction[];
};

type PostRef = string | Partial<Post>;

export type { Post, PostRef };
