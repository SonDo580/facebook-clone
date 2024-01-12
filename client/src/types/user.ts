import {
  FemaleRelationship,
  MaleRelationship,
  RelationshipStatus,
} from "@/constants/relationship";
import { PostRef } from "./post";

type UserRef = string | Partial<User>;

type Friend = {
  user: UserRef;
  since: Date;
};

type FamilyRelationship = MaleRelationship | FemaleRelationship;

type FamilyMember = {
  user: UserRef;
  relationship: FamilyRelationship;
};

type SavedPost = {
  post: PostRef;
  savedAt: Date;
};

type UserDetails = {
  bio?: string;
  otherNames: string[];
  workplaces: unknown[];
  highSchools: unknown[];
  colleges: unknown[];
  currentCity?: string;
  hometown?: string;
  relationshipStatus?: RelationshipStatus;
  familyMembers: FamilyMember[];
  websites: string[];
  socialLinks: string[];
  languages: string[];
  favoriteQuotes: string[];
};

type User = {
  _id: string;
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
  followers: UserRef[];
  following: UserRef[];
  friends: Friend[];
  friendRequestsIn: UserRef[];
  friendRequestsOut: UserRef[];
  savedPosts: SavedPost[];
  details: UserDetails;
  createdAt: Date;
  updatedAt: Date;
};

export type { User, UserRef };
