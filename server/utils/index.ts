import { Types } from "mongoose";

const checkIncludeId = (arr: Types.ObjectId[], id: string) =>
  arr.some((objectId) => objectId.toString() === id);

export { checkIncludeId };
