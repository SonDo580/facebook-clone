import { Document, Schema, Types, model } from "mongoose";

import { REACTIONS } from "../constants/reactions";

type DocId = Types.ObjectId;

type Reaction = {
  reactionType: string;
  users: DocId[];
};

interface PostDoc extends Document {
  author: DocId;
  content: string;
  images: string[];
  reactions: Reaction[];
}

const { ObjectId } = Schema;

const postSchema = new Schema<PostDoc>(
  {
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    reactions: [
      {
        reactionType: {
          type: String,
          enum: REACTIONS,
          required: true,
        },
        users: [
          {
            type: ObjectId,
            ref: "User",
            required: true,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = model<PostDoc>("Post", postSchema);

export default Post;
