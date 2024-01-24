import { $Enums } from '@prisma/client';

export interface IJwtPayload {
  sub: string;
  email: string;
  role: $Enums.Role;
  refreshToken: string;
}
