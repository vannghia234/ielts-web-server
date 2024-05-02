import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../repository/user.repository';
import { User } from 'src/lib/entity/user/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { BCryptService } from './bcrypt.service';
import { ResponseBase } from 'src/shared/constant/response_base';
import { UpdateUserDto } from '../dto/update-user.dto';
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
    const user = new User();
    user.mail = updateUser.mail;
    user.name = updateUser.name;
    user.password = await this.bCryptService.hashPassWord(updateUser.password);
    user.role = updateUser.role;
    return this.usersRepository.update(id, user);
  }

  async remove(id: string): Promise<void> {
    return this.usersRepository.remove(id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.usersRepository.findByUsername(username);
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
    return await this.usersRepository.create(user);
  }
}
