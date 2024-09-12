import bcrypt from "bcrypt";

export class BcryptService {
  static async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 11);
  }

  static async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
