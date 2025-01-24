import { SetMetadata } from '@nestjs/common';
import { AUTH_TYPE_KEY } from '../constants/auth.constants';
import { AuthType } from '../enums/auth-type.enum';

export const Auth = (...args: AuthType[]) => SetMetadata(AUTH_TYPE_KEY, args);
