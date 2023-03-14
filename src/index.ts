import * as dotenv from "dotenv";
import process from "node:process";

import { server } from "./multi";

dotenv.config();

const PORT = process.env.PORT ?? 8000;

server.listen(PORT, () => {
  console.log(`Server's listening ${PORT} port`);
});
