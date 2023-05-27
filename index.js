import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import api from "./api.js";

const SERVER_PORT = process.env.SERVER_PORT | 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Alive route
app.get("/ping", (_, res) => res.send("pong"));

// API endpoint
app.use("/api", api);

app.listen(SERVER_PORT, () =>
  console.log(`Server listening on ${SERVER_PORT}`)
);
