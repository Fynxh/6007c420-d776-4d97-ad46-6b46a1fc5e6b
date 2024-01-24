import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { PasswordService } from '../../commons/services/password.service';
import { LocalStrategy } from '../../commons/strategies/local.strategy';
import { JwtConfig } from '../../configs/jwt/jwt.config';

@Module({
  imports: [JwtConfig.register(), UserModule],
  providers: [AuthService, PasswordService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
