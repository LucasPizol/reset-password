import { IAddUser } from "@/domain/user";
import { prismaHelper } from "@/utils/prisma-helper";

export class UserRepository {
  static async create(data: IAddUser) {
    return await prismaHelper.user.create({ data });
  }

  static async findByEmail(email: string) {
    return await prismaHelper.user.findUnique({ where: { email } });
  }

  static async findById(id: number) {
    return await prismaHelper.user.findUnique({ where: { id } });
  }

  static async update(id: number, data: Partial<IAddUser>) {
    return await prismaHelper.user.update({ where: { id }, data });
  }
}
