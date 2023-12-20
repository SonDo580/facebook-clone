import { Request } from "express";

import { UserDoc } from "../models/user";

interface CustomRequest extends Request {
  user?: UserDoc;
}

export type { CustomRequest };
