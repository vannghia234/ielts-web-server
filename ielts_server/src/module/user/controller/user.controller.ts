/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateDto } from '../dto/create-user.dto';
import { User } from 'src/entity/user/user.entity';
@Controller('user')
export class UserController {
  constructor(private readonly userRepo: UserRepository) {}

  @Get()
  getAll() {
    return this.userRepo.findAll();
  }
  @Post()
  async create(@Body() createDto: CreateDto) {
    const user = new User();
    user.id = 2323;
    user.username = createDto.username;
    user.password = createDto.password;
    var res = await this.userRepo.create(user);
    new Logger().debug(res);

    return res;
  }
}
