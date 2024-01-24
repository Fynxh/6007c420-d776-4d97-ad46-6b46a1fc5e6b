import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../modules/auth/services/auth.service';
import { IRequestUser } from '../interfaces/request-user.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<IRequestUser> {
    const user = await this.authService.validate({
      email,
      password,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const { id, role, refreshToken } = user;

    return { userId: id, email, refreshToken, role };
  }
}
