import * as dotenv from "dotenv";
import process from "node:process";

import { server } from "./multi";

dotenv.config();

server.listen(process.env.PORT, () => {
  console.log(`Server's listening ${process.env.PORT} port`);
});
