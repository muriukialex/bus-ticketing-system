import { Injectable } from '@nestjs/common';
import { FindUserByEmailProvider } from './find-user-by-email.provider';
import { FindUserByIdProvider } from './find-user-by-id.provider';

@Injectable()
export class UserService {
  constructor(
    /**
     * Inject findUserByEmail provider
     */
    private readonly findUserByEmailProvider: FindUserByEmailProvider,

    /**
     * Inject findUserByIdProvider
     */
    private readonly findUserByIdProvider: FindUserByIdProvider,
  ) {}
  public async findUserByEmail(email: string) {
    return await this.findUserByEmailProvider.findUserByEmail(email);
  }

  public async findUserById(id: number) {
    return await this.findUserByIdProvider.findUserById(id);
  }
}
