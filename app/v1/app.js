import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>
  res.json({ message: "Welcome to taxi 24 Web API v1." })
);
app.use("/api/v1", routes);

export default app;
