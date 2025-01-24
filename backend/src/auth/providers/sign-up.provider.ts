import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UNABLE_TO_PROCESS_REQUEST } from 'src/common/error-messages/error-messages';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from '../dtos/sign-up.dto';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignUpProvider {
  constructor(
    /**
     * Inject the user repository
     */

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    /**
     * Inject BcryptProvider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}
  public async signUp(signUpDto: SignUpDto) {
    // check if a similar user exists with the email above
    let existingUser = null;

    try {
      existingUser = await this.userRepository.findOne({
        where: { email: signUpDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(UNABLE_TO_PROCESS_REQUEST.message, {
        description: UNABLE_TO_PROCESS_REQUEST.description,
      });
    }

    if (existingUser) {
      throw new BadRequestException(
        'A user with the provided email address already exists',
      );
    }

    // if no use already exist, create the user and save their password, ensure to save the hashed password
    let newUser = this.userRepository.create({
      ...signUpDto,
      password: await this.hashingProvider.hashPassword(signUpDto.password),
    });

    try {
      newUser = await this.userRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(UNABLE_TO_PROCESS_REQUEST.message, {
        description: UNABLE_TO_PROCESS_REQUEST.description,
      });
    }

    return newUser;
  }
}
