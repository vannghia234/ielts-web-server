import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from 'src/shared/constant/enum_database';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  name?: string;

  @IsEmail()
  @ApiProperty()
  @IsOptional()
  mail?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
