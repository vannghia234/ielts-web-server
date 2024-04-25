import { UsersRepository } from '../repository/user.repository';
import { User } from 'src/lib/entity/user/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { BCryptService } from './bcrypt.service';
export declare class UserService {
    private readonly userRepo;
    private readonly bCryptService;
    constructor(userRepo: UsersRepository, bCryptService: BCryptService);
    findByUsername(username: string): Promise<User | undefined>;
    createUser(userDto: CreateUserDto): Promise<User | undefined>;
}
