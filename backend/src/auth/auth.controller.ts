import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { AuthService } from './providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    /**
     * Inject the auth service
     */
    private readonly authService: AuthService,
  ) {}
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  public async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
