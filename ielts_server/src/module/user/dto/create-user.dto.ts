import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/shared/constant/enum_database';

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	name: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	@IsEmail()
	mail: string;

	@Optional()
	@ApiProperty()
	password: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		enum: UserRole,
		default: UserRole.TEMP_USER,
	})
	@IsEnum(UserRole)
	role: UserRole;
}

export class createTempUserDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	name: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	@IsEmail()
	mail: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	password: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	confirmPassword: string;
}
