import { Document, Schema, Types, model } from "mongoose";

import { REACTIONS } from "../constants/reactions";

type DocId = Types.ObjectId;

type ReactionMap = Record<(typeof REACTIONS)[number], DocId[]>;

interface PostDoc extends Document {
  author: DocId;
  content: string;
  images: string[];
  reactions: ReactionMap;
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
        required: true,
      },
    ],
    reactions: Object.fromEntries(
      REACTIONS.map((reactionType) => [
        reactionType,
        [
          {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
        ],
      ])
    ),
  },
  {
    timestamps: true,
  }
);

const Post = model<PostDoc>("Post", postSchema);

export default Post;
