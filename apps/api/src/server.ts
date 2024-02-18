import express, { Request, Response } from "express";
import { Empire, EmpireSchema, MillenniumFalcon, getOdds } from "@repo/core";
import dotenv from "dotenv";
import path from "path";
import { readFileSync } from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import { validateBody } from "./validator";
import { hostname } from "os";

if (process.env.NODE_ENV != "production") {
  dotenv.config();
}

/**
 * Load Millennium Falcon config
 */
if (!process.env.MILLENNIUM_FALCON_PATH) {
  throw new Error(`
        No millennium falcon configuration found,
        please provide the MILLENNIUM_FALCON_PATH env variable.
    `);
}

const millenniumFalcon: MillenniumFalcon = JSON.parse(
  readFileSync(
    path.resolve(__dirname, process.env.MILLENNIUM_FALCON_PATH)
  ).toString()
);

millenniumFalcon.routes_db = path.resolve(
  path.dirname(path.resolve(__dirname, process.env.MILLENNIUM_FALCON_PATH)),
  millenniumFalcon.routes_db
);

console.log("🚀 MillenniumFalcon");
console.table(millenniumFalcon);

/**
 * Configure backend
 */
const port = process.env.API_PORT || process.env.PORT || 3001;
export const server = express();

server.use(cors());
server.use(bodyParser.json());

/**
 * GET /millenniumFalcon
 */
server.get(
  "/millenniumFalcon",
  async (req: Request<{}, {}, Empire>, res: Response) => {
    res.json(millenniumFalcon);
  }
);

/**
 * POST /odds
 */
server.post("/odds", validateBody(EmpireSchema), async (req: Request<{}, {}, Empire>, res: Response) => {
  const empire = req.body;
  const summary = await getOdds(millenniumFalcon, empire);
  res.json(summary);
});

/**
 * Start backend
 */
server.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});
