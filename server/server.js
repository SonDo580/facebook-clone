const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors()); // should define allowedOrigins in production

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
