import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { JWT_STRATEGY } from '../constants/strategy.constant';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../constants/public-key.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (this.isPublic(context)) {
      return true;
    }

    return super.canActivate(context);
  }

  private isPublic(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    return isPublic;
  }
}
