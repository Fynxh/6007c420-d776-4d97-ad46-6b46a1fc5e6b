import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../commons/services/prisma.service';
import { Prisma } from '@prisma/client';
import { PasswordService } from '../../../commons/services/password.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async create(data: Prisma.UserCreateInput) {
    const { password } = data;
    return this.prisma.user.create({
      data: {
        ...data,
        password: await this.passwordService.hash({ password }),
      },
    });
  }
}
