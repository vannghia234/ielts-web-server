import { User } from 'src/lib/entity/user/user.entity';
import { UserRole } from 'src/shared/constant/enum_database';

export class ConvertUser extends User {
	id: string;
	name: string;
	mail: string;
	createdAt: Date;
	role: UserRole;
}
