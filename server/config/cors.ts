import { CorsOptions } from "cors";

const whitelist =
  process.env.NODE_ENV === "production"
    ? [process.env.CLIENT_URL!]
    : ["http://localhost:5173"];

const dynamicOrigin: typeof corsOptions.origin = (origin = "", callback) => {
  if (whitelist.includes(origin)) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
};

// Only allow specified origins (live client) in production
// REST tools like Postman can still be used in development
const origin =
  process.env.NODE_ENV === "production" ? dynamicOrigin : whitelist;

const corsOptions: CorsOptions = {
  origin,
  credentials: true,
};

export { corsOptions };
