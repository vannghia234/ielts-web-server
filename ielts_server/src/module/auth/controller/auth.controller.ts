import { Public } from 'src/shared/constant/meta-data';
import { AuthService } from '../service/auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { LoginDto } from '../../user/dto/login.dto';
import { CreateUserDto } from 'src/module/user/dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
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
  constructor(private authService: AuthService) {}
  @Public()
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
  async login(@Body() user: LoginDto) {
    return this.authService.login(user.username, user.password);
  }

  @Public()
  @ApiOperation({
    summary: 'Đăng ký',
    description:
      'Role sử dụng các giá trị enum mặc định như "ADMIN, USER, LECTURE, TEMPUSER" ',
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
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
