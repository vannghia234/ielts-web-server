import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
	Logger,
	NotFoundException,
	Response,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BCryptService } from 'src/module/user/service/bcrypt.service';
import { UserService } from 'src/module/user/service/user.service';
import { ResponseBase } from 'src/shared/constant/response_base';
import { JWTService } from './jwt.service';
import {
	CreateUserDto,
	createTempUserDto,
} from 'src/module/user/dto/create-user.dto';
import { EmailAlreadyExistingException } from 'src/core/exception';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		private readonly usersService: UserService,
		private readonly bcryptService: BCryptService,
		private readonly JWTService: JWTService,
	) {}

	async login(username: string, pass: string) {
		const user = await this.usersService.findByMail(username);
		// if (user.role !== UserRole.TEMP_USER) {
		const isEqualPassword = await this.bcryptService.comparePassword(
			pass,
			user.password,
		);
		this.logger.debug('password compare:' + isEqualPassword);
		if (!isEqualPassword) {
			throw new BadRequestException(
				new ResponseBase('40001', 'Incorrect Username or Password').toJSON(),
			);
		}
		// }
		const payload = {
			userId: user.id,
			permissionName: user.role,
		};

		const accessToken = await this.JWTService.signPayload(payload);

		const { password, ...userInfo } = user;

		return new ResponseBase('200', 'Login Successfully', {
			userInfo,
			...{
				accessToken,
			},
		});
	}
	async authenticate(token) {
		try {
			const response = await this.JWTService.verifyToken(token);
			return response.userId;
		} catch (error) {
			throw new UnauthorizedException();
		}
	}

	async register(createUserDto: CreateUserDto) {
		const user = await this.usersService.createUser(createUserDto);
		console.log(user);
		if (user instanceof EmailAlreadyExistingException) {
			return user;
		}

		const { password, ...value } = user;
		return value;
	}

	async registerTempUser(createUserDto: createTempUserDto) {
		const user = await this.usersService.createTempUser(createUserDto);
		console.log(user);
		const { password, ...value } = user;
		return value;
	}
}
