import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(data: RegisterDto) {
    return await this.userService.create(data);
  }
}
