import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRE, JWT_SECRET } from '../../commons/constants/jwt.constant';

@Module({})
export class JwtConfig {
  static register() {
    return JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRE },
    });
  }
}
