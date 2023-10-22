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
      require: [true, "First Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      require: [true, "Last Name is required"],
      trim: true,
    },
    userName: {
      type: String,
      require: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      trim: true,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    birthDay: {
      type: Number,
      require: [true, "Birth day is required"],
    },
    birthMonth: {
      type: Number,
      require: [true, "Birth month is required"],
    },
    birthYear: {
      type: Number,
      require: [true, "Birth year is required"],
    },
    gender: {
      type: String,
      require: [true, "Gender is required"],
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
