import { env } from "node:process";
import app from "./app.mjs";

const port = env.SERVER_PORT;

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
