import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';
import { AuthType } from '../enums/auth-type.enum';
import { AccessTokenGuard } from './access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    /**
     * Inject reflector, helps to read the request
     */
    private readonly reflector: Reflector,

    /**
     * Inject the AccessTokenGuard
     */
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  private static readonly defaultAuthType = AuthType.Bearer;

  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes =
      this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || AuthenticationGuard.defaultAuthType;

    const guards = Array.isArray(authTypes)
      ? authTypes
          .map((type: string | number) => this.authTypeGuardMap[type])
          .flat()
      : [this.authTypeGuardMap[AuthenticationGuard.defaultAuthType]];

    for (const guard of guards) {
      const canActivate = await Promise.resolve(guard.canActivate(context));

      if (canActivate) {
        return canActivate;
      }
    }

    throw new UnauthorizedException();
  }
}
