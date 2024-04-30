import { User } from 'src/lib/entity/user/user.entity';
import { UserService } from '../service/user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUser: Partial<User>): Promise<User>;
    remove(id: string): Promise<void>;
}
