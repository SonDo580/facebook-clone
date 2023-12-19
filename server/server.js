const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error");
const userRouter = require("./routes/user");

dotenv.config();
connectDB(); // connect to database
const app = express();

// Add middlewares
app.use(cors()); // should define allowedOrigins in production
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/users", userRouter);

// Handle error
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
