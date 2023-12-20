import lodash from "lodash";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

import User, { UserDoc } from "../models/user";

const getUserInfo = (userDocument: UserDoc) =>
  lodash.omit(userDocument.toObject(), ["password"]);

const getHashedPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

const getUsername = async (firstName: string, lastName: string) => {
  const fixed = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
  while (true) {
    const username = `${fixed}-${generateId()}`;
    const existedUser = await User.findOne({ username });
    if (!existedUser) {
      return username;
    }
  }
};

const generateToken = (payload: JwtPayload, options?: SignOptions) =>
  jwt.sign(payload, process.env.JWT_SECRET!, options);

export { getUserInfo, getHashedPassword, getUsername, generateToken };
