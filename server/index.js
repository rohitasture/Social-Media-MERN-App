import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import postRoutes from "./routes/posts.js";
import userRouter from "./routes/user.js";

const app = express();
const corsOptions = {
  origin: "https://mysocialmedia-memories-webapp.onrender.com", // frontend URI (ReactJS)
};

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptions));

app.use("/posts", postRoutes);
app.use("/user", userRouter);

const CONNECTION_URL = process.env.DATABASE;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`App is Listening on PORT ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
