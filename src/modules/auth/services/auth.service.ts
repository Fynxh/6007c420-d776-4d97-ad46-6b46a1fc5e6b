import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { PasswordService } from '../../../commons/services/password.service';
import { ICompare } from '../../../commons/interfaces/password.interface';
import { JwtService } from '@nestjs/jwt';
import {
  JWT_EXPIRE,
  JWT_SECRET,
} from '../../../commons/constants/jwt.constant';
import { IGenerateToken } from '../interfaces/generate-token.interface';
import {
  JWT_REFRESH_EXPIRE,
  JWT_REFRESH_SECRET,
} from '../../../commons/constants/jwt-refresh.constant';
import { IJwtPayload } from '../../../commons/interfaces/jwt-payload.interface';
import { IValidateRefreshToken } from '../interfaces/validate-refresh-token.interface';
import { IRequestUser } from '../../../commons/interfaces/request-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    return await this.userService.create(data);
  }

  async validate(data: LoginDto) {
    const { email, password } = data;
    const user = await this.validateUser(email);

    if (!user) return null;

    const isPasswordValid = await this.validatePassword({
      password,
      hashedPassword: user.password,
    });

    if (!isPasswordValid) return null;

    return user;
  }

  async login(user: IRequestUser) {
    const { email, userId, role, refreshToken } = user;
    const payload: IJwtPayload = { sub: userId, email, role, refreshToken };
    const token = this.generateToken({
      payload,
      secret: JWT_SECRET,
      expiresIn: JWT_EXPIRE,
    });

    const newRefreshToken = this.generateToken({
      payload,
      secret: JWT_REFRESH_SECRET,
      expiresIn: JWT_REFRESH_EXPIRE,
    });

    await this.updateUserRefreshToken(userId, newRefreshToken);

    return {
      token,
      refreshToken: newRefreshToken,
      role,
    };
  }

  async validateRefreshToken(data: IValidateRefreshToken) {
    const { userId, refreshToken } = data;
    const user = await this.userService.findOneById(userId);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException();
    }

    const isRefreshTokenMatch = await this.passwordService.compare({
      hashedPassword: user.refreshToken,
      password: refreshToken,
    });

    if (!isRefreshTokenMatch) {
      throw new ForbiddenException();
    }
  }

  async logout(userId: string) {
    await this.userService.updateById(userId, { refreshToken: null });
  }

  private validatePassword(data: ICompare) {
    const { password, hashedPassword } = data;
    const isPasswordValid = this.passwordService.compare({
      hashedPassword,
      password,
    });

    return isPasswordValid;
  }

  private async validateUser(email: string) {
    const user = await this.userService.findOneByEmail(email);
    return user;
  }

  private async updateUserRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.passwordService.hash({
      password: refreshToken,
    });

    return await this.userService.updateById(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  private generateToken(data: IGenerateToken) {
    const { payload, expiresIn, secret } = data;

    return this.jwtService.sign(payload, { secret, expiresIn });
  }
}
