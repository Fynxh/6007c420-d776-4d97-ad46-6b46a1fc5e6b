import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { UserRole } from '../../user/enums/user-role.enum';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiPropertyOptional({ default: UserRole.REGULAR })
  role: UserRole;
}
