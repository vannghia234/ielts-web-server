import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../repository/user.repository';
import { User } from 'src/lib/entity/user/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { BCryptService } from './bcrypt.service';
import { ResponseBase } from 'src/shared/constant/response-base/response_base';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly bCryptService: BCryptService,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepo.findByUsername(username);
  }

  async createUser(userDto: CreateUserDto): Promise<User | undefined> {
    if (userDto.password.length < 8) {
      throw new BadRequestException(
        new ResponseBase('40002', 'Mật khẩu tối thiểu 8 kí tự').toJSON(),
      );
    }
    const user = new User();
    user.mail = userDto.mail;
    user.name = userDto.name;
    user.password = await this.bCryptService.hashPassWord(userDto.password);
    user.role = userDto.role;
    return await this.userRepo.create(user);
  }
}
