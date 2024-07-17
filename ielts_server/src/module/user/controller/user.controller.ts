import {
	Controller,
	Get,
	Param,
	Post,
	Body,
	Put,
	Delete,
	Patch,
	UseGuards,
	Req,
} from '@nestjs/common';
import { User } from 'src/lib/entity/user/user.entity';
import { UserService } from '../service/user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/shared/constant/meta-data';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PermissionAdminGuard } from 'src/module/auth/guard/permissionAdmin.guard';
import { Request } from 'express';
import { UserRole } from 'src/shared/constant/enum_database';

@ApiTags('user')
@Controller('user')
@ApiResponse({
	status: 200,
	description: 'OK',
	content: {
		ApiResponse: {
			example: 'OK ',
		},
	},
})
@ApiResponse({ status: 404, description: 'Not Found' })
@ApiResponse({ status: 500, description: 'Server Error' })
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<User> {
		return this.userService.findOne(id);
	}

	@Patch(':id')
	@Public()
	async update(
		@Param('id') id: string,
		@Body() updateUser: UpdateUserDto,
	): Promise<User> {
		return this.userService.update(id, updateUser);
	}

	@UseGuards(PermissionAdminGuard)
	@Patch(':id/role')
	async updateRole(@Param('id') id: string, @Body('role') role: UserRole) {
		return this.userService.updateRole(id, role);
	}

	@Delete(':id')
	async remove(@Param('id') id: string): Promise<void> {
		return this.userService.remove(id);
	}
}
