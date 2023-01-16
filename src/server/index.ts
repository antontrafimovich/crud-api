import * as dotenv from "dotenv";

import { server } from "./server";

dotenv.config();

server
  .listen(process.env.PORT, () => {
    console.log(`Server's listening ${process.env.PORT} port`);
  })
  .on("error", console.log);
