import { AuthenticateUser, IAddUser, ResetPasswordDTO } from "@/domain/user";
import { HttpRequest } from "@/main/adapters/http-request";
import { ResponseHandler, Success } from "@/main/adapters/http-response";
import { schema } from "@/utils/body-schema";
import { UserService } from "./user.service";

export class UserController {
  static async index(req: HttpRequest): Promise<ResponseHandler> {
    return new Success(req.user);
  }

  static async create(req: HttpRequest): Promise<ResponseHandler> {
    const data = schema<IAddUser>(req.body, {
      name: { type: "string", required: true },
      email: { type: "string", required: true },
      password: { type: "string", required: true },
      phone: { type: "string", required: true },
    });

    const user = await UserService.create(data);

    return new Success(user);
  }

  static async login(req: HttpRequest): Promise<ResponseHandler> {
    const data = schema<AuthenticateUser>(req.body, {
      email: { type: "string", required: true },
      password: { type: "string", required: true },
    });

    const user = await UserService.login(data);

    return new Success(user);
  }

  static async requestResetPasswordToken(
    req: HttpRequest
  ): Promise<ResponseHandler> {
    const data = schema<{ email: string }>(req.body, {
      email: { type: "string", required: true },
    });

    const user = await UserService.requestResetPasswordToken(data.email);

    return new Success(user);
  }

  static async resetPassword(req: HttpRequest): Promise<ResponseHandler> {
    const data = schema<ResetPasswordDTO>(req.body, {
      code: { type: "string", required: true },
      token: { type: "string", required: true },
      password: { type: "string", required: true },
    });

    const user = await UserService.resetPassword(data);

    return new Success(user);
  }
}
