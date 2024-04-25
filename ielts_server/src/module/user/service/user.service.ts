import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../repository/user.repository';
import { User } from 'src/lib/entity/user/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { BCryptService } from './bcrypt.service';
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
    const user = new User();
    user.mail = userDto.mail;
    user.name = userDto.name;
    user.password = await this.bCryptService.hashPassWord(userDto.password);
    user.role = userDto.role;
    return await this.userRepo.create(user);
  }
}
