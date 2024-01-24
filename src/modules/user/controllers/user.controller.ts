import { Controller, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { Roles } from '../../../commons/decorators/roles.decorator';
import { UserRole } from '../enums/user-role.enum';

@Controller('user')
@ApiTags('User services')
@ApiBearerAuth()
export class UserController {
  constructor(private userService: UserService) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @Roles(UserRole.ADMIN)
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
