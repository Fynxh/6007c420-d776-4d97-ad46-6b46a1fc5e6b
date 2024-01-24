import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../../commons/guards/local-auth.guard';
import { LoginDto } from '../dtos/login.dto';
import { Public } from '../../../commons/decorators/public.decorator';
import { JwtRefreshGuard } from '../../../commons/guards/jwt-refresh.guard';

@Controller('auth')
@ApiTags('Authentication Services')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Register a new user' })
  async register(@Body() data: RegisterDto) {
    return await this.authService.register(data);
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Login' })
  @UseGuards(LocalAuthGuard)
  async login(@Body() data: LoginDto, @Req() req) {
    return await this.authService.login(req.user);
  }

  @Get('refresh')
  @ApiOperation({ summary: 'Get refresh token' })
  @ApiBearerAuth()
  @Public()
  @UseGuards(JwtRefreshGuard)
  async getRefresh(@Req() req) {
    return await this.authService.login(req.user);
  }
}
