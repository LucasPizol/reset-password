import { AuthenticateUser, IAddUser, ResetPasswordDTO } from "@/domain/user";
import { UserRepository } from "./user.repository";
import { BcryptService } from "@/services/bcrypt.service";
import {
  BadRequest,
  Conflict,
  Unauthorized,
} from "@/main/adapters/http-response";
import { formatPhone } from "@/utils/format-phone";
import { JWTService } from "@/services/jwt.service";
import { AwsService } from "@/services/aws.service";

export class UserService {
  static async create(data: IAddUser) {
    const user = await UserRepository.findByEmail(data.email);

    if (user) throw new Conflict("Email already in use");

    const phone = formatPhone(data.phone);

    const hashedPassword = await BcryptService.hash(data.password);

    return await UserRepository.create({
      ...data,
      password: hashedPassword,
      phone,
    });
  }

  static async login(data: AuthenticateUser) {
    const user = await UserRepository.findByEmail(data.email);
    if (!user) throw new Unauthorized("Email or password is incorrect");

    if (!(await BcryptService.compare(data.password, user.password)))
      throw new Unauthorized("Email or password is incorrect");

    const token = JWTService.sign({ id: user.id }, { expiresIn: "1d" });

    const { password, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  }

  static async findById(id: number) {
    return await UserRepository.findById(id);
  }

  static async requestResetPasswordToken(email: string) {
    const user = await UserRepository.findByEmail(email);

    if (!user) throw new BadRequest("Email not found");

    const randomCode = Math.floor(100000 + Math.random() * 900000);

    await AwsService.sendSMS(
      `Olá, seu código de recuperação é: ${randomCode}`,
      user.phone
    );

    const token = JWTService.sign(
      { id: user.id, code: String(randomCode) },
      { expiresIn: "2m" }
    );

    return { token };
  }

  static async resetPassword(data: ResetPasswordDTO) {
    const { id, code } = JWTService.verify<{ id: number; code: string }>(
      data.token
    );

    if (code !== data.code) throw new BadRequest("Invalid code");

    const user = await UserRepository.findById(id);

    if (!user) throw new BadRequest("User not found");

    const hashedPassword = await BcryptService.hash(data.password);

    await UserRepository.update(id, { password: hashedPassword });

    return { message: "Password updated successfully" };
  }
}
