import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../modules/user/enums/user-role.enum';
import { ROLES_KEY } from '../constants/role-key.constant';

export const Roles = (...args: UserRole[]) => SetMetadata(ROLES_KEY, args);
