import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { PasswordService } from '../../../commons/services/password.service';
import { ICompare } from '../../../commons/interfaces/password.interface';
import { IRequestUser } from '../../../commons/interfaces/request-user.interface';
import { JwtService } from '@nestjs/jwt';

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
    const { email, userId } = user;
    const jwtPayload = { sub: userId, email };

    const token = this.jwtService.sign(jwtPayload);

    return { token };
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
}
