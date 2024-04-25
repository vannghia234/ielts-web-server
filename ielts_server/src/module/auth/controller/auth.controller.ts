import { Public } from 'src/shared/constant/meta-data/meta-data';
import { AuthService } from '../service/auth.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { LoginDto } from '../dto/login.dto';
import { CreateUserDto } from 'src/module/user/dto/create-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('login')
  async login(@Body() user: LoginDto) {
    return this.authService.login(user.username, user.password);
  }

  @Public()
  @ApiOperation({
    summary: 'Đăng ký',
    description:
      'Role sử dụng các giá trị enum mặc định như "ADMIN, USER, LECTURE, TEMPUSER" ',
  })
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
