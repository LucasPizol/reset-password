export interface IUserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export type IAddUser = Omit<IUserModel, "id">;
export type AuthenticateUser = Pick<IUserModel, "email" | "password">;

export interface ResetPasswordDTO {
  token: string;
  password: string;
  code: string;
}
