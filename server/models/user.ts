import { Document, Schema, Types, model } from "mongoose";

import {
  RELATIONSHIP_STATUSES,
  FAMILY_RELATIONSHIPS,
} from "../constants/relationships";

type DocId = Types.ObjectId;

type Friend = {
  user: DocId;
  since: Date;
};

type FamilyMember = {
  user: DocId;
  relationship: string;
};

type SavedPost = {
  post: DocId;
  savedAt: Date;
};

type UserDetails = {
  bio?: string;
  otherNames: string[];
  workplaces: any[];
  highSchools: any[];
  colleges: any[];
  currentCity?: string;
  hometown?: string;
  relationshipStatus?: string;
  familyMembers: FamilyMember[];
  websites: string[];
  socialLinks: string[];
  languages: string[];
  favoriteQuotes: string[];
};

interface UserDoc extends Document {
  _id: DocId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  gender: string;
  verified: boolean;
  profilePicture: string;
  coverPhoto: string;
  followers: DocId[];
  following: DocId[];
  friends: Friend[];
  friendRequestsIn: DocId[];
  friendRequestsOut: DocId[];
  savedPosts: SavedPost[];
  details: UserDetails;
  createdAt: Date;
  updatedAt: Date;
}

const { ObjectId } = Schema;

const userSchema = new Schema<UserDoc>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthDay: {
      type: Number,
      required: true,
    },
    birthMonth: {
      type: Number,
      required: true,
    },
    birthYear: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPhoto: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    friends: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
        since: { type: Date, default: new Date() },
      },
    ],
    friendRequestsIn: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    friendRequestsOut: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    savedPosts: [
      {
        post: { type: ObjectId, ref: "Post" },
        savedAt: { type: Date, default: new Date() },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherNames: [
        {
          type: String,
        },
      ],
      workplaces: {
        type: Array,
      },
      highSchools: {
        type: Array,
      },
      colleges: {
        type: Array,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationshipStatus: {
        type: String,
        enum: RELATIONSHIP_STATUSES,
      },
      familyMembers: [
        {
          user: {
            type: ObjectId,
            ref: "User",
          },
          relationship: {
            type: String,
            enum: FAMILY_RELATIONSHIPS,
          },
        },
      ],
      websites: [
        {
          type: String,
        },
      ],
      socialLinks: [
        {
          type: String,
        },
      ],
      languages: [
        {
          type: String,
        },
      ],
      favoriteQuotes: [
        {
          type: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const User = model<UserDoc>("User", userSchema);

export type { UserDoc };
export default User;
