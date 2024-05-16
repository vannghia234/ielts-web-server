import {
	BadRequestException,
	Injectable,
	Logger,
	UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../repository/user.repository';
import { User } from 'src/lib/entity/user/user.entity';
import { CreateUserDto, createTempUserDto } from '../dto/create-user.dto';
import { BCryptService } from './bcrypt.service';
import { ResponseBase } from 'src/shared/constant/response_base';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRole } from 'src/shared/constant/enum_database';
import e from 'express';
@Injectable()
export class UserService {
	constructor(
		private readonly usersRepository: UsersRepository,
		private readonly bCryptService: BCryptService,
	) {}

	async findAll(): Promise<User[]> {
		return this.usersRepository.findAll();
	}

	async findOne(id: string): Promise<User | null> {
		const user = await this.usersRepository.findOne(id);
		return user;
	}
	async update(id: string, updateUser: UpdateUserDto): Promise<User> {
		const userInfo = await this.usersRepository.findOne(id);
		if (updateUser.mail) {
			userInfo.mail = updateUser.mail;
		}
		if (updateUser.name) {
			userInfo.name = updateUser.name;
		}
		if (updateUser.password) {
			userInfo.password = await this.bCryptService.hashPassWord(
				updateUser.password,
			);
		}
		if (updateUser.role) {
			userInfo.role = updateUser.role;
		}
		return this.usersRepository.update(id, userInfo);
	}

	async remove(id: string): Promise<void> {
		return this.usersRepository.remove(id);
	}

	async findByMail(username: string): Promise<User | undefined> {
		return await this.usersRepository.findByMail(username);
	}
	async createTempUser(userDto: createTempUserDto) {
		try {
			const user = new User();
			user.mail = userDto.mail;
			user.name = userDto.name;
			user.role = UserRole.TEMP_USER;
			return await this.usersRepository.create(user);
		} catch (error) {
			console.log('error ', error);
			const user = await this.usersRepository.findByMail(userDto.mail);
			user.name = userDto.name;
			return await this.usersRepository.update(user.id, user);
		}
	}

	async createUser(userDto: CreateUserDto): Promise<User | undefined> {
		if (userDto.role === UserRole.ADMIN) {
			throw new UnauthorizedException(
				new ResponseBase('40005', 'Bạn không có quyền tạo tài khoản Admin'),
			);
		}
		if (userDto.password.length < 8) {
			throw new BadRequestException(
				new ResponseBase('40002', 'Mật khẩu tối thiểu 8 kí tự').toJSON(),
			);
		}
		try {
			const user = new User();
			user.mail = userDto.mail;
			user.name = userDto.name;
			user.password = await this.bCryptService.hashPassWord(userDto.password);
			user.role = userDto.role;
			return await this.usersRepository.create(user);
		} catch (error) {
			throw new BadRequestException(
				new ResponseBase('40004', 'Email đã tồn tại'),
			);
		}
	}
}
