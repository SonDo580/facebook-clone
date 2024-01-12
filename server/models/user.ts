import { Document, Schema, Types, model } from "mongoose";

import {
  RELATIONSHIP_STATUSES,
  FAMILY_RELATIONSHIPS,
} from "../constants/relationships";
import { GENDERS } from "../constants/genders";
import {
  MAX_MONTH,
  MAX_MONTH_DAY,
  MIN_MONTH,
  MIN_MONTH_DAY,
  NAME_MAX_LENGTH,
} from "../constants";

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
  fullName: string;
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
      trim: true,
      maxlength: NAME_MAX_LENGTH,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: NAME_MAX_LENGTH,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    birthDay: {
      type: Number,
      required: true,
      min: MIN_MONTH_DAY,
      max: MAX_MONTH_DAY,
    },
    birthMonth: {
      type: Number,
      required: true,
      min: MIN_MONTH,
      max: MAX_MONTH,
    },
    birthYear: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      enum: GENDERS,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: "",
      trim: true,
    },
    coverPhoto: {
      type: String,
      default: "",
      trim: true,
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
        trim: true,
      },
      otherNames: [
        {
          type: String,
          trim: true,
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
        trim: true,
      },
      hometown: {
        type: String,
        trim: true,
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
          trim: true,
        },
      ],
      socialLinks: [
        {
          type: String,
          trim: true,
        },
      ],
      languages: [
        {
          type: String,
          trim: true,
        },
      ],
      favoriteQuotes: [
        {
          type: String,
          trim: true,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// Create virtual property fullName
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Include the virtual property when converting to object and JSON
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

const User = model<UserDoc>("User", userSchema);

export type { UserDoc };
export default User;
