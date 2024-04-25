import { UserRole } from 'src/shared/constant/enum/enum_database';
export declare class CreateUserDto {
    name: string;
    mail: string;
    password: string;
    role: UserRole;
}
