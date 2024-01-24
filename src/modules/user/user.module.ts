import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { PrismaService } from '../../commons/services/prisma.service';
import { PasswordService } from '../../commons/services/password.service';
import { UserController } from './controllers/user.controller';

@Module({
  providers: [UserService, PrismaService, PasswordService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
