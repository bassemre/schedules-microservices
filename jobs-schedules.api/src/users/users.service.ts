import { RegisterDto } from './../auth/dtos/register.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../auth/dtos/login.dto';
import { compare } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,
  ) {}

  async create(registerDto: RegisterDto) {
    const { email, phone } = registerDto;

    await this.checkUserExist({ email, phone });

    const newUser = this.usersRepo.create(registerDto);
    const savedUser = await this.usersRepo.save(newUser);

    return plainToInstance(UserDto, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async checkUserExist(dto: { email: string; phone: string }): Promise<void> {
    const { email, phone } = dto;
    const existingUser = await this.usersRepo.findOne({
      where: [
        { email, deleted: false },
        { phone, deleted: false },
      ],
      select: { id: true },
    });
    if (existingUser)
      throw new BadRequestException('user already exist by email or phone');

    return;
  }

  async findById(id: number) {
    const existUser = await this.usersRepo.findOne({
      where: { id, deleted: false },
    });
    if (!existUser) {
      return null;
    }
    return existUser;
  }

  async findByLogin(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const existUser = await this.usersRepo.findOne({
      where: { email, deleted: false },
    });
    if (!existUser) throw new BadRequestException('user not found');

    const correctPassword = await compare(password, existUser.password);
    if (!correctPassword) throw new BadRequestException('incorrect password');

    return plainToInstance(UserDto, existUser, {
      excludeExtraneousValues: true,
    });
  }
}
