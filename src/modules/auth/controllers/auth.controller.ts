import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../../commons/guards/local-auth.guard';
import { LoginDto } from '../dtos/login.dto';
import { IUserAuthInfoRequest } from '../../../commons/interfaces/request-user.interface';

@Controller('auth')
@ApiTags('Authentication Services')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() data: RegisterDto) {
    return await this.authService.register(data);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @UseGuards(LocalAuthGuard)
  async login(@Body() data: LoginDto, @Req() req: IUserAuthInfoRequest) {
    return await this.authService.login(req.user);
  }
}
