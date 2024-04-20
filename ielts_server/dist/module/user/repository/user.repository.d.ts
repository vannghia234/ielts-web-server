import { User } from 'src/entity/user/user.entity';
import { Repository } from 'typeorm';
export declare class UserRepository {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User | null>;
    create(user: User): Promise<User | null>;
    remove(id: number): Promise<void>;
}
