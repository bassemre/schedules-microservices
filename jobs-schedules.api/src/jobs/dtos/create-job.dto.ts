import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  Matches,
  IsObject,
} from 'class-validator';

export class CreateJobDto {
  @ApiProperty({
    description: 'Job name',
    example: 'send email',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Job interval (e.g., "5m", "30s", "2h", "1d")',
    example: '5m',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d+[smhd]$/, {
    message:
      'Interval must be a number followed by "s", "m", "h", or "d" (e.g., "5m", "30s", "2h", "1d")',
  })
  interval: string;

  @ApiProperty({
    description: 'Custom job parameters (optional JSON object)',
    example: { email: 'user@example.com', priority: 'high' },
  })
  @IsOptional()
  @IsObject()
  parameters?: Record<string, any>;

  @ApiProperty({
    description: 'Whether the job is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
