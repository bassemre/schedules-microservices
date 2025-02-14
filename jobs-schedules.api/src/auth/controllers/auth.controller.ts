import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../dtos/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { isPublic } from '../../common/decorators/public.decorator';
import { LoginDto } from '../dtos/login.dto';

@isPublic()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
