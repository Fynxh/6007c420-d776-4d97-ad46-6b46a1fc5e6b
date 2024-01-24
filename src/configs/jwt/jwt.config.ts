import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({})
export class JwtConfig {
  static register() {
    return JwtModule.register({});
  }
}
