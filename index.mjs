import { env } from "node:process";
import server from "./app.mjs";

const port = env.SERVER_PORT;

server.listen(port, () => {
  console.log(`server started on port ${port}`);
});
