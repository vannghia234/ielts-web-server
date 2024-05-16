import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAnswer } from './user-answer.entity';
import { UserRole } from 'src/shared/constant/enum_database';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column({
		unique: true,
	})
	mail: string;

	@Column({ nullable: true })
	password: string;

	@Column({
		type: 'enum',
		enum: UserRole,
		default: UserRole.TEMP_USER,
	})
	role: UserRole;

	@OneToMany(() => UserAnswer, (type) => type.user)
	userAnswer: UserAnswer[];
}
