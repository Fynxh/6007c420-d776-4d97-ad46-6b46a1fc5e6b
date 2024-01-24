import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_REFRESH_STRATEGY } from '../constants/strategy.constant';
import { JWT_REFRESH_SECRET } from '../constants/jwt-refresh.constant';
import { IRequestUser } from '../interfaces/request-user.interface';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { Request } from 'express';
import { AuthService } from '../../modules/auth/services/auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  JWT_REFRESH_STRATEGY,
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: IJwtPayload): Promise<IRequestUser> {
    const refreshToken = req.headers['authorization'].split(' ')[1];
    const { sub, email, role } = payload;

    await this.authService.validateRefreshToken({ refreshToken, userId: sub });
    return { userId: sub, email, role, refreshToken };
  }
}
