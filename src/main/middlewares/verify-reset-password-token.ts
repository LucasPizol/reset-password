import { HttpRequest } from "../adapters/http-request";
import { Unauthorized } from "../adapters/http-response";

export const verifyResetPasswordToken = async (req: HttpRequest) => {
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

    req.body = {
      ...req.body,
      token,
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
