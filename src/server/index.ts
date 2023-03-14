import * as dotenv from "dotenv";

import { server } from "./server";

dotenv.config();

const PORT = process.env.PORT ?? 8000;

server
  .listen(PORT, () => {
    console.log(`Server's listening ${PORT} port`);
  })
  .on("error", console.log);
