import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UNABLE_TO_PROCESS_REQUEST } from 'src/common/error-messages/error-messages';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindUserByEmailProvider {
  /**
   * Inject userRepository
   */
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async findUserByEmail(email: string): Promise<User | undefined> {
    // return await this.userRepository.findOne({ email });
    let user: User = null;

    try {
      user = await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException(UNABLE_TO_PROCESS_REQUEST.message, {
        description: UNABLE_TO_PROCESS_REQUEST.description,
      });
    }

    if (!user) {
      throw new UnauthorizedException("The user email provided doesn't exist");
    }

    return user;
  }
}
