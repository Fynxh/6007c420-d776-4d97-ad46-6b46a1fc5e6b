import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { Roles } from '../../../commons/decorators/roles.decorator';
import { UserRole } from '../enums/user-role.enum';
import { IUserAuthInfoRequest } from '../../../commons/interfaces/request-user.interface';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('user')
@ApiTags('User services')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Find all user' })
  @Roles(UserRole.ADMIN)
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get profile' })
  async findProfile(@Req() req: IUserAuthInfoRequest) {
    const { userId } = req.user;
    return await this.userService.findOneById(userId, {
      id: true,
      email: true,
      name: true,
      role: true,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find user Detail' })
  @Roles(UserRole.ADMIN)
  async findById(@Param('id') id: string) {
    return await this.userService.findOneById(id, {
      id: true,
      name: true,
      email: true,
      role: true,
    });
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return await this.userService.updateById(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }
}
