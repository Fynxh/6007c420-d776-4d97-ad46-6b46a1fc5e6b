import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../commons/services/prisma.service';
import { Prisma, User } from '@prisma/client';
import { PasswordService } from '../../../commons/services/password.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const { password } = data;
    return await this.prisma.user.create({
      data: {
        ...data,
        password: await this.passwordService.hash({ password }),
      },
    });
  }

  async findOneByEmail(email: string): Promise<Partial<User> | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOneById(
    id: string,
    selectOptions?: Prisma.UserSelect,
  ): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: selectOptions,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async delete(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async updateById(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
