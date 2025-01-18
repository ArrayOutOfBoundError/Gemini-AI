import express from "express";
import requestRouter from "./requestRouter.js";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v3/prompt", requestRouter);
export { app };
