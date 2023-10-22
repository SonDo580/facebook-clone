const mongoose = require("mongoose");

const {
  RELATIONSHIP_STATUSES,
  FAMILY_RELATIONSHIPS,
} = require("../constants/relationships");

const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const userSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
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
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
    },
    followers: {
      type: Array,
    },
    following: {
      type: Array,
    },
    friendRequests: {
      type: Array,
    },
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
      websites: { type: Array },
      socialLinks: { type: Array },
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

module.exports = model("User", userSchema);
