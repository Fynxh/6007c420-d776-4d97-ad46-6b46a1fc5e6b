import { $Enums } from '@prisma/client';

export interface IRequestUser {
  userId: string;
  email: string;
  role: $Enums.Role;
  refreshToken: string;
}

export interface IUserAuthInfoRequest extends Request {
  user: IRequestUser;
}
