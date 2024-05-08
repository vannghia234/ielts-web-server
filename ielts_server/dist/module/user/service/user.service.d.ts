import { UsersRepository } from '../repository/user.repository';
import { User } from 'src/lib/entity/user/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { BCryptService } from './bcrypt.service';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UserService {
    private readonly usersRepository;
    private readonly bCryptService;
    constructor(usersRepository: UsersRepository, bCryptService: BCryptService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    update(id: string, updateUser: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
    findByUsername(username: string): Promise<User | undefined>;
    createUser(userDto: CreateUserDto): Promise<User | undefined>;
}
