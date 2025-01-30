import {
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AUTH_INCORRECT_PASSWORD } from 'src/common/error-messages/error-messages';
import { UserService } from 'src/user/providers/user.service';
import jwtConfig from '../config/jwt.config';
import { SignInDto } from '../dtos/sign-in.dto';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * Inject hashingProvider
     */
    private readonly hashingProvider: HashingProvider,
    /**
     * Inject userService
     */
    private readonly userService: UserService,

    /**
     * Inject jwtService
     */
    private readonly jwtService: JwtService,

    // /**
    //  * Inject jwtConfiguration
    //  */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  public async signIn(signInDto: SignInDto) {
    const user = await this.userService.findUserByEmail(signInDto.email);

    let passwordsMatch: boolean = false;

    try {
      passwordsMatch = await this.hashingProvider.comparePasswords(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    if (!passwordsMatch) {
      throw new UnauthorizedException(AUTH_INCORRECT_PASSWORD.message, {
        description: AUTH_INCORRECT_PASSWORD.description,
      });
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
    return { accessToken };
  }
}
