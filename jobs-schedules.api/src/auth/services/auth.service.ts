import { UsersService } from '../../users/users.service';
import { RegisterDto } from '../dtos/register.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../users/entities/user.entity';
import { LoginDto } from '../dtos/login.dto';
import { UserDto } from 'src/users/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto): Promise<string> {
    const newUser = await this.usersService.create(registerDto);
    return this.createToken(newUser);
  }

  async login(loginDto: LoginDto): Promise<string> {
    const existUser = await this.usersService.findByLogin(loginDto);
    return this.createToken(existUser);
  }

  public async createToken(user: UserDto): Promise<any> {
    const { id, email, fullName } = user;
    const accessToken = await this.jwtService.signAsync({
      id,
      email,
      fullName,
    });
    return { accessToken };
  }
}
