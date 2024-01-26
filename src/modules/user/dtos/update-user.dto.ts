import { OmitType, PartialType } from '@nestjs/swagger';
import { RegisterDto } from '../../auth/dtos/register.dto';

export class UpdateUserDto extends PartialType(
  OmitType(RegisterDto, ['password']),
) {}
