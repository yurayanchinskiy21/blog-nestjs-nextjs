import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IActiveUserData } from '../interfaces/active-user-data.interface';
import { REQUEST_USER_KEY } from '../constants/auth.constants';

export const ActiveUser = createParamDecorator(
  (field: keyof IActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
