const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error");
const authRouter = require("./routes/auth");

dotenv.config();
connectDB(); // connect to database
const app = express();

// Add middlewares
app.use(cors()); // TODO: specify allowedOrigins in production mode
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRouter);

// Handle error
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
