import { UserRepository } from '../repository/user.repository';
import { CreateDto } from '../dto/create-user.dto';
import { User } from 'src/entity/user/user.entity';
export declare class UserController {
    private readonly userRepo;
    constructor(userRepo: UserRepository);
    getAll(): Promise<User[]>;
    create(createDto: CreateDto): Promise<User>;
}
