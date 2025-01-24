import { Injectable } from '@nestjs/common';
import { FindUserByEmailProvider } from './find-user-by-email.provider';

@Injectable()
export class UserService {
  constructor(
    /**
     * Inject findUserByEmail provider
     */
    private readonly findUserByEmailProvider: FindUserByEmailProvider,
  ) {}
  public async findUserByEmail(email: string) {
    return await this.findUserByEmailProvider.findUserByEmail(email);
  }
}
