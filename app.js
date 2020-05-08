import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import startupDebugger from "debug";
import routes from "./app/v1/routes";
const port = process.env.PORT || 3000;

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/v1", (req, res) =>
  res.json({ message: "Welcome to taxi 24 Web API v1" })
);
app.get("/api/v1/resources", (req, res) => res.json(listEndpoints(app)));
app.use("/api/v1", routes);

const debug = startupDebugger("minutes:start");
app.listen(port, () => debug(`taxi 24 Web API listening on port ${port}!`));

export default app;
