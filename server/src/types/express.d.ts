import {
  IAccessTokenPayload,
  IActiveUserData,
} from 'src/auth/interfaces/active-user-data.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user: IActiveUserData;
  }
}
