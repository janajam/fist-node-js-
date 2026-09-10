const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/userRoutes");
const authRouter = require("./routes/authRoute");
const meRouter=require('./routes/meRoute')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const MONGOURI = process.env.MONGO_URI;
app.use(express.json());

mongoose
  .connect(MONGOURI)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`server is running on port :${PORT}`);
    });
  })
  .catch((error) => {
    (console.log(error), process.exit(1));
  });

app.use("/api", router);
app.use("/api",meRouter)
app.use("/api/auth", authRouter);
