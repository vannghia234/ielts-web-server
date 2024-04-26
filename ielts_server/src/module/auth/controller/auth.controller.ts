import { Public } from 'src/shared/constant/meta-data/meta-data';
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
@ApiResponse({ status: 200, description: 'OK' })
@ApiResponse({ status: 404, description: 'Not Found' })
@ApiResponse({ status: 400, description: 'Bad Request' })
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('login')
  @ApiResponse({ status: 40001, description: 'Sai tài khoản hoặc mật khẩu' })
  async login(@Body() user: LoginDto) {
    return this.authService.login(user.username, user.password);
  }

  @Public()
  @ApiOperation({
    summary: 'Đăng ký',
    description:
      'Role sử dụng các giá trị enum mặc định như "ADMIN, USER, LECTURE, TEMPUSER" ',
  })
  @ApiResponse({ status: 40002, description: 'Mật khẩu tối thiểu 8 kí tự' })
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
