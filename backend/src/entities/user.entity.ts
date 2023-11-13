import {
	Column,
	Entity,
	Index,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Vote } from './vote.entity';
import { Article } from './article.entity';
import { Role } from './role.entity';
import { Orders } from './orders.entity';

@Index('users_email_unique', ['email'], { unique: true })
@Entity('users', { schema: 'public' })
export class User {
	@PrimaryGeneratedColumn('increment', { name: "id" })
	id: number;

	@Column('character varying', { name: 'name', length: 255, nullable: false })
	name: string;

	@Column('character varying', { name: 'email', length: 255, nullable: false })
	email: string;

	@Column('character varying', { name: 'username', length: 255, nullable: false })
	username: string;

	@Column('character varying', { name: 'password', nullable: false })
	password: string;

	@Column('character varying', { name: 'address', nullable: false })
	address: string;

	@Column('enum',
		{
			name: 'gender',
			nullable: true,
			enum: ['male', 'female', 'other'],
		})
	gender: string;

	@Column('character varying', { name: 'phone', nullable: true })
	phone: string;

	@Column('character varying', { name: 'avatar', nullable: true })
	avatar: string;

	@Column('date', { name: 'birthday', nullable: true })
	birthDay: Date;

	@Column('smallint', { name: 'status', nullable: true, default: 0 })
	status: number | -1;

	@Column('smallint', { name: 'type', nullable: true, default: 0 })
	type: number | -1;

	@Column('timestamp with time zone', {
		name: 'created_at',
		default: () => 'now()',
	})
	created_at: Date;

	@Column('timestamp with time zone', {
		name: 'updated_at',
		nullable: true,
		default: () => 'now()',
	})
	updated_at: Date;

	@Column('timestamp with time zone', {
		name: 'email_verified_at',
		nullable: true,
		default: () => 'now()',
	})
	email_verified_at: Date;

	@OneToMany(() => Vote, (vote) => vote.user)
	votes: Vote[];

	@OneToMany(() => Article, article => article.user)
	article: Article[];

	@OneToMany(() => Orders, o => o.user)
	orders: Orders[];

	@ManyToMany(type => Role)
	@JoinTable({
		name: 'user_roles',
		joinColumn: { name: 'user_id', referencedColumnName: 'id' },
		inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
	})
	roles: Role[];
}
