import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    required: true,
    description: 'user name',
    type: String,
    example: 'bassem',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    required: true,
    description: 'user email',
    type: String,
    example: 'bassem@test.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty({
    required: true,
    description: 'phone country code',
    type: String,
    example: '20',
  })
  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @ApiProperty({
    required: true,
    description: 'local phone number',
    type: String,
    example: '1211879067',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    required: true,
    description: 'password',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).',
    },
  )
  password: string;

  @ApiProperty({
    required: true,
    description: 'password confirm',
    type: String,
  })
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).',
    },
  )
  @IsString()
  passwordConfirm: string;
}
