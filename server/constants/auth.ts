const JWT_OPTIONS = { expiresIn: "7d" };

const COOKIE_OPTIONS = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export { JWT_OPTIONS, COOKIE_OPTIONS };
