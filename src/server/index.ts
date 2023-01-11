import * as dotenv from "dotenv";

import { server } from "./server";

dotenv.config();

server
  .listen(process.env.AT_CRUD_API_PORT, () => {
    console.log(`Server's listening ${process.env.AT_CRUD_API_PORT} port`);
  })
  .on("error", console.log);
