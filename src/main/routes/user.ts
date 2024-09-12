import { UserController } from "@/modules/User/user.controller";
import { adaptRoute } from "../adapters/route-adapter";
import { ServerInstance } from "../server";
import { ensureAuth } from "../middlewares/ensure-auth";
import { verifyResetPasswordToken } from "../middlewares/verify-reset-password-token";

export const userRoutes = async (app: ServerInstance) => {
  return app.group("/user", (app) =>
    app
      .post("/login", adaptRoute(UserController.login))
      .get("/", adaptRoute(UserController.index), {
        beforeHandle: [ensureAuth],
      })
      .post("/", adaptRoute(UserController.create))
      .post(
        "/reset-password/request",
        adaptRoute(UserController.requestResetPasswordToken)
      )
      .post("/reset-password", adaptRoute(UserController.resetPassword), {
        beforeHandle: [verifyResetPasswordToken],
      })
  );
};
