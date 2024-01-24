import { UserRole } from '../../modules/user/enums/user-role.enum';

export interface IJwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}
