import "./db-server";

import * as dotenv from "dotenv";
import process from "node:process";

import { server } from "./multi";

dotenv.config();

server.listen(process.env.AT_CRUD_API_PORT, () => {
  console.log(`Server's listening ${process.env.AT_CRUD_API_PORT} port`);
});
