/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import * as routes from "./routes";
import { useControllers } from "../libs/useControllers";
import requestHandler from "../libs/middlewares/requestHandler";

dotenv.config();

/**
 * App Variables
 */
const PORT: number = 3000;

const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use((req, res, next) => {
  requestHandler(req, res, next);
});

/**
 * Routes Definitions
 */
app.use(useControllers());

/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
