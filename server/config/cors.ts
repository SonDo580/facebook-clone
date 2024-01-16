import { CorsOptions } from "cors";

const whitelist =
  process.env.NODE_ENV === "production"
    ? [process.env.CLIENT_URL!]
    : ["http://localhost:5173"];

const corsOptions: CorsOptions = {
  origin: whitelist,
  credentials: true,
};

export { corsOptions };
