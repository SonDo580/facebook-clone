const express = require("express");
const cors = require("cors");
require("dotenv").config();

// connect to database
const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(cors()); // should define allowedOrigins in production
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRouter = require("./routes/user");
app.use("/", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
