import { JWTService } from "@/services/jwt.service";
import { HttpRequest } from "../adapters/http-request";
import { Unauthorized } from "../adapters/http-response";
import { UserService } from "@/modules/User/user.service";

export const ensureAuth = async (req: HttpRequest) => {
  try {
    const header = req.headers?.authorization;

    const unauthResponse = new Response(
      JSON.stringify(new Unauthorized("Invalid token").handle()),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!header) return unauthResponse;

    const [, token] = header.split(" ");

    if (!token) return unauthResponse;

    const isValidToken = JWTService.verify<{ id: number }>(token);

    const user = await UserService.findById(isValidToken.id);

    if (!user) return unauthResponse;

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
  } catch (error) {
    return new Response(
      JSON.stringify(new Unauthorized("Invalid token").handle()),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
