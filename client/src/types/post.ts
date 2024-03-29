import { Reaction } from "@/constants";
import { User, UserRef } from "./user";

type ReactionMap = Record<keyof typeof Reaction, UserRef[]>;

type Post = {
  _id: string;
  author: Partial<User>;
  content: string;
  images: string[];
  reactions: ReactionMap;
  updatedAt: string;
};

type PostRef = string | Partial<Post>;

type PostFormData = {
  content: string;
};

type UpdatePostPayload = {
  postId: string;
  data: PostFormData;
};

type DeletePostReturnType = { deletedPostId: string };

type ReactToPostPayload = {
  postId: string;
  reaction: Reaction | null;
};

export type {
  ReactionMap,
  Post,
  PostRef,
  PostFormData,
  UpdatePostPayload,
  DeletePostReturnType,
  ReactToPostPayload,
};
