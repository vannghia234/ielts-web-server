import {
  BadRequestException,
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
import { ResponseBase } from 'src/shared/constant/response-base/response_base';
import { JWTService } from './jwt.service';
import { CreateUserDto } from 'src/module/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UserService,
    private readonly bcryptService: BCryptService,
    private readonly JWTService: JWTService,
  ) {}

  async login(username: string, pass: string) {
    this.logger.debug('start login');

    const user = await this.usersService.findByUsername(username);
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
    const payload = {
      userId: user.id,
      permissionName: user.role,
    };

    const accessToken = await this.JWTService.signPayload(payload, {
      expiresIn: '5h',
    });
    const refreshToken = await this.JWTService.signPayload(payload, {
      expiresIn: '7d',
    });

    const { password, ...userInfo } = user;

    return new ResponseBase('200', 'Login Successfully', {
      userInfo,
      ...{
        accessToken,
        refreshToken,
      },
    });
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    const { password, ...value } = user;
    return value;
  }
}
