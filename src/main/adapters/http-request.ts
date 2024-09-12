import { IUserModel } from "@/domain/user";

export interface HttpRequest {
  body?: any;
  headers?: any;
  params?: any;
  query?: any;
  user?: Omit<IUserModel, "password">;
}
