import { Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignUpDto } from '../dtos/sign-up.dto';
import { SignInProvider } from './sign-in.provider';
import { SignUpProvider } from './sign-up.provider';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Inject the signIn provider
     */
    private readonly signInProvider: SignInProvider,

    /**
     * Inject signUp provider
     */
    private readonly signUpProvider: SignUpProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    return this.signInProvider.signIn(signInDto);
  }

  public async signUp(signUpDto: SignUpDto) {
    return this.signUpProvider.signUp(signUpDto);
  }
}
