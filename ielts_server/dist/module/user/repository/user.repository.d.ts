import { User } from 'src/lib/entity/user/user.entity';
import { Repository } from 'typeorm';
export declare class UsersRepository {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    create(user: Partial<User>): Promise<User>;
    update(id: string, updateUser: Partial<User>): Promise<User>;
    remove(id: string): Promise<void>;
}
