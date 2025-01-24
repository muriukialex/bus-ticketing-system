import * as bcrypt from 'bcrypt';
import { HashingProvider } from './hashing.provider';

export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt();

    return bcrypt.hash(data, salt);
  }

  comparePasswords(
    data: string | Buffer,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(data, hashedPassword);
  }
}
