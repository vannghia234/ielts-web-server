import {
	BadRequestException,
	HttpException,
	HttpStatus,
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
import { EmailAlreadyExistingException } from 'src/core/exception';
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
		// if (!id) return null;
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
		return this.usersRepository.update(id, userInfo);
	}

	async updateRole(id: string, newRole: UserRole): Promise<User> {
		console.log(id, newRole);
		return this.usersRepository.update(id, { role: newRole });
	}

	async remove(id: string): Promise<void> {
		return this.usersRepository.remove(id);
	}

	async findByMail(username: string): Promise<User | undefined> {
		return await this.usersRepository.findByMail(username);
	}
	async createTempUser(userDto: createTempUserDto) {
		try {
			if (userDto.password.length < 8) {
				throw new BadRequestException(
					new ResponseBase('40002', 'Mật khẩu tối thiểu 8 kí tự').toJSON(),
				);
			}

			if (userDto.password !== userDto.confirmPassword) {
				throw new BadRequestException(
					new ResponseBase('40002', 'Mật khẩu xác nhận không đúng').toJSON(),
				);
			}
			const user = new User();
			user.mail = userDto.mail;
			user.name = userDto.name;
			user.role = UserRole.TEMP_USER;
			user.password = await this.bCryptService.hashPassWord(userDto.password);
			return await this.usersRepository.create(user);
		} catch (error) {
			console.log('error ', error);
			throw new BadRequestException(
				new ResponseBase('40004', 'Email đã tồn tại'),
			);
		}
	}

	async createUser(userDto: CreateUserDto): Promise<any> {
		if (userDto.role === UserRole.ADMIN) {
			throw new UnauthorizedException(
				new ResponseBase('40005', 'Bạn không có quyền tạo tài khoản Admin'),
			);
		}
		try {
			// update
			const userMail = await this.usersRepository.findByMail(userDto.mail);
			if (userMail && !userMail.password) {
				userMail.name = userDto.name;
				userMail.password = await this.bCryptService.hashPassWord(
					userDto.password,
				);
				userMail.role = userDto.role;
				return this.usersRepository.update(userMail.id, userMail);
			} else {
				return new EmailAlreadyExistingException();
			}
		} catch (error) {
			// new
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
}
