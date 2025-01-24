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
    // authTypes from the refelector, they are 0 or 1, Bearer or None(for no authorization)
    const authTypes =
      this.reflector.getAllAndOverride(
        AUTH_TYPE_KEY,
        [context.getHandler(), context.getClass()],
        // get metadata from the class and the methods within the class
      ) || AuthenticationGuard.defaultAuthType;

    // get array of auth guards
    const guards = Array.isArray(authTypes)
      ? authTypes
          .map((type: string | number) => this.authTypeGuardMap[type])
          .flat()
      : [this.authTypeGuardMap[AuthenticationGuard.defaultAuthType]]; // convert default auth guard to array

    // Loop through the auth guards and call canActivate
    for (const guard of guards) {
      const canActivate = await Promise.resolve(guard.canActivate(context)); // Promise.resolve makes canActivate a promise, await to resolve

      // If any guard returns true, then the request is authorized
      if (canActivate) {
        return canActivate;
      }
    }

    // If none of the guards return true, then the request is unauthorized
    throw new UnauthorizedException();
  }
}
