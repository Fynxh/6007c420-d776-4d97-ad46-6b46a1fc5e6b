import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from '../constants/jwt.constant';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { IRequestUser } from '../interfaces/request-user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: IJwtPayload): Promise<IRequestUser> {
    const { sub, email, role } = payload;
    return { userId: sub, email, role };
  }
}
