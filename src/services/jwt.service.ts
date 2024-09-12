import { BadRequest } from "@/main/adapters/http-response";
import { env } from "@/main/config/env";
import jwt from "jsonwebtoken";

class JWTService {
  private readonly secret: string;

  constructor() {
    if (!env.jwt.secret) {
      throw new BadRequest("JWT secret is missing");
    }

    this.secret = env.jwt.secret;
  }

  sign(payload: any, options?: jwt.SignOptions): string {
    return jwt.sign(payload, this.secret, options);
  }

  verify<T>(token: string, secret?: string): T {
    if (secret) return jwt.verify(token, secret) as T;

    return jwt.verify(token, this.secret) as T;
  }
}

const jwtService = new JWTService();
export { jwtService as JWTService };
