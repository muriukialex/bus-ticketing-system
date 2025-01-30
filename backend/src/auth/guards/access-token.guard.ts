import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import jwtConfig from 'src/auth/config/jwt.config';
import { X_AUTH_TOKEN } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /**
     * Inject jwtService
     */
    private readonly jwtService: JwtService,
    /**
     * Inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accesstoken = this.extractRequestFromHeaders(request);

    if (!accesstoken) {
      throw new UnauthorizedException();
    }

    try {
      const requestPayload = await this.jwtService.verifyAsync(
        accesstoken,
        this.jwtConfiguration,
      );

      request[X_AUTH_TOKEN] = requestPayload;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractRequestFromHeaders(request: Request): string | undefined {
    const [, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
