import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from '../../modules/user/enums/user-role.enum';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../constants/role-key.constant';

@Injectable()
export class RoleGuard implements CanActivate {
  private requiredRoles: UserRole[];
  private context: ExecutionContext;

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.setContext(context);
    this.getRequiredRoles();

    if (!this.isRequiredRoles()) return true;

    return this.isUserHaveAccess();
  }

  private setContext(context: ExecutionContext) {
    this.context = context;
  }

  private getRequiredRoles(): void {
    this.requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [this.context.getHandler(), this.context.getClass()],
    );
  }

  private isRequiredRoles(): boolean {
    return this.requiredRoles && this.requiredRoles.length > 0;
  }

  private isUserHaveAccess(): boolean {
    const user = this.getUserFromContext();
    return this.requiredRoles.includes(user.role);
  }

  private getUserFromContext() {
    const { user } = this.context.switchToHttp().getRequest();
    return user;
  }
}
