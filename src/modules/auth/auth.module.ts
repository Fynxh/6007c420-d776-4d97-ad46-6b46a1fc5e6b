import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { PasswordService } from '../../commons/services/password.service';
import { LocalStrategy } from '../../commons/strategies/local.strategy';
import { JwtConfig } from '../../configs/jwt/jwt.config';
import { JwtStrategy } from '../../commons/strategies/jwt.strategy';
import { JwtRefreshStrategy } from '../../commons/strategies/jwt-refresh.strategy';

@Module({
  imports: [JwtConfig.register(), UserModule],
  providers: [
    AuthService,
    PasswordService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
