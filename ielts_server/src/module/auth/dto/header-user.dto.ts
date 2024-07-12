import { IsNotEmpty, IsString } from 'class-validator';

export class HeaderUserDTO {
	@IsString()
	@IsNotEmpty()
	userId: string;

	@IsString()
	@IsNotEmpty()
	permissionName: string;
}
