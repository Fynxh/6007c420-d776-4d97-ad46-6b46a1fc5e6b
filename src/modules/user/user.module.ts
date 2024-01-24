import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PrismaService } from '../../commons/services/prisma.service';
import { PasswordService } from '../../commons/services/password.service';

@Module({
  providers: [UserService, PrismaService, PasswordService],
  exports: [UserService],
})
export class UserModule {}
