import "module-alias/register";
import { Elysia } from "elysia";
import { userRoutes } from "./routes/user";

new Elysia().use(userRoutes).listen(
  {
    port: 3000,
    reusePort: true,
  },
  () => {
    console.log(`Server running on port 3000`);
  }
);

export interface ServerInstance extends Elysia {}
