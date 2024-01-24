import { UserRole } from '../../modules/user/enums/user-role.enum';

export interface IRequestUser {
  userId: string;
  email: string;
  role: UserRole;
}

export interface IUserAuthInfoRequest extends Request {
  user: IRequestUser;
}
