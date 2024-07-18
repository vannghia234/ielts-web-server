import { Public } from 'src/shared/constant/meta-data';
import { AuthService } from '../service/auth.service';
import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { LoginDto } from '../../user/dto/login.dto';
import {
	CreateUserDto,
	createTempUserDto,
} from 'src/module/user/dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { publicOperation } from 'src/module/user/controller/user-answer.controller';
import { ResponseBase } from 'src/shared/constant/response_base';
import { EmailAlreadyExistingException } from 'src/core/exception';
import { UserService } from 'src/module/user/service/user.service';
import { HeaderUserDTO } from '../dto/header-user.dto';
import { Request } from 'express';

@Controller('auth')
@ApiTags('Auth')
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
export class AuthController {
	constructor(
		private authService: AuthService,
		private userService: UserService,
	) {}
	@Post('login')
	@ApiResponse({
		status: 400,
		description: 'Bad Request',
		content: {
			ApiResponse: {
				example: 'statusCode 40001: Tài khoản hoặc mật khẩu sai',
			},
		},
	})
	@Public()
	@ApiOperation(publicOperation)
	async login(@Body() user: LoginDto) {
		return this.authService.login(user.username, user.password);
	}

	@ApiOperation({
		summary: 'Đăng ký',
	})
	@ApiResponse({
		status: 400,
		description: 'Bad Request',
		content: {
			ApiResponse: {
				example: 'statusCode 40002: Mật khẩu tối thiểu 8 kí tự',
			},
		},
	})
	@ApiOperation(publicOperation)
	@Public()
	@Post('register')
	async register(@Body() user: CreateUserDto) {
		const res = await this.authService.register(user);
		if (res instanceof EmailAlreadyExistingException) {
			throw new BadRequestException(
				new ResponseBase('404', 'email đã tồn tại'),
			);
		} else return res;
	}

	@ApiOperation({
		summary:
			'Đăng ký tài khoản cho người dùng vãng lai, tự động cập nhật lại thông tin ghi đè dựa vào email',
	})
	@ApiResponse({
		status: 400,
		description: 'Bad Request',
		content: {
			ApiResponse: {
				example: '',
			},
		},
	})
	@ApiOperation(publicOperation)
	@Public()
	@Post('register/tempUser')
	async registerTempUser(@Body() user: createTempUserDto) {
		const res = this.authService.registerTempUser(user);
		if (res instanceof EmailAlreadyExistingException) {
			throw new BadRequestException(
				new ResponseBase('404', 'email đã tồn tại'),
			);
		} else return res;
	}

	@Get('verify')
	async verifyUser(@Req() { user }: Request) {
		try {
			console.log('[CONTROLLER] Verify: ', user);
			const { password, ...userInfo } = await this.userService.findOne(
				user['userId'],
			);
			return userInfo;
		} catch (error) {
			throw new BadRequestException(
				new ResponseBase('500', 'An error occurred! Please try again.'),
			);
		}
	}
}
